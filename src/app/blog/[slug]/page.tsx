import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPostDetail } from '@/components/BlogPostDetail';
import { BlogSection } from '@/components/BlogSection';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/site-url';

export const revalidate = 60;

const SITE_URL = getSiteUrl();

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

function estimateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

function extractBodyText(body: any[]): string {
    if (!body) return '';
    return body
        .map((block: any) =>
            block._type === 'block'
                ? block.children?.map((child: any) => child.text).join('')
                : ''
        )
        .join(' ');
}

async function getPost(slug: string) {
    if (!isSanityConfigured) {
        return null;
    }

    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        excerpt,
        seoTitle,
        seoDescription,
        "categories": categories[]->title,
        "author": author->name,
        body
    }`;

    return await client.fetch(query, { slug });
}

async function getRelatedPosts(slug: string) {
    if (!isSanityConfigured) {
        return [];
    }

    const query = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        "categories": categories[]->title,
        "author": author->name,
        body
    }`;

    const data = await client.fetch(query, { slug });

    return data.map((post: any) => {
        const bodyText = extractBodyText(post.body);
        return {
            id: post._id,
            title: post.title,
            slug: post.slug,
            image: post.mainImage ? urlFor(post.mainImage).width(800).url() : '',
            category: post.categories?.[0] || 'Uncategorized',
            readTime: estimateReadingTime(bodyText),
        };
    });
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const bodyText = extractBodyText(post.body);
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || bodyText.slice(0, 155);
    const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : '';
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
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
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const bodyText = extractBodyText(post.body);

    const postData = {
        title: post.title,
        slug: post.slug,
        author: post.author || 'Anonymous',
        date: new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        readTime: estimateReadingTime(bodyText),
        category: post.categories?.[0] || 'Uncategorized',
        image: post.mainImage ? urlFor(post.mainImage).width(1200).url() : '',
        excerpt: post.excerpt || bodyText.slice(0, 155),
        body: post.body || [],
    };

    const relatedPosts = await getRelatedPosts(slug);

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: postData.excerpt,
        image: postData.image,
        datePublished: post.publishedAt,
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
