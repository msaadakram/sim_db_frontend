'use client';

import { motion } from 'motion/react';
import { Search, Shield, MapPin, Phone, CreditCard, User } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onSearch?: (query: string, type: 'mobile' | 'cnic') => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'number' | 'cnic'>('number');

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery, activeTab === 'number' ? 'mobile' : 'cnic');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#7DB9BC] to-[#6FA8AB] pt-16 sm:pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-1/4 -right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 text-white/90"
              >
                SIM Owner Detail, SIM Owner Details Pakistan & PTA SIM Check Platform
              </motion.p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                SIM Owner Detail & SIM Details Check in Pakistan
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl mb-4 text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                SIM owner details by number, SIM info by number, and SIM verification system
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-xl mx-auto lg:mx-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                Run a fast sim data check for Pakistan mobile numbers. Verify sim owner name check results,
                perform sim registration check, review pta sim information, and complete sim detail verification in one secure dashboard.
              </p>
            </motion.div>

            {/* Professional Search Box with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-xl mx-auto lg:mx-0"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* Tab Headers */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('number')}
                    className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base ${activeTab === 'number'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-transparent text-foreground hover:bg-muted/50'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Mobile Number</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cnic')}
                    className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base ${activeTab === 'cnic'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-transparent text-foreground hover:bg-muted/50'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>CNIC</span>
                  </button>
                </div>

                {/* Search Input Area */}
                <div className="p-4 sm:p-6">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {activeTab === 'number' ? (
                        <Phone className="w-5 h-5" />
                      ) : (
                        <CreditCard className="w-5 h-5" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        activeTab === 'number'
                          ? 'Enter mobile number for SIM details check (e.g., 03001234567)'
                          : 'Enter CNIC for owner details check (e.g., 12345-1234567-1)'
                      }
                      className="w-full pl-12 pr-4 py-4 sm:py-5 text-foreground bg-muted/50 rounded-2xl outline-none border-2 border-transparent focus:border-accent transition-all duration-300 text-sm sm:text-base"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      onKeyPress={handleKeyPress}
                    />
                  </div>

                  {/* Helper Text */}
                  <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p style={{ fontFamily: "'Inter', sans-serif" }}>
                      {activeTab === 'number'
                        ? 'Enter a valid Pakistani mobile number to check SIM owner details'
                        : 'Enter a valid 13-digit CNIC to check linked SIM details'}
                    </p>
                  </div>

                  {/* Search Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    className="w-full mt-4 px-6 py-4 sm:py-5 bg-gradient-to-r from-primary to-[#2A4D5A] text-white rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group"
                  >
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>
                      Check SIM Details
                    </span>
                  </motion.button>
                </div>

                {/* Trust Indicators */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Secure</span>
                  </div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Instant</span>
                  </div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>99.9%</h3>
                <p className="text-xs sm:text-sm text-white/80">Accuracy</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>5M+</h3>
                <p className="text-xs sm:text-sm text-white/80">SIM Checks</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>24/7</h3>
                <p className="text-xs sm:text-sm text-white/80">Support</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Illustration - NOW VISIBLE ON ALL DEVICES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full"
          >
            {/* Mobile/Tablet Layout (below lg) */}
            <div className="lg:hidden">
              <div className="relative max-w-sm mx-auto h-[400px] sm:h-[500px]">
                {/* Center Phone - Mobile */}
                <motion.div
                  animate={{
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 mx-auto w-32 h-64 sm:w-40 sm:h-80 bg-gradient-to-br from-primary to-[#2A4D5A] rounded-[2.5rem] shadow-2xl p-2.5 sm:p-3 top-1/2 -translate-y-1/2"
                >
                  <div className="w-full h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                    <div className="h-full bg-gradient-to-br from-[#7DB9BC]/20 to-white flex items-center justify-center">
                      <Phone className="w-12 h-12 sm:w-16 sm:h-16 text-[#7DB9BC]" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 1 - Top Right - Mobile */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-0 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-3 w-36 sm:w-44 z-20 border border-white/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#7DB9BC]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#7DB9BC]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs text-muted-foreground truncate">Live Location</h4>
                      <p className="text-xs text-primary truncate">Karachi, PK</p>
                    </div>
                  </div>
                  <div className="relative h-16 sm:h-20 bg-gradient-to-br from-[#7DB9BC]/10 to-[#7DB9BC]/30 rounded-lg overflow-hidden border border-[#7DB9BC]/20">
                    {/* Map grid */}
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(125,185,188,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(125,185,188,0.35) 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                      }}
                    />

                    {/* Scanning sweep */}
                    <motion.div
                      animate={{ x: ['-110%', '110%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#7DB9BC]/40 to-transparent"
                    />

                    {/* Pulse signal */}
                    <motion.div
                      animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.65, 0.15, 0.65] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7DB9BC]/40"
                    />

                    {/* Moving location pin */}
                    <motion.div
                      animate={{ x: ['-35%', '30%', '-5%', '-35%'], y: ['15%', '-10%', '20%', '15%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 left-1/2"
                    >
                      <MapPin className="w-4 h-4 text-[#2A4D5A] drop-shadow-sm" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Card 2 - Bottom Left - Mobile */}
                <motion.div
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-4 left-0 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-3 w-36 sm:w-44 z-20 border border-white/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#7DB9BC]/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-[#7DB9BC]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs text-muted-foreground truncate">Verified</h4>
                      <p className="text-xs text-primary truncate">CNIC Match</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="text-primary truncate ml-1">John Doe</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="text-primary">Jazz</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop Layout (lg and above) */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] xl:h-[600px]">
                {/* Floating Cards */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 xl:p-6 w-56 xl:w-64 border border-white/40"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-[#7DB9BC]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 xl:w-6 xl:h-6 text-[#7DB9BC]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs xl:text-sm text-muted-foreground truncate">Live Location</h4>
                      <p className="text-sm xl:text-base text-primary truncate">Karachi, Pakistan</p>
                    </div>
                  </div>
                  <div className="h-24 xl:h-32 bg-gradient-to-br from-[#7DB9BC]/10 to-[#7DB9BC]/30 rounded-lg"></div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 xl:p-6 w-56 xl:w-64 border border-white/40"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-[#7DB9BC]/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 xl:w-6 xl:h-6 text-[#7DB9BC]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs xl:text-sm text-muted-foreground truncate">Verified</h4>
                      <p className="text-sm xl:text-base text-primary truncate">CNIC Matched</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs xl:text-sm">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="text-primary truncate ml-2">John Doe</span>
                    </div>
                    <div className="flex justify-between text-xs xl:text-sm">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="text-primary">Jazz</span>
                    </div>
                    <div className="flex justify-between text-xs xl:text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </motion.div>

                {/* Center Phone Illustration */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 mx-auto w-40 h-80 xl:w-48 xl:h-96 bg-gradient-to-br from-primary to-[#2A4D5A] rounded-[3rem] shadow-2xl p-3 top-1/2 -translate-y-1/2"
                >
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <div className="h-full bg-gradient-to-br from-[#7DB9BC]/20 to-white flex items-center justify-center">
                      <Phone className="w-16 h-16 xl:w-20 xl:h-20 text-[#7DB9BC]" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}