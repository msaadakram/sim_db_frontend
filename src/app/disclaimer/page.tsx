import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { DisclaimerPage as DisclaimerPageContent } from '@/components/DisclaimerPage';
import { getSiteUrl } from '@/lib/site-url';
import {
    buildPageSeoTitle,
    getKeywordSentence,
    getPageKeywordSet,
} from '@/lib/seo-keywords';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('Disclaimer for SIM Details, CNIC and Number Verification Content', 'disclaimer', 2, 90),
    description: `Read the legal and privacy disclaimer for SIM details and verification content, including keyword scopes like ${getKeywordSentence(54, 8)}.`,
    keywords: getPageKeywordSet('disclaimer', 20),
    alternates: {
        canonical: `${SITE_URL}/disclaimer`,
    },
    openGraph: {
        title: buildPageSeoTitle('Legal Disclaimer for SIM Verification Content', 'disclaimer', 2, 90),
        description: `Privacy and legal usage guidance for SIM detail and number-check content in Pakistan: ${getKeywordSentence(64, 7)}.`,
        url: `${SITE_URL}/disclaimer`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: buildPageSeoTitle('SIM Verification Disclaimer', 'disclaimer', 2, 84),
        description: `Legal and privacy limits for SIM detail usage and content publication in Pakistan.`,
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
                    <GlobalSearchCard className="pt-5 sm:pt-6 pb-5 sm:pb-7" />
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
