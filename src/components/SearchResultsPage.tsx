'use client';

import { motion } from 'motion/react';
import { ArrowLeft, Search, ExternalLink, Loader2, UserRound, Phone, IdCard, Building2, MapPin, Landmark, Info, MessageCircle, Share2, Video } from 'lucide-react';
import { type MouseEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    __sfOriginalWindowOpen?: Window['open'];
    __sfSearchPopunderOpenGuardInstalled?: boolean;
    __sfAllowSearchPopunderOpen?: boolean;
  }
}

interface SearchResultsPageProps {
  searchQuery: string;
  searchType: 'mobile' | 'cnic';
  unlockToken?: string;
  onBack: () => void;
}

interface SearchApiResponse {
  success: boolean;
  error?: string;
  message?: string;
  requireShortlink?: boolean;
  provider?: string;
  redirectUrl?: string;
  attemptedProviders?: Array<{ provider: string; ok: boolean; message?: string }>;
  result?: any;
  meta?: {
    searchCount?: number;
    freeQueries?: number;
    gateEnabled?: boolean;
    unlockedByToken?: boolean;
    fallbackUsed?: boolean;
    attemptedProviders?: Array<{ provider: string; ok: boolean; message?: string }>;
  };
}

const SHORTLINK_VIDEO_GUIDES: Record<string, string> = {
  cutyio: 'https://youtu.be/1g89qEw863w?si=Kt_SXK7NwMR_DJPP',
  gplinks: 'https://youtu.be/y_vy9AyV9ys?si=uaQp5yFvDeYzs1bz',
  shrinkearn: 'https://www.youtube.com/watch?v=Lh2ZIoshfBg',
  exeio: 'https://youtu.be/pQ6G5wi1tWA?si=P1qQ3S1DeUgKJQUw',
};

const POPADS_SEARCH_RESULTS_POPUNDER_INLINE_SCRIPT = `(function(){var c=window,q="bcee860f58611f493f516518f39dc2dc",r=[["siteId",558+156*834+5158328],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],l=["d3d3LmNkbjRhZHMuY29tL0dOL3NrZXJuaW5nLm1pbi5qcw==","ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvR1dSL0lqaFEvdm11aS5taW4uY3Nz"],h=-1,y,m,e=function(){clearTimeout(m);h++;if(l[h]&&!(1800992878000<(new Date).getTime()&&1<h)){y=c.document.createElement("script");y.type="text/javascript";y.async=!0;var a=c.document.getElementsByTagName("script")[0];y.src="https://"+atob(l[h]);y.crossOrigin="anonymous";y.onerror=e;y.onload=function(){clearTimeout(m);c[q.slice(0,16)+q.slice(0,16)]||e()};m=setTimeout(e,5E3);a.parentNode.insertBefore(y,a)}};if(!c[q]){try{Object.freeze(c[q]=r)}catch(e){}e()}})();`;
const MONETAG_SEARCH_RESULTS_POPUNDER_SCRIPT_SRC = 'https://al5sm.com/tag.min.js';
const MONETAG_SEARCH_RESULTS_POPUNDER_ZONE_ID = (process.env.NEXT_PUBLIC_MONETAG_ZONE_ID || '10812009').trim();
const MONETAG_SEARCH_RESULTS_INPAGE_PUSH_ZONE_ID = (process.env.NEXT_PUBLIC_MONETAG_INPAGE_ZONE_ID || '10827158').trim();
const AD_SCRIPT_READY_TIMEOUT_MS = 5000;
const POPADS_ANDROID_DIRECT_URL = (
  process.env.NEXT_PUBLIC_POPADS_ANDROID_DIRECT_URL ||
  process.env.NEXT_PUBLIC_ADSTERRA_ANDROID_DIRECT_URL ||
  ''
).trim();
const KNOWN_SHORTENER_HOST_FRAGMENTS = ['bit.ly', 'tinyurl.com', 'cuty.io', 'exe.io', 'gplinks', 'shrinkearn'];

function isAndroidChromeOrSamsungBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent || '';
  const isAndroid = /android/i.test(ua);
  const isMobile = /mobile/i.test(ua);
  const isChrome = /chrome\/\d+/i.test(ua);
  const isSamsung = /samsungbrowser\/\d+/i.test(ua);

  return isAndroid && isMobile && (isChrome || isSamsung);
}

function getExactPopadsAndroidDirectUrl(): string | null {
  if (!POPADS_ANDROID_DIRECT_URL) return null;

  try {
    const parsed = new URL(POPADS_ANDROID_DIRECT_URL);

    if (parsed.protocol !== 'https:') {
      return null;
    }

    const hostname = parsed.hostname.toLowerCase();
    const hasShortenerHost = KNOWN_SHORTENER_HOST_FRAGMENTS.some((fragment) => hostname.includes(fragment));

    if (hasShortenerHost) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

function ensureSearchPopunderOpenGuard() {
  if (typeof window === 'undefined' || window.__sfSearchPopunderOpenGuardInstalled) return;

  window.__sfOriginalWindowOpen = window.open.bind(window) as Window['open'];

  const guardedOpen: Window['open'] = (...args) => {
    const isSearchRoute = window.location.pathname.startsWith('/search');
    const allowPopunder = window.__sfAllowSearchPopunderOpen === true && isSearchRoute;

    if (!allowPopunder) {
      const maybeUrl = typeof args[0] === 'string' ? args[0].toLowerCase() : '';
      const isLikelyPopunderTarget =
        !maybeUrl ||
        maybeUrl === 'about:blank' ||
        maybeUrl.includes('al5sm.com') ||
        maybeUrl.includes('profitablecpmratenetwork.com') ||
        maybeUrl.includes('highperformanceformat.com') ||
        maybeUrl.includes('cdn4ads.com') ||
        maybeUrl.includes('cloudfront.net') ||
        maybeUrl.includes('popads') ||
        maybeUrl.includes('adsterra') ||
        maybeUrl.includes('monetag');

      if (isLikelyPopunderTarget) {
        return null;
      }
    }

    const originalOpen = window.__sfOriginalWindowOpen;
    return originalOpen ? originalOpen(...args) : null;
  };

  window.open = guardedOpen;
  window.__sfSearchPopunderOpenGuardInstalled = true;
}

function getResultUnlockStorageKey(searchQuery: string, searchType: 'mobile' | 'cnic', searchCount: number): string {
  return `sf_result_unlock:${searchType}:${searchQuery}:${searchCount}`;
}

function toText(value: unknown): string {
  const v = String(value ?? '').trim();
  return v.length ? v : '-';
}

function getLocationQuery(row: any): string {
  const parts = [row?.address, row?.city, row?.province]
    .map((value) => String(value ?? '').trim())
    .filter((value) => value.length > 0 && value !== '-');

  return parts.join(', ');
}

function getMapUrl(locationQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;
}

function getPhoneDigits(row: any): string {
  let digits = String(row?.number ?? '').replace(/\D/g, '');

  if (!digits) return '';

  // Normalize common Pakistan number formats to: 92 + 3XXXXXXXXX
  if (digits.startsWith('0092')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('03') && digits.length === 11) {
    return `92${digits.slice(1)}`;
  }

  if (digits.startsWith('3') && digits.length === 10) {
    return `92${digits}`;
  }

  if (digits.startsWith('92') && digits.length >= 12 && digits[2] === '3') {
    return digits.slice(0, 12);
  }

  return '';
}

function ResultActions({ row }: { row: any }) {
  const locationQuery = getLocationQuery(row);
  const phoneDigits = getPhoneDigits(row);

  if (!locationQuery && !phoneDigits) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        Location and phone number are not available for this record.
      </div>
    );
  }

  const mapUrl = locationQuery ? getMapUrl(locationQuery) : '';
  const whatsappUrl = phoneDigits ? `https://wa.me/${phoneDigits}` : '';
  const facebookUrl = phoneDigits ? `https://www.facebook.com/search/top/?q=${encodeURIComponent(phoneDigits)}` : '';

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
        {mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100"
          >
            <MapPin className="w-4 h-4" />
            Open on Map
          </a>
        ) : null}
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold hover:bg-emerald-100"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Number
          </a>
        ) : null}
        {facebookUrl ? (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100"
          >
            <Share2 className="w-4 h-4" />
            Facebook by Number
          </a>
        ) : null}
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }: { label: string; value: unknown; icon?: ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/10 p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="text-sm text-foreground break-words leading-relaxed">{toText(value)}</p>
    </div>
  );
}

function ResultTable({ title, rows }: { title: string; rows: any[] }) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="mt-6 space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <h3 className="text-lg sm:text-xl text-primary font-semibold">{title}</h3>
        <span className="text-xs sm:text-sm text-muted-foreground px-2.5 py-1 rounded-full bg-muted/20 border border-border/50">
          {rows.length} record{rows.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="lg:hidden grid grid-cols-1 gap-3">
        {rows.map((row, idx) => (
          <article
            key={`${row.cnic || row.number || idx}-${idx}`}
            className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-base font-semibold text-primary leading-snug break-words">{toText(row.name)}</p>
                <p className="text-xs text-muted-foreground mt-1">Record #{idx + 1}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-lg border border-border/50 bg-muted/20 text-muted-foreground">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <DetailItem label="CNIC" value={row.cnic} icon={<IdCard className="w-3.5 h-3.5" />} />
              <DetailItem label="Number" value={row.number} icon={<Phone className="w-3.5 h-3.5" />} />
              <DetailItem label="Company" value={row.company} icon={<Building2 className="w-3.5 h-3.5" />} />
              <DetailItem label="Address" value={row.address} icon={<MapPin className="w-3.5 h-3.5" />} />
              <DetailItem label="City" value={row.city} icon={<Landmark className="w-3.5 h-3.5" />} />
              <DetailItem label="Province" value={row.province} icon={<Info className="w-3.5 h-3.5" />} />
            </div>

            <div className="mt-3">
              <ResultActions row={row} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-muted/15">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">CNIC</th>
                <th className="text-left px-4 py-3 font-semibold">Number</th>
                <th className="text-left px-4 py-3 font-semibold">Company</th>
                <th className="text-left px-4 py-3 font-semibold">Address</th>
                <th className="text-left px-4 py-3 font-semibold">City</th>
                <th className="text-left px-4 py-3 font-semibold">Province</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={`${row.cnic || row.number || idx}-${idx}`} className="border-t border-border/40 hover:bg-muted/10">
                  <td className="px-4 py-3 font-medium">{toText(row.name)}</td>
                  <td className="px-4 py-3">{toText(row.cnic)}</td>
                  <td className="px-4 py-3">{toText(row.number)}</td>
                  <td className="px-4 py-3">{toText(row.company)}</td>
                  <td className="px-4 py-3">{toText(row.address)}</td>
                  <td className="px-4 py-3">{toText(row.city)}</td>
                  <td className="px-4 py-3">{toText(row.province)}</td>
                  <td className="px-4 py-3 align-top min-w-[260px]">
                    <ResultActions row={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ComingSoonCard({ cleanedQuery, searchType }: { cleanedQuery: string; searchType: 'mobile' | 'cnic' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50 p-6 sm:p-8 shadow-sm">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-200/30 blur-2xl" />
      <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-2xl border border-violet-200 bg-white/80 p-3">
            <Search className="w-6 h-6 text-violet-600" />
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold text-violet-900">No records found right now</p>
            <p className="mt-1 text-sm sm:text-base text-violet-800/90">
              Your query is saved. We are expanding the data index and user detail coverage.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-xl border border-violet-200 bg-white/80 px-3 py-1.5 text-xs sm:text-sm font-semibold text-violet-700">
                2026 User Detail Update
              </span>
              <span className="inline-flex items-center rounded-xl border border-sky-200 bg-white/80 px-3 py-1.5 text-xs sm:text-sm font-semibold text-sky-700">
                Coming next month 🚀
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-violet-200/80 bg-white/75 p-3">
            <p className="text-xs uppercase tracking-wide text-violet-700/80 font-semibold">Planned user details in 2026</p>
            <ul className="mt-2 space-y-1.5 text-sm text-violet-900">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />Enhanced profile matching</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />Faster city-level lookup results</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />Improved multi-source data sync</li>
            </ul>
          </div>

          <div className="rounded-xl border border-sky-200/80 bg-white/75 p-3">
            <p className="text-xs uppercase tracking-wide text-sky-700/80 font-semibold">Request snapshot</p>
            <div className="mt-2 space-y-2 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Query:</span> {cleanedQuery}</p>
              <p><span className="font-semibold text-slate-900">Type:</span> {searchType.toUpperCase()}</p>
              <p><span className="font-semibold text-slate-900">Status:</span> Queued for upcoming index updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchResultsPage({ searchQuery, searchType, unlockToken = '', onBack }: SearchResultsPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<SearchApiResponse | null>(null);
  const [isResultsUnlocked, setIsResultsUnlocked] = useState(false);
  const [adScriptReady, setAdScriptReady] = useState(false);
  const [adScriptFailed, setAdScriptFailed] = useState(false);
  const [adScriptTimedOut, setAdScriptTimedOut] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');
  const [sharingReport, setSharingReport] = useState(false);
  const shareFeedbackTimeoutRef = useRef<number | null>(null);

  const pathname = usePathname();
  const isSearchResultsRoute = pathname.startsWith('/search');
  const cleanedQuery = useMemo(() => searchQuery.trim().replace(/[^0-9]/g, ''), [searchQuery]);

  useEffect(() => {
    setIsResultsUnlocked(false);
    setAdScriptReady(false);
    setAdScriptFailed(false);
    setAdScriptTimedOut(false);

    if (!cleanedQuery) {
      setLoading(false);
      setError('Please enter a valid query.');
      return;
    }

    let active = true;

    const runSearch = async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          q: cleanedQuery,
          type: searchType,
        });

        if (unlockToken) {
          params.set('unlock', unlockToken);
        }

        const res = await fetch(`/api/website-search?${params.toString()}`, { cache: 'no-store' });
        const data = (await res.json()) as SearchApiResponse;

        if (!active) return;

        if (data.requireShortlink) {
          setResponse(data);
          return;
        }

        if (!res.ok || !data.success) {
          setError(data.error || 'Search failed. Please try again.');
          setResponse(data);
          return;
        }

        setResponse(data);
      } catch {
        if (!active) return;
        setError('Network issue while searching. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void runSearch();

    return () => {
      active = false;
    };
  }, [cleanedQuery, searchType, unlockToken]);

  useEffect(() => {
    return () => {
      if (shareFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(shareFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const resultData = response?.result || null;
  const numberData = Array.isArray(resultData?.numberData) ? resultData.numberData : [];
  const cnicData = Array.isArray(resultData?.data) ? resultData.data : [];
  const allRecords = [
    ...numberData.map((row: any) => ({ section: 'Number Results', row })),
    ...cnicData.map((row: any) => ({ section: numberData.length > 0 ? 'Linked CNIC Results' : 'Results', row })),
  ];

  const currentSearchCount = Number(response?.meta?.searchCount || 1);
  const freeLimit = Number(response?.meta?.freeQueries || 3);
  const remainingFreeSearches = Math.max(freeLimit - currentSearchCount, 0);
  const isGateEnabled = response?.meta?.gateEnabled !== false;
  const isAndroidChromeOrSamsung = useMemo(() => isAndroidChromeOrSamsungBrowser(), []);
  const popadsAndroidDirectUrl = useMemo(() => getExactPopadsAndroidDirectUrl(), []);
  const unlockStorageKey = useMemo(
    () => getResultUnlockStorageKey(cleanedQuery, searchType, currentSearchCount),
    [cleanedQuery, searchType, currentSearchCount]
  );
  const normalizedProvider = String(response?.provider || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const providerGuideUrl = SHORTLINK_VIDEO_GUIDES[normalizedProvider];
  const isApiNoRecordState = Boolean(response?.success) && numberData.length === 0 && cnicData.length === 0;
  const noRecordText = `${response?.error || ''} ${response?.message || ''}`.toLowerCase();
  const isNoRecordErrorState = Boolean(error) && /(no\s*record|not\s*found|no\s*data|not\s*available)/i.test(noRecordText);
  const showComingSoonCard = isApiNoRecordState || isNoRecordErrorState;
  const hasSearchResults = numberData.length > 0 || cnicData.length > 0;
  const shouldUseAndroidPopadsDirectFlow =
    isSearchResultsRoute &&
    isAndroidChromeOrSamsung &&
    hasSearchResults &&
    !isResultsUnlocked &&
    Boolean(popadsAndroidDirectUrl) &&
    (adScriptFailed || adScriptTimedOut);
  const shouldAllowPopunderOpen = isSearchResultsRoute && hasSearchResults && !isResultsUnlocked;
  const canUnlockResults = isSearchResultsRoute && (adScriptReady || adScriptFailed || adScriptTimedOut);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    ensureSearchPopunderOpenGuard();
    window.__sfAllowSearchPopunderOpen = shouldAllowPopunderOpen;

    return () => {
      window.__sfAllowSearchPopunderOpen = false;
    };
  }, [shouldAllowPopunderOpen]);

  useEffect(() => {
    if (!isSearchResultsRoute || !hasSearchResults || isResultsUnlocked || typeof document === 'undefined') return;

    setAdScriptReady(false);
    setAdScriptFailed(false);
    setAdScriptTimedOut(false);

    const popadsPopunderScript = document.createElement('script');
    popadsPopunderScript.id = 'search-results-popads-popunder-script';
    popadsPopunderScript.type = 'text/javascript';
    popadsPopunderScript.async = true;
    popadsPopunderScript.setAttribute('data-cfasync', 'false');
    popadsPopunderScript.text = POPADS_SEARCH_RESULTS_POPUNDER_INLINE_SCRIPT;

    const monetagPopunderScript = document.createElement('script');
    monetagPopunderScript.id = 'search-results-monetag-popunder-script';
    monetagPopunderScript.src = MONETAG_SEARCH_RESULTS_POPUNDER_SCRIPT_SRC;
    monetagPopunderScript.async = true;
    monetagPopunderScript.setAttribute('data-cfasync', 'false');
    if (MONETAG_SEARCH_RESULTS_POPUNDER_ZONE_ID) {
      monetagPopunderScript.dataset.zone = MONETAG_SEARCH_RESULTS_POPUNDER_ZONE_ID;
    }

    const monetagInPagePushScript = document.createElement('script');
    monetagInPagePushScript.id = 'search-results-monetag-inpage-push-script';
    monetagInPagePushScript.src = MONETAG_SEARCH_RESULTS_POPUNDER_SCRIPT_SRC;
    monetagInPagePushScript.async = true;
    monetagInPagePushScript.setAttribute('data-cfasync', 'false');
    if (MONETAG_SEARCH_RESULTS_INPAGE_PUSH_ZONE_ID) {
      monetagInPagePushScript.dataset.zone = MONETAG_SEARCH_RESULTS_INPAGE_PUSH_ZONE_ID;
    }

    const handleAdScriptLoad = () => {
      setAdScriptReady(true);
      setAdScriptFailed(false);
      setAdScriptTimedOut(false);
    };

    const handleAdScriptError = () => {
      setAdScriptFailed(true);
    };

    monetagPopunderScript.addEventListener('load', handleAdScriptLoad);
    monetagPopunderScript.addEventListener('error', handleAdScriptError);
    monetagInPagePushScript.addEventListener('load', handleAdScriptLoad);
    monetagInPagePushScript.addEventListener('error', handleAdScriptError);

    document.body.appendChild(popadsPopunderScript);
    if (MONETAG_SEARCH_RESULTS_POPUNDER_ZONE_ID) {
      document.body.appendChild(monetagPopunderScript);
    }
    if (MONETAG_SEARCH_RESULTS_INPAGE_PUSH_ZONE_ID) {
      document.body.appendChild(monetagInPagePushScript);
    }

    // PopAds + Monetag tags are injected together for maximum fill.
    setAdScriptReady(true);
    setAdScriptFailed(false);
    setAdScriptTimedOut(false);

    return () => {
      monetagPopunderScript.removeEventListener('load', handleAdScriptLoad);
      monetagPopunderScript.removeEventListener('error', handleAdScriptError);
      monetagInPagePushScript.removeEventListener('load', handleAdScriptLoad);
      monetagInPagePushScript.removeEventListener('error', handleAdScriptError);

      if (popadsPopunderScript.parentNode) {
        popadsPopunderScript.parentNode.removeChild(popadsPopunderScript);
      }
      if (monetagPopunderScript.parentNode) {
        monetagPopunderScript.parentNode.removeChild(monetagPopunderScript);
      }
      if (monetagInPagePushScript.parentNode) {
        monetagInPagePushScript.parentNode.removeChild(monetagInPagePushScript);
      }
    };
  }, [isSearchResultsRoute, hasSearchResults, isResultsUnlocked]);

  useEffect(() => {
    if (!isSearchResultsRoute || !hasSearchResults || isResultsUnlocked || adScriptReady || adScriptFailed) return;

    const timeoutId = window.setTimeout(() => {
      setAdScriptTimedOut(true);
    }, AD_SCRIPT_READY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSearchResultsRoute, hasSearchResults, isResultsUnlocked, adScriptReady, adScriptFailed]);

  useEffect(() => {
    if (!isSearchResultsRoute || !hasSearchResults || typeof window === 'undefined') return;
    const persistedUnlock = window.sessionStorage.getItem(unlockStorageKey) === '1';
    if (persistedUnlock) {
      setIsResultsUnlocked(true);
    }
  }, [isSearchResultsRoute, hasSearchResults, unlockStorageKey]);

  const shareReport = async () => {
    if (typeof window === 'undefined' || sharingReport) return;

    setSharingReport(true);

    const showShareFeedback = (message: string) => {
      setShareFeedback(message);

      if (shareFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(shareFeedbackTimeoutRef.current);
      }

      shareFeedbackTimeoutRef.current = window.setTimeout(() => {
        setShareFeedback('');
        shareFeedbackTimeoutRef.current = null;
      }, 3500);
    };

    const reportText = `SIM Finder Report\nQuery: ${cleanedQuery} (${searchType.toUpperCase()})\nTotal Records: ${allRecords.length}`;
    const sharePayload = `${reportText}\n${window.location.href}`;

    const copyUsingLegacyFallback = () => {
      if (typeof document === 'undefined') return false;

      const textarea = document.createElement('textarea');
      textarea.value = sharePayload;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const copied = document.execCommand('copy');

      document.body.removeChild(textarea);
      return copied;
    };

    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'SIM Finder Report',
            text: reportText,
            url: window.location.href,
          });
          showShareFeedback('Report shared successfully.');
          return;
        } catch (shareError) {
          if ((shareError as DOMException)?.name === 'AbortError') {
            showShareFeedback('Share cancelled.');
            return;
          }
        }
      }

      let copied = false;

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(sharePayload);
          copied = true;
        } catch {
          copied = copyUsingLegacyFallback();
        }
      } else {
        copied = copyUsingLegacyFallback();
      }

      if (copied) {
        showShareFeedback('Report copied to clipboard.');
        return;
      }

      const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(sharePayload)}`;
      const openedShareWindow = window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer');

      if (openedShareWindow) {
        showShareFeedback('Opened share in a new tab.');
      } else {
        showShareFeedback('Unable to open share. Please copy the URL manually.');
      }
    } finally {
      setSharingReport(false);
    }
  };

  const handleUnlockResults = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isSearchResultsRoute) return;
    if (!canUnlockResults) return;

    // Ensure ad opens only from a real human interaction.
    if (!event.isTrusted) return;

    if (shouldUseAndroidPopadsDirectFlow && popadsAndroidDirectUrl) {
      // Keep this synchronous in click handler to preserve browser trust on Android.
      const openedWindow = window.open(popadsAndroidDirectUrl, '_blank', 'noopener,noreferrer');
      if (!openedWindow) {
        window.location.assign(popadsAndroidDirectUrl);
        return;
      }
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(unlockStorageKey, '1');
    }
    setIsResultsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-muted/10 to-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <button
            onClick={onBack}
            className="mb-4 flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-6 h-6 text-accent hover:text-primary transition-colors" />
          </button>

          <div className="bg-white rounded-2xl border border-border/60 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                  SIM detail checker results
                </h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                  Query: <span className="font-semibold text-foreground">{cleanedQuery}</span> ({searchType.toUpperCase()})
                </p>
              </div>
            </div>

            {response?.meta ? (
              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/60 bg-muted/10">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-semibold text-primary">#{currentSearchCount}</span>
                </div>

                {isGateEnabled ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50">
                      <span className="text-emerald-700">Free Limit</span>
                      <span className="font-semibold text-emerald-700">{freeLimit}</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50">
                      <span className="text-blue-700">Remaining</span>
                      <span className="font-semibold text-blue-700">{remainingFreeSearches}</span>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[45vh]">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
              <p>Searching records...</p>
            </div>
          </div>
        ) : response?.requireShortlink ? (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 text-blue-900">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-base sm:text-lg">One more step required</p>
                <p className="mt-1 text-sm sm:text-base text-blue-800/90">
                  To continue this search, open the short link once and return to this page.
                </p>
                <p className="mt-3 text-sm">
                  Provider: <span className="font-semibold uppercase">{response.provider || 'N/A'}</span>
                  {response.meta?.fallbackUsed ? (
                    <span className="ml-2 px-2 py-0.5 rounded-lg bg-blue-100 border border-blue-200 text-xs">Fallback used</span>
                  ) : null}
                </p>
              </div>

              {response.redirectUrl ? (
                <a
                  href={response.redirectUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  Open Short Link <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}
            </div>

            <div className="mt-4 bg-white/80 border border-blue-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900">How to unlock search:</p>
              <ol className="mt-2 space-y-1.5 text-sm text-blue-900/90 list-decimal list-inside">
                <li>Click <span className="font-semibold">Open Short Link</span>.</li>
                <li>Wait for the shortener page to fully load once.</li>
                <li>Return to this tab.</li>
                <li>Click <span className="font-semibold">I Completed, Check Again</span>.</li>
              </ol>

              {providerGuideUrl ? (
                <a
                  href={providerGuideUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100"
                >
                  <Video className="w-4 h-4" />
                  Watch tutorial for {response?.provider?.toUpperCase()}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  I Completed, Check Again
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50"
                >
                  Back to Search
                </button>
              </div>
            </div>

            {response.meta?.attemptedProviders?.length || response.attemptedProviders?.length ? (
              <div className="mt-4 bg-white/70 border border-blue-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-blue-900/80 mb-2">Provider attempts</p>
                <div className="flex flex-wrap gap-2">
                  {(response.meta?.attemptedProviders || response.attemptedProviders || []).map((attempt, idx) => (
                    <span
                      key={`${attempt.provider}-${idx}`}
                      className={`px-2 py-1 rounded-lg text-xs border ${attempt.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}
                    >
                      {attempt.provider.toUpperCase()} · {attempt.ok ? 'OK' : (attempt.message || 'Failed')}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {response.message ? <p className="text-xs mt-3 text-blue-900/75">{response.message}</p> : null}
          </div>
        ) : showComingSoonCard ? (
          <ComingSoonCard cleanedQuery={cleanedQuery} searchType={searchType} />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 text-red-700">
            <p className="font-medium">{error}</p>
            {response?.provider && (
              <p className="mt-2 text-sm">
                Provider: <span className="font-semibold uppercase">{response.provider}</span>
              </p>
            )}
            {response?.redirectUrl && (
              <a
                href={response.redirectUrl}
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                Continue via short link <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          <>
            {hasSearchResults ? (
              <>
                <div className="relative mt-2">
                  <div className={isResultsUnlocked ? '' : 'blur-md pointer-events-none select-none'}>
                    {numberData.length > 0 && <ResultTable title="Number Results" rows={numberData} />}
                    {cnicData.length > 0 && <ResultTable title={numberData.length > 0 ? 'Linked CNIC Results' : 'Results'} rows={cnicData} />}

                    <div className="mt-6 text-xs sm:text-sm text-muted-foreground bg-white border border-border/60 rounded-xl p-3.5 flex items-start gap-2">
                      <UserRound className="w-4 h-4 mt-0.5 text-accent" />
                      <p>
                        For privacy and accuracy, always verify important records from official sources before taking action.
                      </p>
                    </div>

                    {allRecords.length > 0 && (
                      <div className="mt-4 rounded-2xl border border-border/60 bg-white p-4 sm:p-5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => { void shareReport(); }}
                          disabled={sharingReport}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold ${sharingReport ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-100'}`}
                        >
                          <Share2 className="w-4 h-4" />
                          {sharingReport ? 'Sharing...' : 'Share Report'}
                        </button>
                        {shareFeedback ? (
                          <p className="text-sm text-muted-foreground">{shareFeedback}</p>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {!isResultsUnlocked && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/55">
                      <div className="max-w-sm mx-4 rounded-2xl border border-border/60 bg-white/95 p-5 text-center shadow-lg">
                        <p className="text-base font-semibold text-primary">Results are ready</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {canUnlockResults
                            ? shouldUseAndroidPopadsDirectFlow
                              ? 'Tap below to open sponsor link once, then view full details.'
                              : 'Tap below to view full details.'
                            : 'Preparing ad check… please wait 1–2 seconds.'}
                        </p>
                        <p className="mt-1.5 text-[11px] text-muted-foreground">
                          Ads active: PopAdsNet + Monetag (Popunder + In-Page Push)
                        </p>
                        <button
                          type="button"
                          onClick={handleUnlockResults}
                          disabled={!canUnlockResults}
                          className={`mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${
                            canUnlockResults ? 'bg-primary hover:bg-primary/90' : 'bg-primary/60 cursor-not-allowed'
                          }`}
                        >
                          {canUnlockResults
                            ? shouldUseAndroidPopadsDirectFlow
                              ? 'Open Sponsor Link'
                              : 'View Now'
                            : 'Preparing…'}
                        </button>
                        {(adScriptFailed || adScriptTimedOut) && (
                          <p className="mt-2 text-xs text-amber-700">
                            If Chrome blocks pop-ups, allow pop-ups for this site and tap again.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
