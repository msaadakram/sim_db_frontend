import { HomeContent } from '@/components/HomeContent';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

function estimateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

async function getBlogPosts() {
    if (!isSanityConfigured) {
        return [];
    }

    try {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...6] {
            _id,
            title,
            "slug": slug.current,
            mainImage,
            publishedAt,
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
                excerpt: bodyText.slice(0, 150) + (bodyText.length > 150 ? '...' : ''),
                author: post.author || 'Anonymous',
                date: post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                    : 'Recently',
                readTime: estimateReadingTime(bodyText),
                category: post.categories?.[0] || 'Uncategorized',
                image: post.mainImage ? urlFor(post.mainImage).width(800).url() : '',
            };
        });
    } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        return [];
    }
}

export default async function Page() {
    const blogPosts = await getBlogPosts();

    return <HomeContent blogPosts={blogPosts} />;
}
