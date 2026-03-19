import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPage as BlogPageContent } from '@/components/BlogPage';
import { Footer } from '@/components/Footer';
import { getAllBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Blog - Guides, Tips & SIM Tracking Insights',
    description: 'Explore expert articles, comprehensive guides, and the latest trends in SIM tracking technology, CNIC verification, and mobile number analysis.',
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
        title: 'Blog - SIM Finder',
        description: 'Explore expert articles, comprehensive guides, and the latest trends in SIM tracking technology.',
        url: `${SITE_URL}/blog`,
        siteName: 'SIM Finder',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Blog - SIM Finder',
        description: 'Explore expert articles, comprehensive guides, and the latest trends in SIM tracking technology.',
    },
};

function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

export default async function BlogListPage() {
    const posts = getAllBlogPosts();

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <BlogPageContent posts={posts} />
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
