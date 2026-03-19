'use client';

import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SearchResultsPage } from '@/components/SearchResultsPage';
import { useSearchParams, useRouter } from 'next/navigation';

function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query = searchParams.get('query') || '';
    const type = (searchParams.get('type') as 'mobile' | 'cnic') || 'mobile';

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <SearchResultsPage
            searchQuery={query}
            searchType={type}
            onBack={handleBackToHome}
        />
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <Suspense fallback={<SectionLoader />}>
                    <SearchContent />
                </Suspense>
            </main>
            <ScrollToTop />
        </div>
    );
}
