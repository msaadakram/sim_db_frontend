'use client';

import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, Tag, Search, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewsletterSubscribeSection } from './NewsletterSubscribeSection';
import { getKeywordSentence } from '@/lib/seo-keywords';
interface BlogPost {
  id: string | number;
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

interface BlogPageProps {
  posts: BlogPost[];
}

export function BlogPage({ posts }: BlogPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);


  const categories = ['All', 'Guide', 'Security', 'Technology', 'Business'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-muted/30 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs sm:text-sm uppercase tracking-wider">Our Blog</span>
            </motion.div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-primary mb-4 sm:mb-6 leading-[1.05] px-4 font-black tracking-tight drop-shadow-sm max-w-5xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SIM info insights &{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                SIM owner detail knowledge hub
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Explore expert articles, comprehensive guides, and the latest trends in SIM tracking technology.
              Search intent coverage: {getKeywordSentence(62, 12)}.
            </p>
          </motion.div>

          {/* Search Bar - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-300 text-sm sm:text-base bg-white shadow-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </motion.div>

          {/* Category Filter - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium ${selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-white text-foreground hover:shadow-md border border-border/50 hover:border-accent/30'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm sm:text-base text-muted-foreground"
          >
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          </motion.p>
        </div>
      </section>

      {/* Blog Grid - Mobile Optimized */}
      <section ref={sectionRef} className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-20"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-primary mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                No articles found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-xl transition-all duration-300 text-sm sm:text-base font-medium"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {filteredPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="w-full max-w-[430px]">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredCard(post.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group cursor-pointer h-full w-full"
                  >
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/30 h-full flex flex-col">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      {/* Image Container - Mobile Optimized */}
                      <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Category Badge */}
                        <motion.div
                          className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-md text-primary rounded-full text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-lg font-medium">
                            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {post.category}
                          </span>
                        </motion.div>

                        {/* Reading Time Overlay */}
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-1.5 sm:gap-2 bg-primary/90 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Content - Mobile Optimized */}
                      <div className="p-4 sm:p-6 lg:p-7 flex-1 flex flex-col items-center text-center">
                        {/* Date */}
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                          <span>{post.date}</span>
                        </div>

                        {/* Title - Mobile Optimized */}
                        <h3
                          className="text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4 leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300 flex-grow"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt - Mobile Optimized */}
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {post.excerpt}
                        </p>

                        {/* Footer - Mobile Optimized */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 sm:pt-6 border-t border-border/50 mt-auto w-full">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-md">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm md:text-base text-primary font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{post.author}</span>
                          </div>

                          <motion.div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 45 }}
                          >
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Animated Border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === post.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-accent via-primary to-accent opacity-20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button - Mobile Optimized */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-8 sm:mt-12 md:mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-3 sm:py-4 md:py-5 bg-white text-primary border-2 border-primary rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:border-transparent transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl group overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View More Articles
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA - Mobile Optimized */}
      <NewsletterSubscribeSection />
    </div>
  );
}
