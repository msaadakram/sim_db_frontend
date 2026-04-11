import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { AppPage as AppPageContent } from '@/components/AppPage';
import { getSiteUrl } from '@/lib/site-url';
import { getPageKeywordSet } from '@/lib/seo-keywords';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();
const APPS_FAQ_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is the SIM check app free to download?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, users can access the app download with core SIM verification capabilities and expand workflows based on their usage needs.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I verify CNIC-linked SIM details in the app?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The app is designed to support practical CNIC and number verification workflows using authorized, privacy-safe methods.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does the app support secure identity checks?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, the app emphasizes secure access, privacy controls, and structured verification actions for safer long-term usage.',
            },
        },
    ],
} as const;

export const metadata: Metadata = {
    title: 'SIM Check Apps for Pakistan | CNIC & Number Tools Online',
    description: 'Download SIM check apps for Pakistan to verify number and CNIC-linked records, track risk signals, and run secure lookup tasks from your mobile.',
    keywords: getPageKeywordSet('apps', 12),
    alternates: {
        canonical: `${SITE_URL}/apps`,
    },
    openGraph: {
        title: 'SIM Check Apps for Pakistan | CNIC & Number Tools Online',
        description: 'Explore SIM verification apps for Pakistan focused on CNIC-linked checks, secure number lookup workflows, and identity risk awareness.',
        url: `${SITE_URL}/apps`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SIM Check Apps for Pakistan | SIM OWNER DETAIL',
        description: 'Get SIM verification apps for number checks, CNIC validation guidance, and secure mobile-first workflows in Pakistan.',
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
            <script
                id="faq-jsonld-apps"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(APPS_FAQ_JSON_LD) }}
            />
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <GlobalSearchCard className="pt-5 sm:pt-6 pb-5 sm:pb-7" />
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
