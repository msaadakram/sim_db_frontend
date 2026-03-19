import { createHmac, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';
import { getMongoDbName } from '@/lib/mongoUri';

const VISITOR_COOKIE = 'sf_visitor_token';
const TRACKING_COLLECTION = 'website_search_tracking';
const DEFAULT_FREE_QUERIES = 3;
const DEFAULT_UNLOCK_TTL_MS = 10 * 60 * 1000;

type ShortlinkProviderName = 'cuty' | 'exe' | 'gplinks' | 'shrinkearn';

const PROVIDER_ROTATION: ShortlinkProviderName[] = ['cuty', 'exe', 'gplinks', 'shrinkearn'];

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
  const shortUrl = String(data.shortenedUrl || data.shortenedURL || data.short_url || data.shortened_url || '').trim();

  if ((status === 'success' || shortUrl) && shortUrl) {
    return { ok: true, shortUrl };
  }

  const message = Array.isArray(data.message)
    ? data.message.join(', ')
    : String(data.message || data.error || 'Short-link creation failed');

  return { ok: false, message };
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

  const alias = `sf${Date.now().toString(36)}`;
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set('api', apiKey);
  requestUrl.searchParams.set('url', destinationUrl);
  requestUrl.searchParams.set('alias', alias);

  try {
    const res = await fetch(requestUrl.toString(), { cache: 'no-store' });
    const text = await res.text();
    let parsed: unknown = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { ok: false, message: `Non-JSON response from ${provider}` };
    }

    return normalizeProviderResponse(parsed);
  } catch {
    return { ok: false, message: `Failed to connect with provider: ${provider}` };
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

function providerForSearchCount(searchCount: number): ShortlinkProviderName {
  const startAt = getFreeQueries() + 1;
  const idx = Math.max(0, searchCount - startAt) % PROVIDER_ROTATION.length;
  return PROVIDER_ROTATION[idx];
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

function jsonWithVisitorCookie(body: Record<string, unknown>, status: number, visitorToken: string) {
  const response = NextResponse.json(body, { status });
  response.cookies.set(VISITOR_COOKIE, visitorToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
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

  try {
    const db = (await getMongoClientPromise()).db(getMongoDbName());
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

    const freeQueries = getFreeQueries();

    if (isGateEnabled() && searchCount > freeQueries && !unlockedByToken) {
      const provider = providerForSearchCount(searchCount);
      const exp = Date.now() + DEFAULT_UNLOCK_TTL_MS;
      const unlockToken = signUnlockToken({ token: cookieToken, q: cleaned, type, exp, c: searchCount });
      const destinationBase = getRedirectBaseUrl(request);
      const destination = `${destinationBase}/search?query=${encodeURIComponent(cleaned)}&type=${encodeURIComponent(type)}&unlock=${encodeURIComponent(unlockToken)}`;
      const short = await createShortLink(provider, destination);

      if (!short.ok || !short.shortUrl) {
        return jsonWithVisitorCookie(
          {
            error: 'Unable to create short-link redirect right now.',
            provider,
            message: short.message || 'Provider failed',
          },
          502,
          cookieToken
        );
      }

      return jsonWithVisitorCookie(
        {
          success: false,
          requireShortlink: true,
          provider,
          redirectUrl: short.shortUrl,
          meta: {
            searchCount,
            freeQueries,
          },
        },
        200,
        cookieToken
      );
    }

    const result = await fetchSearchResult(cleaned);
    if (result.status >= 400) {
      return jsonWithVisitorCookie(
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
      {
        success: false,
        error: 'Internal server error',
      },
      500,
      cookieToken
    );
  }
}
