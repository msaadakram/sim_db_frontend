import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { DisclaimerPage as DisclaimerPageContent } from '@/components/DisclaimerPage';
import { getSiteUrl } from '@/lib/site-url';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Disclaimer - SIM Finder',
    description: 'Read the SIM Finder disclaimer for legal, privacy, and data-usage guidance related to SIM details and verification content.',
    alternates: {
        canonical: `${SITE_URL}/disclaimer`,
    },
    robots: {
        index: true,
        follow: true,
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

export default function DisclaimerRoutePage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <DisclaimerPageContent />
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
