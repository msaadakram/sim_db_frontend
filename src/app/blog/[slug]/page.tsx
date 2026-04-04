import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPostDetail } from '@/components/BlogPostDetail';
import { BlogSection } from '@/components/BlogSection';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/site-url';
import { SIM_OWNER_SEO_KEYWORDS, getKeywordSentence } from '@/lib/seo-keywords';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

function countWordsFromBody(body: any[]): number {
    return body.reduce((total, block) => {
        if (block?._type !== 'block' || !Array.isArray(block.children)) {
            return total;
        }

        const text = block.children
            .map((child: any) => (typeof child?.text === 'string' ? child.text : ''))
            .join(' ')
            .trim();

        if (!text) {
            return total;
        }

        return total + text.split(/\s+/).filter(Boolean).length;
    }, 0);
}

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

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const imageUrl = post.image || '';
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;

    return {
        title,
        description,
        keywords: [post.title, post.category, ...SIM_OWNER_SEO_KEYWORDS.slice(0, 30)],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description: `${description} Keywords: ${getKeywordSentence(54, 8)}.`,
            url: canonicalUrl,
            siteName: 'SIM Finder',
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
    const wordCount = countWordsFromBody(postData.body);

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: postData.excerpt,
        image: postData.image,
        datePublished: post.publishedAt,
        wordCount,
        articleSection: postData.category,
        author: {
            '@type': 'Person',
            name: postData.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'SIM Finder',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${slug}`,
        },
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
