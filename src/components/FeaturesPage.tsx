'use client';

import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Shield, 
  Bell, 
  Smartphone, 
  Lock, 
  Users, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Globe,
  Database,
  UserCheck,
  FileText,
  TrendingUp,
  Activity,
  Eye,
  Wifi
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function FeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Features', icon: <Star className="w-4 h-4" /> },
    { id: 'search', name: 'Search', icon: <Search className="w-4 h-4" /> },
    { id: 'tracking', name: 'Tracking', icon: <MapPin className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'data', name: 'Data', icon: <Database className="w-4 h-4" /> }
  ];

  const features = [
    {
      category: 'search',
      icon: <Search className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Advanced Mobile Search',
      description: 'Search any mobile number instantly with our powerful algorithm. Get accurate results in seconds with comprehensive details.',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Instant results', 'High accuracy', 'Multiple databases']
    },
    {
      category: 'search',
      icon: <UserCheck className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'CNIC Lookup',
      description: 'Find detailed information using CNIC numbers. Access verified data from official sources with complete privacy protection.',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Official data', 'Privacy protected', 'Verified sources']
    },
    {
      category: 'tracking',
      icon: <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Live Location Tracking',
      description: 'Track mobile devices in real-time with precise GPS coordinates. Monitor location history and movement patterns.',
      color: 'from-red-500 to-orange-500',
      benefits: ['Real-time updates', 'GPS precision', 'Location history']
    },
    {
      category: 'tracking',
      icon: <Activity className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Activity Monitoring',
      description: 'Monitor device activity patterns including call logs, SMS history, and app usage with detailed analytics.',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Call logs', 'SMS tracking', 'App monitoring']
    },
    {
      category: 'security',
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Data Encryption',
      description: 'Military-grade encryption protects all your searches and data. Your privacy is our top priority.',
      color: 'from-indigo-500 to-blue-500',
      benefits: ['256-bit encryption', 'Secure storage', 'Zero logs']
    },
    {
      category: 'security',
      icon: <Lock className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication ensures only authorized access. Biometric login support for enhanced security.',
      color: 'from-yellow-500 to-orange-500',
      benefits: ['2FA enabled', 'Biometric login', 'Session control']
    },
    {
      category: 'data',
      icon: <Database className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Comprehensive Database',
      description: 'Access millions of records from multiple verified sources. Updated in real-time for maximum accuracy.',
      color: 'from-teal-500 to-cyan-500',
      benefits: ['Million+ records', 'Real-time updates', 'Multiple sources']
    },
    {
      category: 'data',
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Analytics & Reports',
      description: 'Get detailed analytics and comprehensive reports. Export data in multiple formats for further analysis.',
      color: 'from-pink-500 to-rose-500',
      benefits: ['Visual analytics', 'Export options', 'Custom reports']
    },
    {
      category: 'search',
      icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Global Coverage',
      description: 'Search numbers from multiple countries worldwide. Support for international formats and carriers.',
      color: 'from-violet-500 to-purple-500',
      benefits: ['200+ countries', 'All carriers', 'Int\'l format']
    },
    {
      category: 'tracking',
      icon: <Bell className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Smart Notifications',
      description: 'Get instant alerts for location changes, suspicious activities, and important updates via push notifications.',
      color: 'from-amber-500 to-yellow-500',
      benefits: ['Instant alerts', 'Custom triggers', 'Push notifications']
    },
    {
      category: 'data',
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Detailed Records',
      description: 'Access comprehensive records including carrier info, registration details, and usage history.',
      color: 'from-lime-500 to-green-500',
      benefits: ['Full history', 'Carrier info', 'Registration data']
    },
    {
      category: 'security',
      icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Privacy Controls',
      description: 'Complete control over your data visibility. Anonymous search mode and automatic data deletion options.',
      color: 'from-rose-500 to-red-500',
      benefits: ['Anonymous mode', 'Auto-delete', 'Privacy first']
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  const stats = [
    { value: '10M+', label: 'Searches Daily', icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { value: '99.9%', label: 'Accuracy Rate', icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { value: '<1s', label: 'Response Time', icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { value: '24/7', label: 'Support Available', icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-muted/30 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-4 sm:mb-6"
            >
              <Star className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs sm:text-sm uppercase tracking-wider">Premium Features</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary mb-4 sm:mb-6 leading-tight px-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Complete Control
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Discover advanced tools and capabilities designed to give you comprehensive insights and security
            </motion.p>
          </div>

          {/* Stats Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-accent/30"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto shadow-lg`}>
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter - Mobile Optimized */}
      <section className="relative py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-accent/30'
                    : 'bg-white text-foreground hover:shadow-md border border-border/50 hover:border-accent/30'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Mobile Optimized */}
      <section ref={sectionRef} className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/30 relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl lg:text-2xl text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 sm:space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile Optimized */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                SIM Finder?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference with our premium features and dedicated support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Lightning Fast',
                description: 'Get results in under 1 second with our optimized search engine',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: '100% Secure',
                description: 'Military-grade encryption protects your data and searches',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Trusted by Millions',
                description: 'Join over 10 million users who trust us with their searches',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: '24/7 Support',
                description: 'Our team is always available to help you with any questions',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Global Coverage',
                description: 'Search numbers from over 200 countries worldwide',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Always Updated',
                description: 'Real-time database updates ensure accurate information',
                color: 'from-rose-500 to-red-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white to-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 hover:border-accent/30 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl text-primary mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7DB9BC] via-accent to-[#5A9EA1]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            Join millions of users who trust SIM Finder for accurate and secure mobile number tracking
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-primary rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 group"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-primary/20 backdrop-blur-md text-white rounded-2xl hover:bg-primary/30 transition-all duration-300 border-2 border-white/30 font-semibold text-base sm:text-lg"
            >
              View Pricing
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
