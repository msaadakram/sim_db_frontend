'use client';

import { motion } from 'motion/react';
import { Calendar, User, Clock, Facebook, Twitter, Linkedin, ArrowRight, Share2, Bookmark, Heart, Eye, List, Copy, Check, ChevronDown, ChevronUp, MessageCircle, Code } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';

interface PostData {
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt?: string;
  body: any[];
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogPostDetailProps {
  post: PostData;
  relatedPosts: RelatedPost[];
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
  number: string;
}

// Helper: slugify heading text for anchor IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract TOC items from Portable Text body with numbering
function extractTOC(body: any[]): TOCItem[] {
  const items: TOCItem[] = [];
  if (!body) return items;

  let h2Count = 0;
  let h3Count = 0;

  body.forEach((block) => {
    if (block._type === 'block' && ['h2', 'h3'].includes(block.style)) {
      const text = block.children
        ?.map((child: any) => child.text)
        .join('') || '';
      if (text.trim()) {
        let number = '';
        if (block.style === 'h2') {
          h2Count++;
          h3Count = 0;
          number = `${h2Count}`;
        } else {
          h3Count++;
          number = `${h2Count || 1}.${h3Count}`;
        }
        items.push({
          id: slugify(text),
          text: text.trim(),
          level: block.style === 'h2' ? 2 : 3,
          number,
        });
      }
    }
  });

  return items;
}

// Reading Progress Bar Component
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-primary to-accent"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// Table of Contents Component with numbering and animated active indicator
function TableOfContents({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (items.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg overflow-hidden">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <List className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            Table of Contents
          </span>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {!isCollapsed && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5"
          aria-label="Table of contents"
        >
          <div className="space-y-0.5">
            {items.map((item) => (
              <div key={item.id} className="relative">
                {activeId === item.id && (
                  <motion.div
                    layoutId="toc-active"
                    className="absolute left-0 top-0 w-0.5 h-full bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left transition-all duration-200 py-2.5 text-sm leading-relaxed rounded-r-lg ${
                    item.level === 3 ? 'pl-9' : 'pl-4'
                  } ${
                    activeId === item.id
                      ? 'text-accent font-semibold bg-accent/5'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/20'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="text-accent/60 font-mono text-xs mr-2 min-w-[1.5rem] inline-block">{item.number}</span>
                  {item.text}
                </button>
              </div>
            ))}
          </div>
        </motion.nav>
      )}
    </div>
  );
}

// Format view count: 1000 -> 1k, 1100 -> 1.1k, 1000000 -> 1M, etc.
function formatViews(count: number): string {
  if (count >= 1_000_000) {
    const val = count / 1_000_000;
    return val % 1 === 0 ? `${val}M` : `${parseFloat(val.toFixed(1))}M`;
  }
  if (count >= 1_000) {
    const val = count / 1_000;
    return val % 1 === 0 ? `${val}k` : `${parseFloat(val.toFixed(1))}k`;
  }
  return count.toString();
}

// View Counter Hook
function useViewCount(slug: string) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackView = async () => {
      try {
        const res = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });
        const data = await res.json();
        setViews(data.views || 0);
      } catch {
        try {
          const res = await fetch(`/api/views?slug=${slug}`);
          const data = await res.json();
          setViews(data.views || 0);
        } catch {
          setViews(0);
        }
      } finally {
        setLoading(false);
      }
    };

    trackView();
  }, [slug]);

  return { views, loading };
}

// Code Block with copy feedback
function CodeBlockRenderer({ value }: { value: { code?: string; language?: string } }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value.code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-border/30">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e293b] text-gray-400 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5" />
          <span>{value.language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`transition-colors text-xs flex items-center gap-1.5 px-2 py-1 rounded ${
            copied ? 'text-green-400' : 'hover:text-white hover:bg-white/10'
          }`}
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5" /> Copied!</>
          ) : (
            <><Copy className="w-3.5 h-3.5" /> Copy</>
          )}
        </button>
      </div>
      <pre className="bg-[#0f172a] text-gray-200 p-5 overflow-x-auto text-sm leading-relaxed font-mono">
        <code>{value.code}</code>
      </pre>
    </div>
  );
}

// Portable Text rendering components
const createPortableTextComponents = (): PortableTextComponents => ({
  block: {
    h1: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text).join('') || '';
      const id = slugify(text);
      return (
        <h1 id={id} className="text-3xl sm:text-4xl md:text-5xl text-primary mt-12 mb-6 leading-tight scroll-mt-24" style={{ fontFamily: "'Playfair Display', serif" }}>
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text).join('') || '';
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="text-2xl sm:text-3xl md:text-4xl text-primary mt-14 mb-6 leading-tight scroll-mt-24 pb-3 border-b border-border/30"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map((c: any) => c.text).join('') || '';
      const id = slugify(text);
      return (
        <h3 id={id} className="text-xl sm:text-2xl md:text-3xl text-primary mt-10 mb-4 leading-tight scroll-mt-24" style={{ fontFamily: "'Playfair Display', serif" }}>
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl md:text-2xl text-primary mt-8 mb-3 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg sm:text-xl leading-relaxed mb-6 text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <div className="relative my-8">
        <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-accent to-primary rounded-full"></div>
        <blockquote className="text-xl sm:text-2xl text-muted-foreground leading-relaxed pl-6 italic">
          {children}
        </blockquote>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <div className="bg-gradient-to-br from-muted/50 via-white to-muted/30 rounded-2xl p-6 sm:p-8 my-8 border border-accent/10 shadow-md">
        <ul className="space-y-3">
          {children}
        </ul>
      </div>
    ),
    number: ({ children }) => (
      <div className="bg-gradient-to-br from-muted/50 via-white to-muted/30 rounded-2xl p-6 sm:p-8 my-8 border border-accent/10 shadow-md">
        <ol className="space-y-3">
          {children}
        </ol>
      </div>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4">
        <div className="relative flex-shrink-0 mt-1.5">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
          <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <span className="text-base sm:text-lg leading-relaxed">{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className="flex items-start gap-4">
        <div className="relative flex-shrink-0 mt-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-bold shadow-md">
            {(index ?? 0) + 1}
          </div>
        </div>
        <span className="text-base sm:text-lg leading-relaxed">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent border border-border/30">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-primary underline decoration-accent/30 hover:decoration-accent transition-colors duration-300"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.url || value?.asset?.url;
      if (!imageUrl) return null;

      return (
        <figure className="my-10">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={value?.alt || 'Blog image'}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {value?.alt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => <CodeBlockRenderer value={value} />,
  },
});

export function BlogPostDetail({ post, relatedPosts }: BlogPostDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const { views, loading: viewsLoading } = useViewCount(post.slug);

  const tocItems = extractTOC(post.body);
  const portableTextComponents = createPortableTextComponents();

  // Scroll-position-based active heading tracking (less flickering than IntersectionObserver)
  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const headingElements = tocItems
        .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
        .filter((h): h is { id: string; el: HTMLElement } => h.el !== null);

      let activeId = '';
      for (const { id, el } of headingElements) {
        if (el.getBoundingClientRect().top <= 120) {
          activeId = id;
        }
      }
      setActiveHeading(activeId || (headingElements[0]?.id ?? ''));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  // Share URL state (avoids hydration mismatch from typeof window check)
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);
  const shareTitle = encodeURIComponent(post.title);

  // Copy link handler
  const handleCopyLink = useCallback(() => {
    const url = window.location.href;
    try {
      navigator.clipboard.writeText(url);
    } catch {
      // Fallback for non-HTTPS or older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      <ReadingProgressBar />

      <article className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-muted/10 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              {/* Category & Metadata */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm sm:text-base font-medium flex items-center gap-2 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  {post.category}
                </motion.span>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-accent" />
                    <span>
                      {viewsLoading ? (
                        <span className="inline-block w-8 h-4 bg-muted/50 rounded animate-pulse"></span>
                      ) : (
                        `${formatViews(views)} views`
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-8 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h1>

              {/* Author & Actions */}
              <div className="flex items-center justify-between flex-wrap gap-6 pb-8 border-b border-border/50">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full blur-md opacity-50"></div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-lg">
                      <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-primary font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{post.author}</p>
                    <p className="text-sm text-muted-foreground">Content Writer & Expert</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label={isLiked ? 'Unlike' : 'Like'}
                    className={`w-11 h-11 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-muted hover:bg-accent hover:text-white'} transition-colors flex items-center justify-center shadow-md`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    className={`w-11 h-11 rounded-full ${isBookmarked ? 'bg-accent text-white' : 'bg-muted hover:bg-accent hover:text-white'} transition-colors flex items-center justify-center shadow-md`}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                    className={`w-11 h-11 rounded-full ${copied ? 'bg-green-500 text-white' : 'bg-muted hover:bg-accent hover:text-white'} transition-colors flex items-center justify-center shadow-md`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12 sm:mb-16 rounded-3xl overflow-hidden shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={600}
                  priority
                  className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          )}

          {/* Main Content Area with TOC Sidebar */}
          <div className="flex gap-8 lg:gap-12">
            {/* TOC Sidebar - Desktop Only */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <TableOfContents items={tocItems} activeId={activeHeading} />

                  {/* Article Stats Card */}
                  <div className="mt-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-5 border border-accent/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-primary">Article Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-primary">{viewsLoading ? '...' : formatViews(views)}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-primary">{post.readTime.split(' ')[0]}</p>
                        <p className="text-xs text-muted-foreground">Min Read</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Article Content */}
            <div className="flex-1 min-w-0 max-w-4xl">
              {/* Mobile TOC */}
              {tocItems.length > 0 && (
                <div className="lg:hidden mb-8">
                  <TableOfContents items={tocItems} activeId={activeHeading} />
                </div>
              )}

              {/* Article Body - Portable Text */}
              <motion.div
                ref={articleRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="prose prose-lg max-w-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <div className="text-foreground">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              </motion.div>

              {/* Social Share Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 my-12 border-y border-border/50 gap-4"
              >
                <span className="text-lg text-foreground font-medium">Share this article:</span>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors flex items-center justify-center shadow-lg"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#1A91DA] text-white transition-colors flex items-center justify-center shadow-lg"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#0A66C2] hover:bg-[#095196] text-white transition-colors flex items-center justify-center shadow-lg"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.button
                    onClick={handleCopyLink}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full ${copied ? 'bg-green-500' : 'bg-gradient-to-r from-accent to-primary'} text-white transition-colors flex items-center justify-center shadow-lg`}
                    aria-label="Copy link"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  </motion.button>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative mt-16 sm:mt-20 bg-gradient-to-br from-[#7DB9BC] via-accent to-[#5A9EA1] rounded-3xl sm:rounded-[2.5rem] p-10 sm:p-16 text-center text-white overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <MessageCircle className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Ready to Check SIM Information?
                  </h3>
                  <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    Start tracking and verifying SIM card details instantly with our advanced system
                  </p>
                  <motion.a
                    href="/#home"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-10 sm:px-12 py-5 sm:py-6 bg-white text-primary rounded-full hover:bg-white/95 transition-all duration-300 shadow-2xl text-base sm:text-lg font-semibold"
                  >
                    <span>Get Started Now</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>



              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-20 sm:mt-24"
                >
                  <div className="text-center mb-12">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl text-primary mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Continue Reading
                    </h3>
                    <p className="text-muted-foreground text-lg">Explore more related articles</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-8">
                    {relatedPosts.map((relatedPost, index) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                          whileHover={{ y: -10 }}
                          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/30 cursor-pointer"
                        >
                          <div className="relative h-48 overflow-hidden">
                            {relatedPost.image ? (
                              <Image
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                width={400}
                                height={192}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground text-sm">No image</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-4 left-4">
                              <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-primary rounded-full text-xs font-medium shadow-lg">
                                {relatedPost.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="text-lg sm:text-xl text-primary line-clamp-2 group-hover:text-accent transition-colors mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{relatedPost.readTime}</span>
                              <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
