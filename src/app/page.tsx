import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'SIM Details Check Pakistan | SIM Owner & CNIC Details',
    description:
        'Do a fast SIM details check in Pakistan. Search SIM owner details, CNIC-linked SIM records, and mobile number registration information online.',
};

export default async function Page() {
    const blogPosts = getHomepageBlogPosts(6);

    return <HomeContent blogPosts={blogPosts} />;
}
