'use client';

import { motion } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getKeywordSentence } from '@/lib/seo-keywords';

export function CTASection() {
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

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-white text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 
                    className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Ready for SIM owner lookup and SIM detail checker results?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Start tracking SIM details instantly with our advanced verification system.
                    Get accurate results in seconds with complete privacy and security.
                    Keyword coverage includes: {getKeywordSentence(48, 14)}.
                  </p>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-full hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                    >
                      <span>Get Started Free</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                    >
                      Contact Sales
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Right Content - Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                        100% Secure & Private
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Your searches are encrypted and completely confidential
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Lightning Fast Results
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Get comprehensive information in under 2 seconds
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                        99.9% Accuracy Guaranteed
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Verified data from multiple trusted sources
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}