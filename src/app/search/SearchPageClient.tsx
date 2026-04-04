'use client';

import { Suspense, lazy } from 'react';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SearchResultsPage } from '@/components/SearchResultsPage';
import { useSearchParams, useRouter } from 'next/navigation';

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

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
    const unlock = searchParams.get('unlock') || '';

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <SearchResultsPage
            searchQuery={query}
            searchType={type}
            unlockToken={unlock}
            onBack={handleBackToHome}
        />
    );
}

export default function SearchPageClient() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <Suspense fallback={<SectionLoader />}>
                    <SearchContent />
                </Suspense>
                <Suspense fallback={<SectionLoader />}>
                    <Footer />
                </Suspense>
            </main>
            <ScrollToTop />
        </div>
    );
}
