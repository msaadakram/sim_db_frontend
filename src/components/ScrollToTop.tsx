'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { throttle } from '../lib/performance';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const toggleVisibility = throttle(() => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100);

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#home';
    } else {
      const homeElement = document.getElementById('home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-18 right-6 z-50 flex items-end justify-end"
        >
          <div className="relative group">
            {/* Notification Badge */}
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-10 animate-pulse"></span>

            {/* Main Card */}
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-3 sm:p-4 pr-8 sm:pr-10 min-w-[auto] sm:min-w-[280px] text-left transition-all duration-300 hover:shadow-primary/20 hover:border-primary/20"
            >
              <div className="flex items-center sm:items-start gap-3">
                {/* Icon Container */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-white/20 rounded-full border-t-white/60"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Quick Search
                    </h4>
                    <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-medium">New</span>
                  </div>
                  <p className="hidden sm:block text-xs text-muted-foreground leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Looking for a number? Search instantly now.
                  </p>
                </div>
              </div>

              {/* Decorative Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            </motion.button>

            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}