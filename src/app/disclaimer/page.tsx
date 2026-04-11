import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { DisclaimerPage as DisclaimerPageContent } from '@/components/DisclaimerPage';
import { getSiteUrl } from '@/lib/site-url';
import { SEO_SITE_NAME } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'SIM OWNER DETAIL Disclaimer | Legal, Privacy and Data Use',
    description: 'Review SIM OWNER DETAIL legal, privacy, and acceptable-use policies for SIM/CNIC verification content, data handling, and user responsibilities in Pakistan.',
    keywords: [
        'sim owner detail disclaimer',
        'sim verification legal policy',
        'cnic verification privacy policy',
        'acceptable use sim lookup',
    ],
    alternates: {
        canonical: `${SITE_URL}/disclaimer`,
    },
    openGraph: {
        title: 'SIM OWNER DETAIL Disclaimer | Legal, Privacy and Data Use',
        description: 'Read legal and privacy guidance for SIM and CNIC verification content, data handling rules, and responsible user obligations in Pakistan.',
        url: `${SITE_URL}/disclaimer`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'SIM OWNER DETAIL Disclaimer | Legal and Privacy Policy',
        description: 'Understand legal and privacy boundaries for SIM/CNIC verification usage and content publication in Pakistan.',
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
