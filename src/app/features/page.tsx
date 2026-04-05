import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FeaturesPage as FeaturesPageContent } from '@/components/FeaturesPage';
import { getSiteUrl } from '@/lib/site-url';
import {
    buildPageSeoTitle,
    getKeywordSentence,
    getPageKeywordSet,
} from '@/lib/seo-keywords';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('SIM Features for Owner Lookup, CNIC Check and Verification', 'features', 3, 94),
    description: `Review SIM Finder features for SIM owner lookup and CNIC-linked checks in Pakistan with phrases like ${getKeywordSentence(22, 10)}.`,
    keywords: getPageKeywordSet('features', 28),
    alternates: {
        canonical: `${SITE_URL}/features`,
    },
    openGraph: {
        title: buildPageSeoTitle('SIM Verification Features and Number Insight Tools', 'features', 3, 94),
        description: `Explore powerful SIM verification, number insights, and CNIC data-check features from SIM Finder: ${getKeywordSentence(32, 8)}.`,
        url: `${SITE_URL}/features`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: buildPageSeoTitle('SIM Verification Features for Pakistan', 'features', 2, 88),
        description: `Feature coverage includes: ${getKeywordSentence(42, 8)}.`,
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
