import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPage as BlogPageContent } from '@/components/BlogPage';
import { Footer } from '@/components/Footer';
import { getAllBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';
import { getPageKeywordSet } from '@/lib/seo-keywords';
import { BreadcrumbJsonLd } from 'next-seo';
import { SEO_SITE_NAME } from '@/lib/next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();
const BLOG_DESCRIPTION = 'Read practical guides on SIM owner checks, CNIC verification, fraud prevention, and mobile identity security updates for Pakistan in 2026 and beyond.';

export const metadata: Metadata = {
    title: 'SIM Verification Blog Pakistan | CNIC & Number Guides',
    description: BLOG_DESCRIPTION,
    keywords: getPageKeywordSet('blog', 16),
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
        title: 'SIM Verification Blog Pakistan | CNIC & Number Guides',
        description: BLOG_DESCRIPTION,
        url: `${SITE_URL}/blog`,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'SIM Verification Blog Pakistan | SIM OWNER DETAIL',
        description: 'Explore practical SIM and CNIC verification guides, security walkthroughs, and mobile identity tips for Pakistan users.',
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
    const blogCollectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'SIM Verification Blog Pakistan',
        url: blogUrl,
        description: BLOG_DESCRIPTION,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts
                .filter((post) => Boolean(post.slug))
                .slice(0, 30)
                .map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${SITE_URL}/blog/${post.slug}`,
                name: post.title,
                })),
        },
    } as const;

    return (
        <div className="min-h-screen overflow-x-hidden">
            <script
                id="collection-jsonld-blog"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
            />
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
