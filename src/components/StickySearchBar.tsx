'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const MESSAGES = [
    "Search number details now 🔥",
    "Track live location instantly 📍",
    "Get CNIC Information Free 🆔",
    "Trace any mobile number 📱"
];

export function StickySearchBar() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{
                x: 0,
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
            className="fixed top-0 left-0 right-0 z-[69] bg-gradient-to-r from-[#7DB9BC]/95 via-[#5A9EA1]/95 to-[#7DB9BC]/95 backdrop-blur-md bg-[length:200%_100%] text-white shadow-lg border-b border-white/20 h-8 sm:h-10 flex items-center justify-center cursor-pointer overflow-hidden group"
            onClick={() => {
                if (window.location.pathname !== '/') {
                    window.location.href = '/#home';
                } else {
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }
            }}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Animated Shine Sweep */}
            <div className="absolute inset-0 animate-shine">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 w-1/3" />
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-2 xs:px-3 sm:px-4 relative z-10 w-full max-w-xl justify-center">
                {/* Search Icon */}
                <div className="relative flex-shrink-0">
                    <Search className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </div>

                {/* Rotating Messages with Shimmer Text */}
                <div className="relative h-5 sm:h-6 overflow-hidden flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <span className="text-[10px] xs:text-xs sm:text-sm font-semibold truncate w-full text-center bg-gradient-to-r from-white via-white/60 to-white bg-[length:200%_100%] bg-clip-text animate-text-shimmer">
                                {MESSAGES[index]}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Free Button - visible on ALL sizes */}
                <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/25 border border-white/30 px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-0.5 xs:gap-1 flex-shrink-0 backdrop-blur-sm"
                >
                    <span>Free</span>
                    <svg className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
}
