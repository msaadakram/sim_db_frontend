'use client';

import { motion } from 'motion/react';
import { Smartphone, Download, Zap, Shield, MapPin, Bell, Star, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function AppDownloadSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const features = [
    {
      icon: Zap,
      title: 'Instant Tracking',
      description: 'Track any number in seconds with our lightning-fast mobile app'
    },
    {
      icon: MapPin,
      title: 'Live Location',
      description: 'Get real-time GPS location updates on your mobile device'
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Receive instant alerts for all your tracking activities'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your data stays protected'
    }
  ];

  const stats = [
    { value: '500K+', label: 'Downloads' },
    { value: '4.8★', label: 'App Rating' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <section id="apps" ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-muted/30 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full mb-6"
            >
              <Download className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Download Now</span>
            </motion.div>

            {/* Heading */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl text-primary mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Track Numbers
              <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                On The Go
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Download our powerful mobile app and access all SIM tracking features right from your smartphone. Fast, secure, and always at your fingertips.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              {/* App Store Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 px-6 py-4 bg-primary text-white rounded-2xl hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Play Store Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 -left-10 z-10"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl p-4 border border-accent/20">
                <div className="w-full h-full bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-20 -right-5 lg:right-10 z-10"
            >
              <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl p-4 border border-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-xl flex flex-col items-center justify-center text-white">
                  <Star className="w-6 h-6 mb-1 fill-current" />
                  <div className="text-xs font-bold">4.8 Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-[3rem] blur-3xl opacity-30"></div>
              
              {/* Phone Frame */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-72 sm:w-80 md:w-96 h-[600px] sm:h-[650px] md:h-[750px] bg-primary rounded-[3rem] p-3 shadow-2xl"
              >
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-gradient-to-r from-primary to-accent px-6 py-4 flex items-center justify-between text-white text-xs">
                    <span>9:41</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white/70 rounded-full"></div>
                        <div className="w-1 h-3 bg-white/40 rounded-full"></div>
                        <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="w-4 h-2.5 border border-white rounded-sm relative">
                        <div className="absolute inset-0.5 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                          SIM Finder
                        </h3>
                        <p className="text-sm text-muted-foreground">Track & Verify</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Search Card */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-gradient-to-br from-muted/50 to-white rounded-2xl p-6 mb-4 border border-accent/20 shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Tracking Number</div>
                          <div className="text-sm font-semibold text-primary">+92 300 1234567</div>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          animate={{ 
                            width: ["0%", "100%"]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="h-full bg-gradient-to-r from-accent to-primary"
                        ></motion.div>
                      </div>
                      <div className="text-xs text-center text-accent mt-2">Locating...</div>
                    </motion.div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-4">
                        <Shield className="w-6 h-6 text-accent mb-2" />
                        <div className="text-xs text-muted-foreground">Secured</div>
                        <div className="text-lg font-bold text-primary">100%</div>
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4">
                        <Zap className="w-6 h-6 text-primary mb-2" />
                        <div className="text-xs text-muted-foreground">Speed</div>
                        <div className="text-lg font-bold text-primary">Instant</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(125, 185, 188, 0.4)",
                          "0 0 0 20px rgba(125, 185, 188, 0)",
                        ]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg"
                    >
                      Start Tracking
                    </motion.button>

                    {/* Recent Searches */}
                    <div className="mt-6">
                      <div className="text-xs text-muted-foreground mb-3">Recent Searches</div>
                      {[1, 2, 3].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center gap-3 py-2 border-b border-border/50"
                        >
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-primary">+92 3XX XXXXXXX</div>
                          </div>
                          <div className="text-xs text-accent">View</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}