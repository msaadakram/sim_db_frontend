import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';
import { buildPageSeoTitle, getPageKeywordSet } from '@/lib/seo-keywords';
import SearchPageClient from './SearchPageClient';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('Search SIM Details, Owner Information and Number Records', 'search', 2, 88),
    description: 'Search SIM details and CNIC-linked records using SIM Finder secure lookup tools.',
    keywords: getPageKeywordSet('search', 20),
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
