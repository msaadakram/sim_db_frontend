import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPage as BlogPageContent } from '@/components/BlogPage';
import { Footer } from '@/components/Footer';
import { getAllBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';
import { SIM_OWNER_SEO_KEYWORDS, getKeywordSentence } from '@/lib/seo-keywords';
import { BreadcrumbJsonLd } from 'next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: 'Blog - Guides, Tips & SIM Tracking Insights',
    description: `Explore expert articles, guides, and trends in SIM tracking, CNIC verification, and mobile number analysis, including ${getKeywordSentence(28, 10)}.`,
    keywords: [...SIM_OWNER_SEO_KEYWORDS],
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
        title: 'Blog - SIM Finder',
        description: `Explore expert SIM tracking and verification guides with focus terms like ${getKeywordSentence(38, 8)}.`,
        url: `${SITE_URL}/blog`,
        siteName: 'SIM Finder',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Blog - SIM Finder',
        description: `SIM tracking guides and insights covering ${getKeywordSentence(46, 8)}.`,
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
    const blogUrl = `${SITE_URL}/blog`;

    return (
        <div className="min-h-screen overflow-x-hidden">
            <BreadcrumbJsonLd
                scriptId="breadcrumb-jsonld-blog"
                items={[
                    { name: 'Home', item: SITE_URL },
                    { name: 'Blog', item: blogUrl },
                ]}
            />
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
