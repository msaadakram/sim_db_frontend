import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import SearchPageClient from './SearchPageClient';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Search Results - SIM Finder',
    description: 'Search SIM details and CNIC-linked records using SIM Finder secure lookup tools.',
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
