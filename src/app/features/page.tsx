import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FeaturesPage as FeaturesPageContent } from '@/components/FeaturesPage';
import { getSiteUrl } from '@/lib/site-url';
import { getPageKeywordSet } from '@/lib/seo-keywords';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();
const FEATURES_FAQ_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What does the SIM verification feature include?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'It includes number checks, CNIC-linked verification workflows, and practical security guidance for identifying suspicious records.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I use these features for CNIC-based checks?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, the features cover CNIC-oriented validation flows and recommended next steps when unexpected records appear.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are SIM verification features privacy-safe?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The platform is designed around legal, privacy-safe, and authorized verification methods for long-term account and identity security.',
            },
        },
    ],
} as const;

export const metadata: Metadata = {
    title: 'SIM Verification Features | CNIC and Number Check Tools',
    description: 'Explore SIM Finder features for CNIC verification, SIM number checks, tracking safeguards, and secure identity workflows tailored for users in Pakistan.',
    keywords: getPageKeywordSet('features', 14),
    alternates: {
        canonical: `${SITE_URL}/features`,
    },
    openGraph: {
        title: 'SIM Verification Features | CNIC and Number Check Tools',
        description: 'Explore practical SIM verification features including CNIC-linked checks, number insights, and identity protection workflows in Pakistan.',
        url: `${SITE_URL}/features`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SIM Verification Features for Pakistan | SIM Finder',
        description: 'Explore secure features for SIM checks, CNIC verification, and number intelligence workflows in Pakistan.',
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
            <script
                id="faq-jsonld-features"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(FEATURES_FAQ_JSON_LD) }}
            />
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <GlobalSearchCard className="pt-5 sm:pt-6 pb-5 sm:pb-7" />
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
