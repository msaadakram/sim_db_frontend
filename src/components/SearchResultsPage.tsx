'use client';

import { motion } from 'motion/react';
import { ArrowLeft, SearchX } from 'lucide-react';

interface SearchResultsPageProps {
  searchQuery: string;
  searchType: 'mobile' | 'cnic';
  onBack: () => void;
}

export function SearchResultsPage({ searchQuery, searchType, onBack }: SearchResultsPageProps) {
  const trimmedQuery = searchQuery.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-muted/10 to-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            className="mb-3 sm:mb-4 md:mb-6 flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 touch-manipulation"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-accent hover:text-primary transition-colors" />
          </motion.button>
        </motion.div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 text-center px-4 max-w-md"
          >
            <SearchX className="w-14 h-14 text-amber-500" />
            <h2
              className="text-xl sm:text-2xl font-bold text-primary"
              style={{ fontFamily: "\'Playfair Display\', serif" }}
            >
              Service Not Available
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              The lookup service is currently not available. Please check back later.
            </p>
            {trimmedQuery ? (
              <p className="text-xs sm:text-sm text-muted-foreground/80">
                Last request: <span className="font-medium text-foreground">{trimmedQuery}</span> ({searchType.toUpperCase()})
              </p>
            ) : null}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
            >
              Go Back Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
