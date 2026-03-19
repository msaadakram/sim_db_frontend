import { blogPosts } from '@/data/blogData';

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface BlogDetailItem extends BlogListItem {
  body: any[];
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function toIsoDate(dateText: string): string {
  const parsed = new Date(dateText);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }
  return new Date().toISOString();
}

function convertContentToPortableText(
  content?: {
    introduction: string;
    sections: { title: string; content: string; points?: string[] }[];
  }
): any[] {
  if (!content) {
    return [];
  }

  const body: any[] = [];

  body.push({
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', text: content.introduction, marks: [] }],
  });

  for (const section of content.sections) {
    body.push({
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [{ _type: 'span', text: section.title, marks: [] }],
    });

    body.push({
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', text: section.content, marks: [] }],
    });

    if (section.points?.length) {
      for (const point of section.points) {
        body.push({
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', text: point, marks: [] }],
        });
      }
    }
  }

  return body;
}

function toListItem(post: (typeof blogPosts)[number]): BlogListItem {
  const slug = post.slug || slugify(post.title);
  return {
    id: String(post.id),
    slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    image: post.image,
    featured: post.featured,
  };
}

function toDetailItem(post: (typeof blogPosts)[number]): BlogDetailItem {
  const listItem = toListItem(post);
  return {
    ...listItem,
    body: convertContentToPortableText(post.content),
    seoTitle: `${post.title} | SIM Finder`,
    seoDescription: post.excerpt,
    publishedAt: toIsoDate(post.date),
  };
}

export function getAllBlogPosts(): BlogListItem[] {
  return blogPosts.map(toListItem);
}

export function getHomepageBlogPosts(limit = 6): BlogListItem[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogDetailItem | null {
  const post = blogPosts.find((item) => (item.slug || slugify(item.title)) === slug);
  if (!post) {
    return null;
  }
  return toDetailItem(post);
}

export function getRelatedBlogPosts(slug: string, limit = 3): Array<{
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  readTime: string;
}> {
  return getAllBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit)
    .map(({ id, title, slug: relatedSlug, image, category, readTime }) => ({
      id,
      title,
      slug: relatedSlug,
      image,
      category,
      readTime,
    }));
}

export function getSitemapBlogEntries() {
  return blogPosts.map((post) => {
    const slug = post.slug || slugify(post.title);
    return {
      slug,
      publishedAt: toIsoDate(post.date),
    };
  });
}
