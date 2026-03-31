'use client';

import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { getKeywordParagraphs, getKeywordSentence } from '@/lib/seo-keywords';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const keywordParagraphs = getKeywordParagraphs(11);

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                SIM Finder
              </span>
            </div>
            <p className="text-white/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              Your trusted partner for comprehensive SIM card tracking and verification services.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li>
                <a href="#home" className="text-white/70 hover:text-accent transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-white/70 hover:text-accent transition-colors">Features</a>
              </li>
              <li>
                <a href="#blog" className="text-white/70 hover:text-accent transition-colors">Blog</a>
              </li>
              <li>
                <a href="#apps" className="text-white/70 hover:text-accent transition-colors">Apps</a>
              </li>
              <li>
                <a href="#disclaimer" className="text-white/70 hover:text-accent transition-colors">Disclaimer</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-accent transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">Location Tracking</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">CNIC Verification</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">Number Details</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">Owner Information</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-accent transition-colors">Network Analysis</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  +92 300 1234567
                </span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70 break-all">
                  info@simfinder.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 sm:mb-12 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            SIM owner details Pakistan search keywords
          </h3>
          <p className="text-white/85 text-sm sm:text-base mb-3 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Popular keyword phrases used across our website for sim owner detail coverage include: {getKeywordSentence(0, 14)}.
          </p>
          <div className="space-y-2">
            {keywordParagraphs.map((paragraph, index) => (
              <p
                key={`keyword-paragraph-${index}`}
                className="text-white/75 text-xs sm:text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/70 text-xs sm:text-sm text-center md:text-left" style={{ fontFamily: "'Inter', sans-serif" }}>
              © {currentYear} SIM Finder. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <a href="#" className="text-white/70 hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}