import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Official PTA SIM Verification Guide Pakistan | 668 Method & Legal SIM Checks',
  description:
    'Learn official PTA methods to verify your own SIMs, understand the 668 guide, and follow legal telecom and fraud-reporting steps in Pakistan.',
};

export default async function Page() {
  const blogPosts = getHomepageBlogPosts(6);

  return <HomeContent blogPosts={blogPosts} />;
}
