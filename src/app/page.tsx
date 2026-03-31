import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';
import { SIM_OWNER_SEO_KEYWORDS, getKeywordSentence } from '@/lib/seo-keywords';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'SIM Details Check Pakistan | SIM Owner & CNIC Details',
    description:
        `Do a fast SIM details check in Pakistan. Search SIM owner details, CNIC-linked SIM records, and mobile number registration information online with terms like ${getKeywordSentence(18, 10)}.`,
    keywords: [...SIM_OWNER_SEO_KEYWORDS],
};

export default async function Page() {
    const blogPosts = getHomepageBlogPosts(6);

    return <HomeContent blogPosts={blogPosts} />;
}
