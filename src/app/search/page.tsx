import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import SearchPageClient from './SearchPageClient';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Search SIM Number Details | Private Lookup Results',
    description: 'Run secure SIM and CNIC searches in a private session. This utility page is intentionally noindex to protect privacy and avoid thin indexed URLs.',
    keywords: [
        'sim number search',
        'cnic search session',
        'private sim lookup results',
    ],
    alternates: {
        canonical: `${SITE_URL}/search`,
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function SearchPage() {
    return <SearchPageClient />;
}
