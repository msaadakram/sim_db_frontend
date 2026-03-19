'use client';

import { motion } from 'motion/react';
import { Smartphone } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(125, 185, 188, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(111, 168, 171, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(125, 185, 188, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      ></motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6
          }}
          className="relative"
        >
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="2"
                strokeDasharray="70 30"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7DB9BC" />
                  <stop offset="100%" stopColor="#6FA8AB" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Middle Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-2 sm:inset-3 w-24 h-24 sm:w-26 sm:h-26"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2"
                strokeDasharray="50 50"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6FA8AB" />
                  <stop offset="100%" stopColor="#5A9EA1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Center Logo Circle */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-2xl">
            {/* Pulsing Inner Circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-white"
            ></motion.div>

            {/* Icon */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Smartphone className="w-12 h-12 sm:w-14 sm:h-14 text-white relative z-10" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Orbiting Dots */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.3
              }}
              className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32"
            >
              <div
                className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-accent to-primary shadow-lg"
                style={{
                  top: '50%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Dot Indicators Below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 mt-12"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary"
            ></motion.div>
          ))}
        </motion.div>
      </div>

      {/* Minimal Corner Accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-accent to-transparent rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary to-transparent rounded-full blur-3xl"
      ></motion.div>
    </div>
  );
}