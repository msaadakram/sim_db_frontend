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

type BlogSourcePost = (typeof blogPosts)[number];

const MIN_BLOG_WORD_COUNT = 1500;
const WORDS_PER_MINUTE = 200;

type BlockStyle = 'normal' | 'h1' | 'h2' | 'h3' | 'h4';
type ListType = 'bullet' | 'number';

interface BlockOptions {
  style?: BlockStyle;
  text: string;
  listItem?: ListType;
  level?: number;
}

interface DerivedPost {
  source: BlogSourcePost;
  slug: string;
  body: any[];
  wordCount: number;
  readTime: string;
  publishedAt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

function toIsoDate(dateText: string): string {
  const parsed = new Date(dateText);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }
  return new Date().toISOString();
}

function countWords(text: string): number {
  if (!text.trim()) {
    return 0;
  }
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getBlockText(block: any): string {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) {
    return '';
  }

  return block.children
    .map((child: any) => (typeof child?.text === 'string' ? child.text : ''))
    .join(' ')
    .trim();
}

function countPortableTextWords(body: any[]): number {
  return body.reduce((total, block) => total + countWords(getBlockText(block)), 0);
}

function estimateReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function createBlockBuilder() {
  let index = 0;

  return (body: any[], options: BlockOptions) => {
    body.push({
      _type: 'block',
      _key: `b-${index++}`,
      style: options.style ?? 'normal',
      markDefs: [],
      ...(options.listItem
        ? {
            listItem: options.listItem,
            level: options.level ?? 1,
          }
        : {}),
      children: [{ _type: 'span', text: options.text, marks: [] }],
    });
  };
}

function injectTemplateVars(template: string, post: BlogSourcePost): string {
  return template
    .replace(/\{TITLE\}/g, post.title)
    .replace(/\{CATEGORY\}/g, post.category.toLowerCase())
    .replace(/\{AUTHOR\}/g, post.author);
}

function appendSeoGuideSections(body: any[], addBlock: (body: any[], options: BlockOptions) => void, post: BlogSourcePost): void {
  addBlock(body, { style: 'h2', text: 'Search Intent and Audience Mapping' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'For {TITLE}, high-performance SEO starts with intent segmentation instead of random keyword stuffing. Build your content around what users want to accomplish in real life, not only what they type in search bars. In most cases you need three intent clusters: informational users who want clarity, comparison users who evaluate tools or methods, and action users who are ready to execute a process immediately. When those clusters are addressed in clear sections, rankings improve because search engines can map your article to multiple query variations while users stay engaged longer. Keep paragraphs focused, avoid broad claims without explanation, and align each section with one practical outcome. This improves dwell time, reduces pogo-sticking, and signals quality. For local relevance, include country context, legal framing, and realistic usage scenarios so your article is not generic and can outperform thin, globally recycled content.',
      post
    ),
  });
  addBlock(body, { style: 'h3', text: 'Intent clusters to cover in every update cycle' });
  [
    'Informational intent: explain concepts, terminology, and legal boundaries with plain language.',
    'Comparative intent: show decision criteria and trade-offs users can actually apply.',
    'Action intent: give step-by-step workflows with checklists and expected outcomes.',
    'Risk intent: answer safety, compliance, privacy, and misuse concerns proactively.',
    'Maintenance intent: explain how users should re-validate decisions over time.',
  ].forEach((point) => addBlock(body, { text: point, listItem: 'bullet' }));

  addBlock(body, { style: 'h2', text: 'On-Page SEO Structure That Works in 2026' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'A strong on-page framework for {TITLE} should follow one clear hierarchy: a compelling introduction, topic-focused H2 sections, supporting H3 breakdowns, concise bullets for scannability, and a practical conclusion with next actions. This structure helps readers navigate quickly and also improves machine understanding of your page. Keep your primary topic in the title, first paragraph, and at least one early heading without forcing unnatural repetition. Use semantically related terms throughout examples, checklists, and FAQs to expand relevance naturally. Add concise summaries after dense sections so mobile readers can retain key points. Every heading should promise value and every paragraph should fulfill it. If a block does not help the reader make a decision, remove or rewrite it. SEO today rewards useful depth, not inflated text volume without utility.',
      post
    ),
  });
  addBlock(body, { style: 'h3', text: 'Recommended heading flow for this topic' });
  [
    'Problem context and why the topic matters now',
    'How the process works in practical terms',
    'Actionable checklist with legal and quality safeguards',
    'Common mistakes and how to prevent them',
    'FAQ section targeting long-tail question queries',
    'Conclusion with immediate next steps',
  ].forEach((point) => addBlock(body, { text: point, listItem: 'bullet' }));

  addBlock(body, { style: 'h2', text: 'Content Quality, E-E-A-T, and Trust Signals' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'Experience, expertise, authoritativeness, and trust are not abstract buzzwords; they are editorial requirements. For {TITLE}, demonstrate experience by using realistic local scenarios and decision pathways. Demonstrate expertise by explaining why a method works, where it fails, and how to validate results. Build authority by maintaining internal consistency across your related guides, and reinforce trust by avoiding exaggerated promises such as guaranteed outcomes in every case. Where legal or privacy boundaries apply, state them clearly and repeat them in relevant sections, not only in footnotes. Attribute practical recommendations to observable criteria like delivery timing, stability behavior, verification consistency, or compliance checkpoints. This approach helps your article remain useful when algorithms change because the foundation is user value and operational clarity, not ranking tricks. Over time, trust-focused writing compounds better than short-term optimization hacks.',
      post
    ),
  });
  addBlock(body, { style: 'h3', text: 'Trust upgrades you should keep in the article' });
  [
    'Transparent limitations and edge cases',
    'Privacy-safe usage guidance for sensitive workflows',
    'Local legal context explained in plain language',
    'Actionable examples readers can replicate',
    'Clear distinction between verified fact and recommendation',
  ].forEach((point) => addBlock(body, { text: point, listItem: 'bullet' }));

  addBlock(body, { style: 'h2', text: 'Technical SEO and UX Enhancements for Better Results' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'Even the best written article underperforms if technical and user experience basics are weak. For {TITLE}, prioritize clean URLs, canonical consistency, descriptive meta tags, fast-loading images, and meaningful internal links to related guides. Keep visual hierarchy clear so readers can jump to the section they need, especially on mobile where most traffic arrives. A working table of contents with stable anchor links improves usability and helps search engines understand document structure. Also ensure the page has valid structured data for articles, with accurate publish metadata and author information. Compress images, avoid oversized scripts near above-the-fold content, and maintain predictable typography spacing for long reads. When users can scan quickly and find answers without friction, behavioral metrics improve naturally. These UX gains are not separate from SEO—they are core ranking enablers in modern search systems.',
      post
    ),
  });

  addBlock(body, { style: 'h2', text: 'Measurement, Refresh Cadence, and Continuous Improvement' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'Treat every long-form article as a living asset. After publishing {TITLE}, track impressions, click-through rate, average engagement time, and section-level drop-off patterns. If traffic is strong but clicks are weak, refine title and meta description for intent match. If clicks are high but engagement is low, improve early section clarity and add better transitional cues between headings. Refresh the article on a predictable cadence by updating legal references, adding new practical examples, and tightening outdated recommendations. Keep an update log so readers and search engines can see that the guide is actively maintained. Small but regular improvements typically outperform one-time rewrites because they preserve ranking history while increasing utility. A disciplined editorial loop—measure, diagnose, improve, re-test—builds durable performance and keeps your content competitive.',
      post
    ),
  });

  addBlock(body, { style: 'h2', text: 'Frequently Asked Questions' });
  const faqItems: Array<{ question: string; answer: string }> = [
    {
      question: 'How often should this guide be updated for SEO stability?',
      answer:
        'A practical cycle is every 6 to 8 weeks for fast-moving topics and quarterly for stable topics. The goal is to keep examples, legal notes, and operational steps accurate. Frequent micro-updates are better than rare full rewrites because they preserve existing rankings while improving relevance incrementally.',
    },
    {
      question: 'Is word count alone enough to rank on competitive queries?',
      answer:
        'No. Word count supports depth, but rankings come from intent fit, clarity, trust, structure, and user outcomes. A 1500-word article that solves real problems with clear headings and reliable guidance will outperform a longer article filled with repetition.',
    },
    {
      question: 'What is the safest way to include local compliance guidance?',
      answer:
        'Use plain-language explanations, avoid legal overclaims, and frame guidance as operational best practice rather than legal advice. Include clear boundaries on acceptable use and encourage users to verify with official authorities when needed.',
    },
    {
      question: 'How do I improve engagement on long articles without reducing depth?',
      answer:
        'Break dense sections into readable chunks, use descriptive subheadings, maintain a functioning table of contents, and add checklist-style bullets where possible. This keeps the article skimmable while preserving expert-level detail for readers who need depth.',
    },
  ];

  faqItems.forEach((item) => {
    addBlock(body, { style: 'h3', text: item.question });
    addBlock(body, { style: 'normal', text: item.answer });
  });

  addBlock(body, { style: 'h2', text: 'Conclusion and Next Steps' });
  addBlock(body, {
    style: 'normal',
    text: injectTemplateVars(
      'The strongest version of {TITLE} is practical, transparent, and consistently updated. Use this guide as an execution framework: map intent, structure sections clearly, prioritize user outcomes, and refine content using real performance signals. When SEO and usability are treated as one system, your article becomes easier to discover and more valuable to readers after they land. Maintain this standard across your full {CATEGORY} content library to build compounding authority over time.',
      post
    ),
  });
}

function ensureMinimumWordCount(body: any[], addBlock: (body: any[], options: BlockOptions) => void, post: BlogSourcePost): void {
  let currentWordCount = countPortableTextWords(body);
  if (currentWordCount >= MIN_BLOG_WORD_COUNT) {
    return;
  }

  addBlock(body, { style: 'h2', text: 'Extended Practical Guidance and Implementation Notes' });

  const expansionTemplates = [
    'When deploying this framework in production, define a repeatable checklist for your team and track execution quality week by week. For {TITLE}, this means documenting which queries the article should satisfy, which sections answer each query cluster, and what proof points validate your recommendations. This discipline reduces editorial drift and keeps content useful long after publication.',
    'Create a lightweight review routine focused on clarity. Ask whether each section can be understood by a new reader in under two minutes, whether the heading accurately matches the paragraph beneath it, and whether the call-to-action at the end of the section is concrete. This process improves user confidence and strengthens behavioral signals that indirectly support SEO performance.',
    'In high-change environments, stale details are the fastest path to ranking decline. Build a change log for {TITLE} and update timestamps whenever you revise legal references, platform capabilities, or recommended workflows. Search engines increasingly reward maintained resources, and readers are more likely to trust an article that reflects current realities rather than archived assumptions.',
    'For teams publishing multiple guides, align vocabulary and formatting standards across the entire library. Consistent heading patterns, terminology, and troubleshooting language make internal linking stronger and improve topical authority. This is especially important in {CATEGORY} topics where users often read several connected pages before making a decision.',
    'Operationally, success comes from feedback loops. Capture recurring questions from support channels, comments, and customer interviews, then fold those questions into H3 sections and FAQ entries. This turns real-world friction into content improvements and helps your page capture additional long-tail search demand without sacrificing quality.',
  ];

  let index = 0;
  while (currentWordCount < MIN_BLOG_WORD_COUNT && index < 12) {
    if (index % 2 === 0) {
      addBlock(body, { style: 'h3', text: `Implementation note ${Math.floor(index / 2) + 1}` });
    }

    const paragraph = injectTemplateVars(expansionTemplates[index % expansionTemplates.length], post);
    addBlock(body, { style: 'normal', text: paragraph });
    currentWordCount = countPortableTextWords(body);
    index += 1;
  }
}

function convertContentToPortableText(post: BlogSourcePost): any[] {
  const body: any[] = [];
  const addBlock = createBlockBuilder();
  const content = post.content;

  if (!content) {
    addBlock(body, {
      style: 'normal',
      text: `${post.excerpt} This guide was generated with a structured SEO framework to ensure clarity, depth, and practical value for readers.`,
    });
    appendSeoGuideSections(body, addBlock, post);
    ensureMinimumWordCount(body, addBlock, post);
    return body;
  }

  addBlock(body, { style: 'normal', text: content.introduction });

  if (content.sections.length > 0) {
    addBlock(body, { style: 'h2', text: 'Quick Overview and Key Outcomes' });
    addBlock(body, {
      style: 'normal',
      text: injectTemplateVars(
        'This section gives you a fast, practical map of {TITLE}. Instead of browsing disconnected tips, use this guide as a structured workflow: understand the context, apply the recommended checks, avoid common mistakes, and review outcomes with measurable criteria. Following a structured sequence improves both execution accuracy and long-term reliability.',
        post
      ),
    });
  }

  for (const section of content.sections) {
    addBlock(body, { style: 'h2', text: section.title });
    addBlock(body, { style: 'normal', text: section.content });

    if (section.points?.length) {
      addBlock(body, {
        style: 'h3',
        text: `${section.title}: Action Checklist`,
      });

      section.points.forEach((point) => addBlock(body, { text: point, listItem: 'bullet' }));

      addBlock(body, {
        style: 'normal',
        text: injectTemplateVars(
          'Apply this checklist step by step and validate each item with real observations, not assumptions. For {TITLE}, documented execution is consistently more reliable than ad-hoc decisions based on one test or one anecdote.',
          post
        ),
      });
    }
  }

  appendSeoGuideSections(body, addBlock, post);
  ensureMinimumWordCount(body, addBlock, post);

  return body;
}

function buildDerivedPost(post: BlogSourcePost): DerivedPost {
  const slug = post.slug || slugify(post.title);
  const body = convertContentToPortableText(post);
  const wordCount = countPortableTextWords(body);

  return {
    source: post,
    slug,
    body,
    wordCount,
    readTime: estimateReadTime(wordCount),
    publishedAt: toIsoDate(post.date),
  };
}

const derivedPosts: DerivedPost[] = blogPosts.map(buildDerivedPost);

function toListItem(post: DerivedPost): BlogListItem {
  return {
    id: String(post.source.id),
    slug: post.slug,
    title: post.source.title,
    excerpt: post.source.excerpt,
    author: post.source.author,
    date: post.source.date,
    readTime: post.readTime,
    category: post.source.category,
    image: post.source.image,
    featured: post.source.featured,
  };
}

function toDetailItem(post: DerivedPost): BlogDetailItem {
  const listItem = toListItem(post);
  return {
    ...listItem,
    body: post.body,
    seoTitle: `${post.source.title} | SIM Finder`,
    seoDescription: post.source.excerpt,
    publishedAt: post.publishedAt,
  };
}

export function getAllBlogPosts(): BlogListItem[] {
  return derivedPosts.map(toListItem);
}

export function getHomepageBlogPosts(limit = 6): BlogListItem[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogDetailItem | null {
  const post = derivedPosts.find((item) => item.slug === slug);
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
  return derivedPosts.map((post) => {
    return {
      slug: post.slug,
      publishedAt: post.publishedAt,
    };
  });
}
