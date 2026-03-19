'use client';

import { Menu, X, Phone, Shield, Smartphone, Home, Star, BookOpen, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { StickySearchBar } from './StickySearchBar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Handle mobile menu toggle with scroll
  const handleMenuToggle = () => {
    if (!mobileMenuOpen) {
      // If menu is closed and we're at top, scroll down slightly first
      if (window.scrollY === 0) {
        window.scrollTo({ top: 50, behavior: 'smooth' });
        // Wait for scroll to complete before opening menu
        setTimeout(() => {
          setMobileMenuOpen(true);
        }, 100);
      } else {
        // If already scrolled, open immediately
        setMobileMenuOpen(true);
      }
    } else {
      // Close menu
      setMobileMenuOpen(false);
    }
  };

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-colors duration-300 ${scrolled
          ? 'bg-white shadow-lg border-b border-border'
          : 'bg-white/95 backdrop-blur-lg border-b border-border/50 shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-20 xl:h-24">
            {/* Logo */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#7DB9BC] to-[#5A9EA1] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl text-primary whitespace-nowrap font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  SIM Finder
                </span>
              </motion.div>
            </Link>

            {/* Desktop & Tablet Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-4">
              {isHomePage ? (
                <>
                  <NavLink href="#home">Home</NavLink>
                  <RouterNavLink to="/features">Features</RouterNavLink>
                  <RouterNavLink to="/blog">Blog</RouterNavLink>
                  <RouterNavLink to="/apps" icon={<Smartphone className="w-4 h-4" />}>Apps</RouterNavLink>
                  <RouterNavLink to="/disclaimer">Disclaimer</RouterNavLink>
                  <RouterNavLink to="/contact">Contact</RouterNavLink>
                </>
              ) : (
                <>
                  <RouterNavLink to="/">Home</RouterNavLink>
                  <RouterNavLink to="/features">Features</RouterNavLink>
                  <RouterNavLink to="/blog">Blog</RouterNavLink>
                  <RouterNavLink to="/apps" icon={<Smartphone className="w-4 h-4" />}>Apps</RouterNavLink>
                  <RouterNavLink to="/disclaimer">Disclaimer</RouterNavLink>
                  <RouterNavLink to="/contact">Contact</RouterNavLink>
                </>
              )}
            </nav>

            {/* CTA Button - Desktop & Tablet */}
            <div className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-xl transition-all duration-300 text-sm lg:text-base font-medium whitespace-nowrap"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMenuToggle}
              className="md:hidden p-2.5 rounded-xl hover:bg-muted transition-colors relative z-[60]"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] top-0"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl overflow-y-auto z-[60] pt-20"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="flex flex-col pt-1 px-6 pb-6 space-y-2">
                  {/* Mobile Nav Links */}
                  <MobileRouterNavLink to="/" onClick={handleLinkClick} icon={<Home className="w-5 h-5" />}>
                    Home
                  </MobileRouterNavLink>
                  <MobileRouterNavLink to="/features" onClick={handleLinkClick} icon={<Star className="w-5 h-5" />}>
                    Features
                  </MobileRouterNavLink>
                  <MobileRouterNavLink to="/blog" onClick={handleLinkClick} icon={<BookOpen className="w-5 h-5" />}>
                    Blog
                  </MobileRouterNavLink>
                  <MobileRouterNavLink
                    to="/apps"
                    onClick={handleLinkClick}
                    icon={<Smartphone className="w-5 h-5" />}
                  >
                    Apps
                  </MobileRouterNavLink>
                  <MobileRouterNavLink to="/disclaimer" onClick={handleLinkClick} icon={<Shield className="w-5 h-5" />}>
                    Disclaimer
                  </MobileRouterNavLink>
                  <MobileRouterNavLink to="/contact" onClick={handleLinkClick} icon={<Mail className="w-5 h-5" />}>
                    Contact
                  </MobileRouterNavLink>

                  {/* Mobile CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLinkClick}
                    className="mt-4 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-center"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Get Started
                  </motion.button>

                  {/* Back to Page Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLinkClick}
                    className="px-5 py-4 bg-gradient-to-r from-accent/10 to-primary/10 text-primary rounded-2xl hover:from-accent/20 hover:to-primary/20 transition-all duration-300 font-semibold text-center flex items-center justify-center gap-3 border-2 border-accent/20"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Page
                  </motion.button>

                  {/* Mobile Menu Footer */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                      © 2026 SIM Finder. All rights reserved.
                    </p>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Secondary Sticky Search Notification Bar */}
      <AnimatePresence>
        {hidden && (
          <StickySearchBar />
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop/Tablet Navigation Link Component
function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      className="relative px-3 lg:px-4 py-2 text-foreground hover:text-accent transition-colors text-sm lg:text-base font-medium rounded-xl hover:bg-muted/50 flex items-center gap-2 group"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {icon}
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="underline"
      />
    </motion.a>
  );
}

// Router Navigation Link Component
function RouterNavLink({
  to,
  children,
  icon
}: {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      className="relative px-3 lg:px-4 py-2 text-foreground hover:text-accent transition-colors text-sm lg:text-base font-medium rounded-xl hover:bg-muted/50 flex items-center gap-2 group"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {icon}
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="underline"
      />
    </Link>
  );
}

// Mobile Router Navigation Link Component
function MobileRouterNavLink({
  to,
  children,
  onClick,
  icon
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-4 text-foreground hover:text-accent hover:bg-muted/50 rounded-2xl transition-all duration-300 text-base font-medium group"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      {!icon && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Phone className="w-4 h-4 text-accent" />
        </div>
      )}
      <span className="flex-1">{children}</span>
      <motion.div
        className="w-6 h-6 rounded-full bg-accent/0 group-hover:bg-accent/10 flex items-center justify-center transition-colors"
      >
        <svg className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </Link>
  );
}