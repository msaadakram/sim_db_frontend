import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPage as BlogPageContent } from '@/components/BlogPage';
import { Footer } from '@/components/Footer';
import { getAllBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';
import {
    buildPageSeoTitle,
    getKeywordSentence,
    getPageKeywordSet,
} from '@/lib/seo-keywords';
import { BreadcrumbJsonLd } from 'next-seo';
import { SEO_SITE_NAME } from '@/lib/next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
    title: buildPageSeoTitle('Blog Guides for SIM Check, CNIC Verification & Number Details', 'blog', 3, 94),
    description: `Explore expert articles, practical walkthroughs, and updates on SIM tracking, CNIC verification, and number detail checks, including ${getKeywordSentence(28, 10)}.`,
    keywords: getPageKeywordSet('blog', 36),
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
        title: buildPageSeoTitle('SIM Blog: Tracking, Ownership & CNIC Guides', 'blog', 3, 94),
        description: `Explore SIM tracking and verification guides with high-intent terms like ${getKeywordSentence(38, 8)}.`,
        url: `${SITE_URL}/blog`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: buildPageSeoTitle('SIM Blog: Verification & Number Check Insights', 'blog', 2, 88),
        description: `SIM tracking guides and insights covering ${getKeywordSentence(46, 8)}.`,
    },
    robots: {
        index: true,
        follow: true,
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
                    <GlobalSearchCard className="pt-5 sm:pt-6 pb-5 sm:pb-7" />
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
