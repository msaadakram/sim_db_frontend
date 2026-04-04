import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { AppPage as AppPageContent } from '@/components/AppPage';
import { getSiteUrl } from '@/lib/site-url';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Apps - SIM Finder Tools & Downloads',
    description: 'Explore SIM Finder apps and tools for SIM details check, CNIC verification, and mobile number lookup in Pakistan.',
    alternates: {
        canonical: `${SITE_URL}/apps`,
    },
    openGraph: {
        title: 'Apps - SIM Finder Tools & Downloads',
        description: 'Discover SIM Finder apps for secure SIM details and owner verification workflows in Pakistan.',
        url: `${SITE_URL}/apps`,
        type: 'website',
    },
};

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

export default function AppsPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <AppPageContent />
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
