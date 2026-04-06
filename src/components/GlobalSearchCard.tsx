'use client';

import { CheckCircle2, CreditCard, Phone, Search, Shield, User, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type SearchTab = 'number' | 'cnic';

interface GlobalSearchCardProps {
  className?: string;
}

export function GlobalSearchCard({ className = '' }: GlobalSearchCardProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SearchTab>('number');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const type = params.get('type');

    if (type === 'cnic') {
      setActiveTab('cnic');
    } else if (type === 'mobile') {
      setActiveTab('number');
    }

    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const placeholder = useMemo(
    () =>
      activeTab === 'number'
        ? 'Enter mobile number for SIM details check (e.g., 03001234567)'
        : 'Enter CNIC for owner details check (e.g., 12345-1234567-1)',
    [activeTab]
  );

  const helperText = useMemo(
    () =>
      activeTab === 'number'
        ? 'Enter a valid Pakistani mobile number to check SIM owner details'
        : 'Enter a valid 13-digit CNIC to check linked SIM details',
    [activeTab]
  );

  const canSearch = searchQuery.trim().length > 0;

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    const type = activeTab === 'number' ? 'mobile' : 'cnic';
    router.push(`/search?query=${encodeURIComponent(query)}&type=${type}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={`w-full px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('number')}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'number' ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-foreground hover:bg-muted/50'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              type="button"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mobile Number</span>
            </button>
            <button
              onClick={() => setActiveTab('cnic')}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'cnic' ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-foreground hover:bg-muted/50'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              type="button"
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>CNIC</span>
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                {activeTab === 'number' ? <Phone className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
              </div>
              <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 sm:py-5 text-foreground bg-muted/50 rounded-2xl outline-none border-2 border-transparent focus:border-accent transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p style={{ fontFamily: "'Inter', sans-serif" }}>{helperText}</p>
            </div>

            <button
              className={`w-full mt-4 px-6 py-4 sm:py-5 bg-gradient-to-r from-primary to-[#2A4D5A] text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group ${
                canSearch ? 'hover:shadow-xl' : 'opacity-75 cursor-not-allowed'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              type="button"
              onClick={handleSearch}
              disabled={!canSearch}
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Check SIM Details</span>
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-accent" />
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent" />
              <span>Instant</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
