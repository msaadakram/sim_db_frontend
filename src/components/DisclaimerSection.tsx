'use client';

import { motion } from 'motion/react';
import { AlertCircle, Shield, Lock, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function DisclaimerSection() {
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

  const disclaimerPoints = [
    {
      icon: AlertCircle,
      title: 'Information Accuracy',
      description: 'While we strive to provide accurate and up-to-date information, we cannot guarantee 100% accuracy of all data. Information should be verified through official channels when necessary.'
    },
    {
      icon: Shield,
      title: 'Legal Usage',
      description: 'Our services are intended for legal purposes only. Users must comply with all applicable laws and regulations in their jurisdiction. Unauthorized tracking or surveillance is prohibited.'
    },
    {
      icon: Lock,
      title: 'Privacy & Data Protection',
      description: 'We take privacy seriously and handle all data in accordance with applicable privacy laws. However, users are responsible for ensuring their use of our services complies with privacy regulations.'
    },
    {
      icon: Info,
      title: 'Service Limitations',
      description: 'Service availability and accuracy may vary based on network providers, location, and other factors. We are not liable for any indirect damages resulting from service use or interruption.'
    }
  ];

  return (
    <section id="disclaimer" ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <AlertCircle className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs sm:text-sm uppercase tracking-wider">Important Notice</span>
          </motion.div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-primary mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Disclaimer
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto px-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Please read the following important information before using our services
          </p>
        </motion.div>

        {/* Disclaimer Cards */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {disclaimerPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-accent/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl text-primary mb-3 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-primary to-accent rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Terms of Service
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                By using SIM OWNER DETAIL services, you agree to our terms of service and privacy policy. We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.
              </p>
              <p className="text-white/80 text-xs sm:text-sm italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                Last updated: February 18, 2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-muted-foreground text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            For questions or concerns regarding our disclaimer or terms, please{' '}
            <a href="#contact" className="text-accent hover:text-primary transition-colors font-medium">
              contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
