import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPostDetail } from '@/components/BlogPostDetail';
import { BlogSection } from '@/components/BlogSection';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/site-url';
import {
    buildBlogSeoDescription,
    buildBlogSeoTitle,
    getKeywordSentence,
    getRelevantCsvKeywords,
} from '@/lib/seo-keywords';
import { ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { SEO_SITE_NAME, getSeoIdentity } from '@/lib/next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();
const SEO_IDENTITY = getSeoIdentity();

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const title =
        post.seoTitle ||
        buildBlogSeoTitle(post.title, {
            slug,
            excerpt: post.excerpt,
            category: post.category,
            keywordCount: 3,
            maxLength: 94,
        });
    const description =
        post.seoDescription ||
        buildBlogSeoDescription(post.excerpt, {
            slug,
            excerpt: post.excerpt,
            category: post.category,
        });
    const imageUrl = post.image || '';
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;
    const keywordPool = post.seoKeywords?.length
        ? post.seoKeywords
        : getRelevantCsvKeywords(`${post.title} ${post.excerpt} ${post.category} ${slug}`, 24);

    return {
        title,
        description,
        keywords: [post.title, post.category, ...keywordPool.slice(0, 30)],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description: `${description} Related search terms: ${getKeywordSentence(54, 8)}.`,
            url: canonicalUrl,
            siteName: SEO_SITE_NAME,
            images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : [],
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author || 'Anonymous'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const postData = {
        title: post.title,
        slug: post.slug,
        author: post.author || 'Anonymous',
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        image: post.image,
        excerpt: post.excerpt,
        body: post.body || [],
    };

    const relatedPosts = getRelatedBlogPosts(slug);
    const articleUrl = `${SITE_URL}/blog/${slug}`;

    return (
        <div className="min-h-screen overflow-x-hidden">
            <ArticleJsonLd
                scriptId={`article-jsonld-${slug}`}
                type="Article"
                headline={post.title}
                description={postData.excerpt}
                url={articleUrl}
                image={postData.image ? [postData.image] : undefined}
                datePublished={post.publishedAt}
                author={postData.author}
                publisher={{
                    name: SEO_IDENTITY.siteName,
                    url: SEO_IDENTITY.siteUrl,
                    logo: SEO_IDENTITY.logoUrl,
                }}
                mainEntityOfPage={{
                    '@id': articleUrl,
                }}
                isAccessibleForFree={true}
            />
            <BreadcrumbJsonLd
                scriptId={`breadcrumb-jsonld-${slug}`}
                items={[
                    { name: 'Home', item: SITE_URL },
                    { name: 'Blog', item: `${SITE_URL}/blog` },
                    { name: post.title, item: articleUrl },
                ]}
            />
            <Header />
            <main className="w-full">
                <div className="pt-16 sm:pt-20">
                    <Suspense fallback={<SectionLoader />}>
                        <BlogPostDetail post={postData} relatedPosts={relatedPosts} />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                        <BlogSection />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
