import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FeaturesPage as FeaturesPageContent } from '@/components/FeaturesPage';
import { getSiteUrl } from '@/lib/site-url';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Features - SIM Details Check & Verification',
    description: 'Review SIM Finder features for SIM owner lookup, CNIC-linked data checks, and verification tools for Pakistan users.',
    alternates: {
        canonical: `${SITE_URL}/features`,
    },
    openGraph: {
        title: 'Features - SIM Details Check & Verification',
        description: 'Explore powerful SIM verification, number insights, and CNIC data-check features from SIM Finder.',
        url: `${SITE_URL}/features`,
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

export default function FeaturesRoutePage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <FeaturesPageContent />
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
