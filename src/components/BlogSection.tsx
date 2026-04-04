'use client';

import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, Tag, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getHomepageBlogPosts } from '@/lib/blog';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

interface BlogSectionProps {
  initialPosts?: BlogPost[];
}

export function BlogSection({ initialPosts }: BlogSectionProps) {
  const fallbackPosts = getHomepageBlogPosts(6);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [posts] = useState<BlogPost[]>((initialPosts && initialPosts.length > 0 ? initialPosts : fallbackPosts) as BlogPost[]);
  const [loading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', 'Guide', 'Security', 'Technology', 'Business'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);
  const gridPosts = selectedCategory === 'All' ? filteredPosts.slice(1) : filteredPosts;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-muted/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-muted/20 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs sm:text-sm uppercase tracking-wider">Latest Insights</span>
          </motion.div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4 px-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover Our Blog
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore expert insights, comprehensive guides, and the latest trends in SIM tracking technology
          </p>
        </motion.div>

        {/* Category Filter with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base overflow-hidden group ${selectedCategory === category
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-accent/30'
                : 'bg-white text-foreground hover:shadow-lg border border-border/50'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategory !== category && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post - Enhanced */}
        {selectedCategory === 'All' && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 sm:mb-16"
          >
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-accent/10 group">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-72 sm:h-96 lg:h-full overflow-hidden">
                  <ImageWithFallback
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent lg:bg-gradient-to-r"></div>

                  {/* Featured Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute top-6 left-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary blur-md opacity-75"></div>
                      <span className="relative px-5 py-2.5 bg-gradient-to-r from-accent to-primary text-white rounded-full text-sm sm:text-base flex items-center gap-2 shadow-lg">
                        <TrendingUp className="w-4 h-4" />
                        Featured Article
                      </span>
                    </div>
                  </motion.div>

                  {/* Reading Stats */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{posts[0].readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{posts[0].date}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <motion.span
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm sm:text-base mb-6 w-fit"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Tag className="w-4 h-4" />
                    {posts[0].category}
                  </motion.span>

                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-6 leading-tight group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {posts[0].title}
                  </h3>

                  <p className="text-muted-foreground mb-8 leading-relaxed text-base sm:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {posts[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full blur-md opacity-50"></div>
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-lg">
                          <User className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-base sm:text-lg text-primary font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{posts[0].author}</p>
                        <p className="text-sm text-muted-foreground">Senior Tech Writer</p>
                      </div>
                    </div>

                    <Link href={`/blog/${posts[0].slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-sm sm:text-base group/btn"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid - Enhanced */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {gridPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -12 }}
                onHoverStart={() => setHoveredCard(post.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/30 h-full flex flex-col">
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  {/* Image Container */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Category Badge */}
                    <motion.div
                      className="absolute top-4 left-4 z-10"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-primary rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-lg font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        {post.category}
                      </span>
                    </motion.div>

                    {/* Reading Time Overlay */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl text-primary mb-4 leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300 flex-grow"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base line-clamp-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-md">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-primary font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{post.author}</span>
                      </div>

                      <motion.div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === post.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-primary to-accent opacity-20 animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Load More Button - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 sm:px-12 py-4 sm:py-5 bg-white text-primary border-2 border-primary rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:border-transparent transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl group overflow-hidden"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore More Articles
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}