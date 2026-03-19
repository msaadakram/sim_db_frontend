'use client';

import { motion } from 'motion/react';
import { ArrowLeft, Search, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
    unlockedByToken?: boolean;
    fallbackUsed?: boolean;
    attemptedProviders?: Array<{ provider: string; ok: boolean; message?: string }>;
  };
}

function ResultTable({ title, rows }: { title: string; rows: any[] }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/60 overflow-hidden mt-6">
      <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
        <h3 className="text-lg text-primary font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[780px]">
          <thead className="bg-muted/10">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">CNIC</th>
              <th className="text-left px-4 py-3">Number</th>
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Address</th>
              <th className="text-left px-4 py-3">City</th>
              <th className="text-left px-4 py-3">Province</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${row.cnic || row.number || idx}-${idx}`} className="border-t border-border/40 hover:bg-muted/10">
                <td className="px-4 py-3">{row.name || '-'}</td>
                <td className="px-4 py-3">{row.cnic || '-'}</td>
                <td className="px-4 py-3">{row.number || '-'}</td>
                <td className="px-4 py-3">{row.company || '-'}</td>
                <td className="px-4 py-3">{row.address || '-'}</td>
                <td className="px-4 py-3">{row.city || '-'}</td>
                <td className="px-4 py-3">{row.province || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SearchResultsPage({ searchQuery, searchType, unlockToken = '', onBack }: SearchResultsPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<SearchApiResponse | null>(null);

  const cleanedQuery = useMemo(() => searchQuery.trim().replace(/[^0-9]/g, ''), [searchQuery]);

  useEffect(() => {
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

  const resultData = response?.result || null;
  const numberData = Array.isArray(resultData?.numberData) ? resultData.numberData : [];
  const cnicData = Array.isArray(resultData?.data) ? resultData.data : [];

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
              <div>
                <h2 className="text-2xl sm:text-3xl text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Search Results
                </h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                  Query: <span className="font-semibold text-foreground">{cleanedQuery}</span> ({searchType.toUpperCase()})
                </p>
              </div>

              {response?.meta && (
                <div className="text-xs sm:text-sm text-muted-foreground bg-muted/20 px-3 py-2 rounded-xl">
                  Search #{response.meta.searchCount || 1} • Free {response.meta.freeQueries || 3}
                </div>
              )}
            </div>
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
            {numberData.length > 0 && <ResultTable title="Number Results" rows={numberData} />}
            {cnicData.length > 0 && <ResultTable title={numberData.length > 0 ? 'Linked CNIC Results' : 'Results'} rows={cnicData} />}

            {numberData.length === 0 && cnicData.length === 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-800 flex items-start gap-3">
                <Search className="w-5 h-5 mt-0.5" />
                <p>No records found for this query.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
