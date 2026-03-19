'use client';

import { motion } from 'motion/react';
import { Smartphone, Shield, Zap, MapPin, CheckCircle, Star, Download, Apple, Play, Phone, Lock, Globe, Search, Bell, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AppPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
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

  const appFeatures = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Instant Search',
      description: 'Search any mobile number or CNIC instantly with lightning-fast results'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Live Location',
      description: 'Track real-time location with advanced GPS technology'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your searches remain completely private'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Notifications',
      description: 'Get instant alerts for important updates and search results'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Social Media Info',
      description: 'Access connected social media profiles and contact information'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Network Details',
      description: 'View complete network information, IP addresses, and device data'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Khan',
      role: 'Business Owner',
      rating: 5,
      text: 'Best app for tracking SIM information! The interface is clean and results are accurate. Highly recommended!'
    },
    {
      name: 'Sara Malik',
      role: 'Security Professional',
      rating: 5,
      text: 'I use this app daily for verification purposes. The live location feature is incredibly accurate and reliable.'
    },
    {
      name: 'Bilal Ahmed',
      role: 'IT Manager',
      rating: 5,
      text: 'The mobile app makes it so convenient to verify numbers on the go. Fast, secure, and easy to use!'
    }
  ];

  const faqs = [
    {
      question: 'Is the app free to download?',
      answer: 'Yes! The app is completely free to download on both iOS and Android. We offer both free and premium plans with additional features.'
    },
    {
      question: 'How accurate is the location tracking?',
      answer: 'Our location tracking uses advanced GPS technology with 99.9% accuracy. Results are updated in real-time for the most precise information.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use military-grade encryption to protect all your searches and data. Your privacy is our top priority.'
    },
    {
      question: 'Can I use the app offline?',
      answer: 'While an internet connection is required for searches and live tracking, you can view your saved search history offline.'
    },
    {
      question: 'What devices are supported?',
      answer: 'Our app supports iOS 13+ and Android 8.0+. It works seamlessly on smartphones and tablets.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-muted/30 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-6"
              >
                <Smartphone className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm uppercase tracking-wider">Mobile App</span>
              </motion.div>

              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Track SIM Information{' '}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  On The Go
                </span>
              </h1>

              <p 
                className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Download our powerful mobile app and access advanced SIM tracking, live location monitoring, and comprehensive verification tools right from your smartphone.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl group"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-xs opacity-80">Download on the</p>
                    <p className="text-lg font-semibold -mt-1">App Store</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl hover:shadow-xl transition-all duration-300 shadow-lg group"
                >
                  <Play className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-xs opacity-90">Get it on</p>
                    <p className="text-lg font-semibold -mt-1">Google Play</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">500K+</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">4.8★</p>
                  <p className="text-sm text-muted-foreground">App Rating</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">50K+</p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-[3rem] blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Phone Frame */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Notch */}
                    <div className="bg-gray-900 h-8 rounded-b-3xl mx-auto w-40 relative">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    
                    {/* App Screenshot */}
                    <div className="bg-gradient-to-b from-muted/20 to-white p-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                          <Phone className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                          SIM Finder
                        </h3>
                        <p className="text-sm text-muted-foreground">Track • Verify • Locate</p>
                      </div>

                      {/* Search Bar */}
                      <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 border border-border/50">
                        <div className="flex items-center gap-3">
                          <Search className="w-5 h-5 text-accent" />
                          <input 
                            type="text" 
                            placeholder="Enter mobile number..."
                            className="flex-1 outline-none text-sm"
                            disabled
                          />
                        </div>
                      </div>

                      {/* Feature Cards */}
                      <div className="space-y-3">
                        {[
                          { icon: <MapPin className="w-5 h-5" />, title: 'Live Location', color: 'from-red-500 to-pink-500' },
                          { icon: <Shield className="w-5 h-5" />, title: 'Secure Search', color: 'from-blue-500 to-cyan-500' },
                          { icon: <Zap className="w-5 h-5" />, title: 'Instant Results', color: 'from-yellow-500 to-orange-500' }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="bg-gradient-to-br from-muted/50 to-white rounded-xl p-4 flex items-center gap-3 border border-border/30"
                          >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium text-primary">{item.title}</span>
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Download className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-2xl"
                >
                  <Star className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-accent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Powerful Features in{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Your Pocket
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the ultimate SIM tracking solution with our feature-rich mobile application
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {appFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-white to-muted/30 rounded-2xl p-8 border border-border/50 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  <h3 
                    className="text-2xl text-primary mb-3 group-hover:text-accent transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/20 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with our app in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Download & Install',
                description: 'Download the app from App Store or Google Play and complete the quick setup process',
                icon: <Download className="w-8 h-8" />
              },
              {
                step: '02',
                title: 'Enter Details',
                description: 'Input the mobile number or CNIC you want to track and verify',
                icon: <Search className="w-8 h-8" />
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive instant, accurate results with live location and comprehensive information',
                icon: <CheckCircle className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Connecting Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-accent to-primary opacity-30"></div>
                )}

                <div className="relative">
                  <div className="inline-flex w-32 h-32 rounded-full bg-gradient-to-br from-accent to-primary items-center justify-center text-white shadow-2xl mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full blur-lg opacity-50"></div>
                    <div className="relative">{step.icon}</div>
                  </div>

                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white border-4 border-accent shadow-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-accent">{step.step}</span>
                  </div>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl text-primary mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied users worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-white to-muted/30 rounded-2xl p-8 border border-border/50 hover:border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Everything you need to know about our mobile app
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg sm:text-xl font-semibold text-primary pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-6 h-6 text-accent group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7DB9BC] via-accent to-[#5A9EA1]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Smartphone className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Download our app today and experience the most advanced SIM tracking solution available
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl group w-full sm:w-auto"
            >
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xs opacity-60">Download on the</p>
                <p className="text-lg font-semibold -mt-1">App Store</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl group w-full sm:w-auto"
            >
              <Play className="w-6 h-6" />
              <div className="text-left">
                <p className="text-xs opacity-60">Get it on</p>
                <p className="text-lg font-semibold -mt-1">Google Play</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
