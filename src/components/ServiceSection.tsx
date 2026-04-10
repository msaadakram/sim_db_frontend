'use client';

import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ServiceSection() {
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

  const services = [
    'Pakistan SIM details check by mobile number',
    'CNIC details verification and linked SIM lookup',
    'SIM owner details and identity match checks',
    'Network provider and SIM status information',
    'SIM activation and registration insights',
    'Secure number intelligence and risk analysis'
  ];

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Trusted in Pakistan</p>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fast SIM details check with verified owner and CNIC data
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Our platform is built for Pakistan SIM details check use cases, helping you find SIM owner details,
              validate CNIC-linked numbers, and review registration records in seconds.
              Get reliable results with privacy-focused, secure search workflows.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Designed for fast checks, clear summaries, and safer verification decisions without compromising user privacy.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>{service}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full hover:bg-accent transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Explore SIM Check Features</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#7DB9BC] to-[#6FA8AB] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg"
              >
                <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-2xl sm:text-3xl mb-1 sm:mb-2 text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>99.9%</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Verification Accuracy</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-primary to-[#2A4D5A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg mt-8 sm:mt-12"
              >
                <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-2xl sm:text-3xl mb-1 sm:mb-2 text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>&lt;2s</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Response Time</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#5A9EA1] to-[#4A8E91] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg"
              >
                <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-2xl sm:text-3xl mb-1 sm:mb-2 text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>24/7</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Customer Support</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg -mt-8 sm:-mt-12"
              >
                <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <h3 className="text-2xl sm:text-3xl mb-1 sm:mb-2 text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>5M+</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Searches</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 border-2 border-accent/30 rounded-full -z-10 hidden md:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}