'use client';

import { motion } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface OptimizedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function OptimizedSection({ children, className = '', id, delay = 0 }: OptimizedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.05, triggerOnce: true });

  return (
    <motion.section
      ref={elementRef as any}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.section>
  );
}
