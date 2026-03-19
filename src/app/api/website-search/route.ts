import { createHmac, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';
import { getMongoDbName } from '@/lib/mongoUri';

const VISITOR_COOKIE = 'sf_visitor_token';
const TRACKING_COLLECTION = 'website_search_tracking';
const GATE_EVENT_COLLECTION = 'website_search_gate_events';
const DEFAULT_FREE_QUERIES = 3;
const DEFAULT_UNLOCK_TTL_MS = 10 * 60 * 1000;
const DEFAULT_PROVIDER_TIMEOUT_MS = 12_000;
const SETTINGS_CACHE_TTL_MS = 30_000;

type ShortlinkProviderName = 'cuty' | 'exe' | 'gplinks' | 'shrinkearn';

const PROVIDER_ROTATION: ShortlinkProviderName[] = ['cuty', 'exe', 'gplinks', 'shrinkearn'];

type GateRuntimeSettings = {
  gateEnabled: boolean;
  freeQueries: number;
  providerRotation: ShortlinkProviderName[];
  providerEnabled: Record<ShortlinkProviderName, boolean>;
  failoverEnabled: boolean;
  unlockTtlMs: number;
};

let gateSettingsCache: { value: GateRuntimeSettings; expiresAt: number } | null = null;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function getFreeQueries(): number {
  const parsed = Number.parseInt(process.env.SHORTLINK_GATE_FREE_QUERIES || '', 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_FREE_QUERIES;
}

function isGateEnabled(): boolean {
  return (process.env.SHORTLINK_GATE_ENABLED || 'true').toLowerCase() !== 'false';
}

function getUnlockSecret(): string {
  return process.env.SHORTLINK_UNLOCK_SECRET || process.env.JWT_SECRET || 'sim-finder-website-gate-secret';
}

function getUnlockTtlMs(): number {
  const minutes = Number.parseInt(process.env.SHORTLINK_GATE_UNLOCK_TTL_MINUTES || '', 10);
  if (!Number.isFinite(minutes) || minutes < 1) return DEFAULT_UNLOCK_TTL_MS;
  return minutes * 60 * 1000;
}

function getProviderTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.SHORTLINK_PROVIDER_TIMEOUT_MS || '', 10);
  if (!Number.isFinite(parsed) || parsed < 1000) return DEFAULT_PROVIDER_TIMEOUT_MS;
  return parsed;
}

function toBase64Url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function signUnlockToken(payload: Record<string, unknown>): string {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const sig = createHmac('sha256', getUnlockSecret()).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${sig}`;
}

function verifyUnlockToken(token: string): null | Record<string, unknown> {
  const [encodedPayload, sig] = token.split('.');
  if (!encodedPayload || !sig) return null;

  const expectedSig = createHmac('sha256', getUnlockSecret()).update(encodedPayload).digest('base64url');
  if (expectedSig !== sig) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    if (!payload || typeof payload !== 'object') return null;
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

function normalizeProviderResponse(raw: unknown): { ok: boolean; shortUrl?: string; message?: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, message: 'Invalid short-link provider response' };

  const data = raw as Record<string, unknown>;
  const status = String(data.status || '').toLowerCase();
  const shortUrl = String(data.shortenedUrl || data.shortenedURL || data.short_url || data.shortened_url || data.short || data.url || '').trim();

  if ((status === 'success' || shortUrl) && shortUrl) {
    return { ok: true, shortUrl };
  }

  const message = Array.isArray(data.message)
    ? data.message.join(', ')
    : String(data.message || data.error || 'Short-link creation failed');

  return { ok: false, message };
}

function normalizeProviderRotation(raw: unknown): ShortlinkProviderName[] {
  if (!Array.isArray(raw)) return [...PROVIDER_ROTATION];
  const seen = new Set<ShortlinkProviderName>();
  const cleaned = raw
    .map((v) => String(v || '').trim().toLowerCase())
    .filter((v): v is ShortlinkProviderName => PROVIDER_ROTATION.includes(v as ShortlinkProviderName))
    .filter((v) => {
      if (seen.has(v)) return false;
      seen.add(v);
      return true;
    });

  const missing = PROVIDER_ROTATION.filter((provider) => !cleaned.includes(provider));
  return [...cleaned, ...missing];
}

function normalizeProviderEnabled(raw: unknown): Record<ShortlinkProviderName, boolean> {
  const defaults: Record<ShortlinkProviderName, boolean> = {
    cuty: true,
    exe: true,
    gplinks: true,
    shrinkearn: true,
  };

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return defaults;

  const source = raw as Record<string, unknown>;
  for (const provider of PROVIDER_ROTATION) {
    if (source[provider] !== undefined) {
      defaults[provider] = Boolean(source[provider]);
    }
  }

  return defaults;
}

function getSettingsApiUrl(): string {
  return (process.env.SHORTLINK_SETTINGS_API_URL || '').trim();
}

async function loadRuntimeSettings(): Promise<GateRuntimeSettings> {
  const now = Date.now();
  if (gateSettingsCache && gateSettingsCache.expiresAt > now) {
    return gateSettingsCache.value;
  }

  const base: GateRuntimeSettings = {
    gateEnabled: isGateEnabled(),
    freeQueries: getFreeQueries(),
    providerRotation: [...PROVIDER_ROTATION],
    providerEnabled: {
      cuty: true,
      exe: true,
      gplinks: true,
      shrinkearn: true,
    },
    failoverEnabled: (process.env.SHORTLINK_GATE_FAILOVER_ENABLED || 'true').toLowerCase() !== 'false',
    unlockTtlMs: getUnlockTtlMs(),
  };

  const settingsApiUrl = getSettingsApiUrl();
  if (!settingsApiUrl) {
    gateSettingsCache = { value: base, expiresAt: now + SETTINGS_CACHE_TTL_MS };
    return base;
  }

  try {
    const res = await fetch(settingsApiUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(getProviderTimeoutMs()),
    });

    if (!res.ok) {
      gateSettingsCache = { value: base, expiresAt: now + SETTINGS_CACHE_TTL_MS };
      return base;
    }

    const data = (await res.json()) as Record<string, unknown>;
    const merged: GateRuntimeSettings = {
      gateEnabled: data.websiteGateEnabled === undefined ? base.gateEnabled : Boolean(data.websiteGateEnabled),
      freeQueries: (() => {
        const parsed = Number.parseInt(String(data.websiteGateFreeQueries ?? ''), 10);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : base.freeQueries;
      })(),
      providerRotation: normalizeProviderRotation(data.websiteGateProviderRotation),
      providerEnabled: normalizeProviderEnabled(data.websiteGateProviderEnabled),
      failoverEnabled:
        data.websiteGateFailoverEnabled === undefined ? base.failoverEnabled : Boolean(data.websiteGateFailoverEnabled),
      unlockTtlMs: (() => {
        const parsed = Number.parseInt(String(data.websiteGateUnlockTtlMinutes ?? ''), 10);
        if (!Number.isFinite(parsed) || parsed < 1) return base.unlockTtlMs;
        return parsed * 60 * 1000;
      })(),
    };

    gateSettingsCache = { value: merged, expiresAt: now + SETTINGS_CACHE_TTL_MS };
    return merged;
  } catch {
    gateSettingsCache = { value: base, expiresAt: now + SETTINGS_CACHE_TTL_MS };
    return base;
  }
}

function getProviderConfig(provider: ShortlinkProviderName): { endpoint: string; apiKey: string } {
  switch (provider) {
    case 'cuty':
      return {
        endpoint: process.env.SHORTLINK_CUTY_ENDPOINT || 'https://cuty.io/api',
        apiKey: process.env.SHORTLINK_CUTY_API_KEY || '',
      };
    case 'exe':
      return {
        endpoint: process.env.SHORTLINK_EXE_ENDPOINT || 'https://exe.io/api',
        apiKey: process.env.SHORTLINK_EXE_API_KEY || '',
      };
    case 'gplinks':
      return {
        endpoint: process.env.SHORTLINK_GPLINKS_ENDPOINT || 'https://api.gplinks.com/api',
        apiKey: process.env.SHORTLINK_GPLINKS_API_KEY || '',
      };
    case 'shrinkearn':
      return {
        endpoint: process.env.SHORTLINK_SHRINKEARN_ENDPOINT || 'https://shrinkearn.com/api',
        apiKey: process.env.SHORTLINK_SHRINKEARN_API_KEY || '',
      };
  }
}

async function createShortLink(provider: ShortlinkProviderName, destinationUrl: string): Promise<{ ok: boolean; shortUrl?: string; message?: string }> {
  const { endpoint, apiKey } = getProviderConfig(provider);
  if (!apiKey) {
    return { ok: false, message: `Missing API key for provider: ${provider}` };
  }

  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set('api', apiKey);
  requestUrl.searchParams.set('url', destinationUrl);

  try {
    const res = await fetch(requestUrl.toString(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(getProviderTimeoutMs()),
    });

    const text = await res.text();

    const plainUrlMatch = text.match(/https?:\/\/[^\s"'<>]+/i);
    if (!text.trim().startsWith('{') && plainUrlMatch?.[0]) {
      return { ok: true, shortUrl: plainUrlMatch[0] };
    }

    let parsed: unknown = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, message: `Non-JSON response from ${provider}` };
    }

    const normalized = normalizeProviderResponse(parsed);
    if (!normalized.ok && !res.ok && !normalized.message) {
      return { ok: false, message: `HTTP ${res.status} from ${provider}` };
    }
    return normalized;
  } catch (err) {
    const message = err instanceof Error && err.name === 'TimeoutError'
      ? `Timeout from provider: ${provider}`
      : `Failed to connect with provider: ${provider}`;
    return { ok: false, message };
  }
}

async function fetchSearchResult(query: string) {
  const base = (process.env.SEARCH_API_BASE_URL || 'https://sim-db-backend.vercel.app').replace(/\/$/, '');
  const target = `${base}/api/search?q=${encodeURIComponent(query)}`;

  const res = await fetch(target, {
    cache: 'no-store',
    headers: {
      'x-from-website': '1',
    },
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { error: text || 'Invalid backend response' };
  }

  return { status: res.status, body: parsed };
}

function providerForSearchCount(searchCount: number, freeQueries: number, rotation: ShortlinkProviderName[]): ShortlinkProviderName {
  const startAt = freeQueries + 1;
  const idx = Math.max(0, searchCount - startAt) % rotation.length;
  return rotation[idx];
}

function getProviderAttemptOrder(
  searchCount: number,
  settings: GateRuntimeSettings
): ShortlinkProviderName[] {
  const enabledRotation = settings.providerRotation.filter((provider) => settings.providerEnabled[provider] !== false);
  if (!enabledRotation.length) return [];

  const primary = providerForSearchCount(searchCount, settings.freeQueries, settings.providerRotation);
  const startIndex = enabledRotation.indexOf(primary);
  const normalizedStartIndex = startIndex >= 0 ? startIndex : 0;

  const ordered = [
    ...enabledRotation.slice(normalizedStartIndex),
    ...enabledRotation.slice(0, normalizedStartIndex),
  ];

  if (!settings.failoverEnabled) return [ordered[0]];
  return ordered;
}

function getRedirectBaseUrl(request: NextRequest): string {
  const configured = (process.env.SHORTLINK_REDIRECT_BASE_URL || '').trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // ignore invalid configured URL and continue with fallback logic
    }
  }

  const requestOrigin = new URL(request.url).origin;
  try {
    const host = new URL(requestOrigin).hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      const publicSite = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
      if (publicSite) {
        try {
          return new URL(publicSite).origin;
        } catch {
          // ignore invalid public site URL and use request origin fallback
        }
      }
    }
  } catch {
    // keep request origin fallback
  }

  return requestOrigin;
}

function jsonWithVisitorCookie(request: NextRequest, body: Record<string, unknown>, status: number, visitorToken: string) {
  const response = NextResponse.json(body, { status });
  const isSecureRequest = request.nextUrl.protocol === 'https:';

  response.cookies.set(VISITOR_COOKIE, visitorToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecureRequest || process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

async function logGateEvent(dbName: string, payload: Record<string, unknown>) {
  try {
    const db = (await getMongoClientPromise()).db(dbName);
    await db.collection(GATE_EVENT_COLLECTION).insertOne({ ...payload, createdAt: new Date() });
  } catch {
    // best-effort logging only
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();
  const type = (searchParams.get('type') || 'mobile').trim();
  const unlock = (searchParams.get('unlock') || '').trim();

  if (!q) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const cleaned = q.replace(/[^0-9]/g, '');
  if (cleaned.length < 10 || cleaned.length > 13) {
    return NextResponse.json({ error: 'Invalid mobile number or CNIC' }, { status: 400 });
  }

  const cookieToken = request.cookies.get(VISITOR_COOKIE)?.value || randomUUID();
  const ip = getClientIp(request);
  const dbName = getMongoDbName();
  const gateSettings = await loadRuntimeSettings();

  try {
    const db = (await getMongoClientPromise()).db(dbName);
    const collection = db.collection(TRACKING_COLLECTION);

    const now = new Date();
    let searchCount = 1;
    let unlockedByToken = false;

    if (unlock) {
      const payload = verifyUnlockToken(unlock);
      const expiresAt = Number(payload?.exp || 0);
      const token = String(payload?.token || '');
      const expectedQ = String(payload?.q || '');
      const expectedType = String(payload?.type || '');

      if (
        payload &&
        expiresAt > Date.now() &&
        token === cookieToken &&
        expectedQ === cleaned &&
        expectedType === type
      ) {
        unlockedByToken = true;
        const existing = await collection.findOne({ token: cookieToken });
        searchCount = Number(existing?.searchCount || 1);
      }
    }

    if (!unlockedByToken) {
      const updated = await collection.findOneAndUpdate(
        { token: cookieToken },
        {
          $setOnInsert: { createdAt: now, token: cookieToken },
          $set: { updatedAt: now, ip },
          $inc: { searchCount: 1 },
        },
        { upsert: true, returnDocument: 'after' }
      );

      searchCount = Number(updated?.searchCount || 1);
    }

    const freeQueries = gateSettings.freeQueries;

    if (gateSettings.gateEnabled && searchCount > freeQueries && !unlockedByToken) {
      const providers = getProviderAttemptOrder(searchCount, gateSettings);
      if (!providers.length) {
        return jsonWithVisitorCookie(
          request,
          {
            error: 'Short-link providers are unavailable right now.',
            message: 'No provider is enabled in gate settings',
          },
          503,
          cookieToken
        );
      }

      const primaryProvider = providers[0];
      const exp = Date.now() + gateSettings.unlockTtlMs;
      const unlockToken = signUnlockToken({ token: cookieToken, q: cleaned, type, exp, c: searchCount });
      const destinationBase = getRedirectBaseUrl(request);
      const destination = `${destinationBase}/search?query=${encodeURIComponent(cleaned)}&type=${encodeURIComponent(type)}&unlock=${encodeURIComponent(unlockToken)}`;

      const attempts: Array<{ provider: ShortlinkProviderName; ok: boolean; message?: string }> = [];
      for (const provider of providers) {
        const short = await createShortLink(provider, destination);
        attempts.push({ provider, ok: short.ok, message: short.message });

        if (short.ok && short.shortUrl) {
          await logGateEvent(dbName, {
            kind: 'shortlink_redirect',
            token: cookieToken,
            ip,
            q: cleaned,
            type,
            searchCount,
            provider,
            attempts,
            success: true,
          });

          return jsonWithVisitorCookie(
            request,
            {
              success: false,
              requireShortlink: true,
              provider,
              redirectUrl: short.shortUrl,
              meta: {
                searchCount,
                freeQueries,
                attemptedProviders: attempts,
                fallbackUsed: provider !== primaryProvider,
              },
            },
            200,
            cookieToken
          );
        }
      }

      await logGateEvent(dbName, {
        kind: 'shortlink_redirect',
        token: cookieToken,
        ip,
        q: cleaned,
        type,
        searchCount,
        provider: primaryProvider,
        attempts,
        success: false,
      });

      const lastMessage = attempts[attempts.length - 1]?.message || 'Provider failed';
      return jsonWithVisitorCookie(
        request,
        {
          error: 'Unable to create short-link redirect right now.',
          provider: primaryProvider,
          message: lastMessage,
          attemptedProviders: attempts,
        },
        502,
        cookieToken
      );
    }

    const result = await fetchSearchResult(cleaned);
    if (result.status >= 400) {
      return jsonWithVisitorCookie(
        request,
        {
          success: false,
          error: (result.body as Record<string, unknown>)?.error || 'Search failed',
          meta: { searchCount, freeQueries },
        },
        result.status,
        cookieToken
      );
    }

    return jsonWithVisitorCookie(
      request,
      {
        success: true,
        result: result.body,
        meta: {
          searchCount,
          freeQueries,
          unlockedByToken,
        },
      },
      200,
      cookieToken
    );
  } catch {
    return jsonWithVisitorCookie(
      request,
      {
        success: false,
        error: 'Internal server error',
      },
      500,
      cookieToken
    );
  }
}
