'use client';

import { motion } from 'motion/react';
import { MapPin, Shield, Phone, Search, Clock, Globe, UserCheck, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: MapPin,
    title: 'PTA Official Guidelines',
    description: 'Learn official Pakistan Telecommunication Authority rules for SIM registration, verification, and legal procedures.',
    color: '#7DB9BC'
  },
  {
    icon: Shield,
    title: '668 Method Tutorial',
    description: 'Complete guide on using the 668 USSD code for official SIM verification through PTA channels.',
    color: '#5A9EA1'
  },
  {
    icon: Phone,
    title: 'Self-SIM Verification',
    description: 'Learn how to verify your own SIM details, check linked SIMs to your CNIC, and ensure account security.',
    color: '#7DB9BC'
  },
  {
    icon: UserCheck,
    title: 'Identity Protection',
    description: 'Understand how to protect your identity, detect unauthorized SIM registrations, and report misuse legally.',
    color: '#5A9EA1'
  },
  {
    icon: Globe,
    title: 'Telecom System Overview',
    description: 'Educational content about Pakistan telecom structure, carrier networks, and how SIM registration systems work.',
    color: '#7DB9BC'
  },
  {
    icon: Clock,
    title: 'Fraud Detection Guide',
    description: 'Learn to identify telecom scams, spoofing attempts, SIM hijacking, and how to escalate issues with authorities.',
    color: '#5A9EA1'
  },
  {
    icon: Search,
    title: 'Complaint Process',
    description: 'Step-by-step guide on filing complaints with PTA, operators, and FIA for SIM-related disputes and fraud.',
    color: '#7DB9BC'
  },
  {
    icon: FileText,
    title: 'Legal Framework',
    description: 'Comprehensive documentation of Pakistani telecom laws, SIM regulations, and what constitutes illegal activity.',
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
    <section id="features" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Comprehensive Educational Guides</p>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-primary mb-3 sm:mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Master Official SIM Verification & PTA Methods
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Complete guides on official methods, telecom regulations, identity protection, and legal procedures for SIM verification in Pakistan. Learn from trusted sources and official PTA guidelines.
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