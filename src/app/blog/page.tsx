import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogPage as BlogPageContent } from '@/components/BlogPage';
import { Footer } from '@/components/Footer';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
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

function estimateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

async function getPosts() {
    if (!isSanityConfigured) {
        return [];
    }

    const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        excerpt,
        "categories": categories[]->title,
        "author": author->name,
        body
    }`;

    const data = await client.fetch(query);

    return data.map((post: any) => {
        const bodyText = post.body?.map((block: any) =>
            block._type === 'block' ? block.children?.map((child: any) => child.text).join('') : ''
        ).join(' ') || '';

        return {
            id: post._id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || (bodyText.slice(0, 150) + (bodyText.length > 150 ? '...' : '')),
            author: post.author || 'Anonymous',
            date: new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            readTime: estimateReadingTime(bodyText),
            category: post.categories?.[0] || 'Uncategorized',
            image: post.mainImage ? urlFor(post.mainImage).width(800).url() : '',
            featured: false
        };
    });
}

export default async function BlogListPage() {
    const posts = await getPosts();

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
