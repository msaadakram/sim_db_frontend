'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Business Owner',
    content: 'This service helped me verify employee information quickly and accurately. The CNIC verification feature is absolutely fantastic!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    name: 'Fatima Khan',
    role: 'Security Analyst',
    content: 'The live location tracking is incredibly precise. We use this service daily for security purposes and it never disappoints.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    name: 'Ali Raza',
    role: 'Private Investigator',
    content: 'Best SIM tracking service I have used. The detailed reports and instant results make my job so much easier.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  }
];

export function TestimonialsSection() {
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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#7DB9BC] to-[#6FA8AB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Testimonials</p>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What our clients say
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Trusted by thousands of satisfied customers across Pakistan
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-accent/20 mb-3 sm:mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p 
                className="text-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={150}
                    height={150}
                    sizes="48px"
                    quality={60}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-primary text-sm sm:text-base truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}