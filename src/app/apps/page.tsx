import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { AppPage as AppPageContent } from '@/components/AppPage';
import { getSiteUrl } from '@/lib/site-url';
import {
    buildPageSeoTitle,
    getKeywordSentence,
    getPageKeywordSet,
} from '@/lib/seo-keywords';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('Apps & Tools for SIM Check, CNIC Verification and Number Lookup', 'apps', 3, 94),
    description: `Explore SIM Finder apps and tools for SIM details checks and CNIC workflows in Pakistan, including ${getKeywordSentence(30, 8)}.`,
    keywords: getPageKeywordSet('apps', 26),
    alternates: {
        canonical: `${SITE_URL}/apps`,
    },
    openGraph: {
        title: buildPageSeoTitle('Apps for SIM Verification and Number Intelligence', 'apps', 3, 94),
        description: `Discover SIM Finder apps for secure SIM details and owner verification workflows in Pakistan with terms like ${getKeywordSentence(40, 8)}.`,
        url: `${SITE_URL}/apps`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: buildPageSeoTitle('SIM Verification Apps for Pakistan', 'apps', 2, 88),
        description: `SIM check and number lookup app coverage with keywords: ${getKeywordSentence(48, 7)}.`,
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
