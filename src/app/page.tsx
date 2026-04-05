import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';
import {
    buildPageSeoTitle,
    getKeywordSentence,
    getPageKeywordSet,
} from '@/lib/seo-keywords';
import { getSiteUrl } from '@/lib/site-url';
import { SEO_SITE_NAME } from '@/lib/next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('SIM Details Check Pakistan, CNIC & Number Verification', 'home', 3, 92),
    description:
        `Do a fast SIM details check in Pakistan with trusted lookup workflows and practical CNIC guidance. High-intent phrases include ${getKeywordSentence(18, 10)}.`,
    keywords: getPageKeywordSet('home', 30),
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        title: buildPageSeoTitle('SIM Details Check Pakistan, CNIC & Number Verification', 'home', 3, 92),
        description: `SIM owner details and number verification coverage in Pakistan with focus terms like ${getKeywordSentence(6, 10)}.`,
        url: SITE_URL,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: buildPageSeoTitle('SIM Details Check Pakistan, SIM Owner Details', 'home', 2, 88),
        description: `Practical SIM and CNIC verification coverage: ${getKeywordSentence(24, 8)}.`,
    },
};

export default async function Page() {
    const blogPosts = getHomepageBlogPosts(6);

    return <HomeContent blogPosts={blogPosts} />;
}
