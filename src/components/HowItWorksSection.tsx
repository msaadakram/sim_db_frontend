'use client';

import { motion } from 'motion/react';
import { Search, Database, CheckCircle, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    icon: Search,
    title: 'Enter Details',
    description: 'Simply enter the mobile number or CNIC you want to search for in our secure search box.',
    step: '01'
  },
  {
    icon: Database,
    title: 'System Analysis',
    description: 'Our advanced AI algorithms scan multiple databases to gather comprehensive information.',
    step: '02'
  },
  {
    icon: CheckCircle,
    title: 'Verification',
    description: 'All data is verified through multiple sources to ensure 99.9% accuracy and authenticity.',
    step: '03'
  },
  {
    icon: Download,
    title: 'Get Results',
    description: 'Receive detailed results instantly with options to download comprehensive PDF reports.',
    step: '04'
  }
];

export function HowItWorksSection() {
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-accent text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Simple Process</p>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How it works
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Get comprehensive SIM details in just four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent to-accent -translate-y-1/2 opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center px-4">
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="inline-block mb-4 sm:mb-6"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-lg">
                        <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                        {step.step}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 
                    className="text-lg sm:text-xl text-primary mb-2 sm:mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    className="hidden lg:block absolute top-10 -right-4 xl:-right-8 text-accent"
                  >
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="xl:w-16">
                      <path 
                        d="M2 12H46M46 12L36 2M46 12L36 22" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        opacity="0.3"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-primary text-white rounded-full hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Start Searching Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}