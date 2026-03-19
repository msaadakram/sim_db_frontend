'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function LazySection({ children, className = '', threshold = 0.1 }: LazySectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '100px' // Start loading 100px before element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {isLoaded ? children : <div className="min-h-[400px]"></div>}
    </div>
  );
}
