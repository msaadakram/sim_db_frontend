import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';

export const revalidate = 60;

export default async function Page() {
    const blogPosts = getHomepageBlogPosts(6);

    return <HomeContent blogPosts={blogPosts} />;
}
