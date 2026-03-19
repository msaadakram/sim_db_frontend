'use client';

import { motion } from 'motion/react';
import { MapPin, Shield, Phone, Search, Clock, Globe, UserCheck, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: MapPin,
    title: 'Live Location Tracking',
    description: 'Track real-time location of any mobile number with precise GPS coordinates and area details.',
    color: '#7DB9BC'
  },
  {
    icon: Shield,
    title: 'CNIC Verification',
    description: 'Instantly verify CNIC details linked to any SIM card with complete owner information.',
    color: '#5A9EA1'
  },
  {
    icon: Phone,
    title: 'Number Details',
    description: 'Get comprehensive information about any phone number including carrier, status, and registration date.',
    color: '#7DB9BC'
  },
  {
    icon: UserCheck,
    title: 'Owner Information',
    description: 'Access verified owner details with complete identity verification and authenticity checks.',
    color: '#5A9EA1'
  },
  {
    icon: Globe,
    title: 'Network Analysis',
    description: 'Detailed network provider information, coverage areas, and connectivity status reports.',
    color: '#7DB9BC'
  },
  {
    icon: Clock,
    title: 'Call History',
    description: 'View detailed call logs, duration patterns, and communication analytics securely.',
    color: '#5A9EA1'
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Multiple search options including number, CNIC, or owner name with instant results.',
    color: '#7DB9BC'
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Generate comprehensive PDF reports with all information for official documentation.',
    color: '#5A9EA1'
  }
];

export function FeaturesSection() {
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

  return (
    <section id="features" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Our Services</p>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Powerful features at your fingertips
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Comprehensive SIM card tracking and verification services designed for accuracy and reliability
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-muted rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 hover:shadow-xl border border-transparent hover:border-accent/30">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: feature.color }} />
                </motion.div>
                <h3 className="text-lg sm:text-xl text-primary mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}