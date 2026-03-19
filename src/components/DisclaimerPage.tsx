'use client';

import { motion } from 'motion/react';
import { Shield, AlertTriangle, FileText, Lock, Users, Scale, Info, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function DisclaimerPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'General Information',
      content: [
        'This service is provided for informational purposes only. By accessing and using SIM Finder, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.',
        'The information provided through our platform is obtained from publicly available sources and third-party data providers. We strive to ensure accuracy but cannot guarantee the completeness or reliability of all information.',
        'SIM Finder is not affiliated with any telecommunications company, government agency, or regulatory body. We operate as an independent information service provider.'
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Legal Use Only',
      content: [
        'Our services must be used in compliance with all applicable local, state, national, and international laws and regulations. Users are solely responsible for ensuring their use of this service is lawful.',
        'This service is intended for legitimate purposes only, including but not limited to: verification of mobile numbers, fraud prevention, security checks, and authorized investigations.',
        'Any use of this service for illegal activities, harassment, stalking, or violation of privacy rights is strictly prohibited and may result in immediate termination of access and legal action.',
        'Users must obtain proper consent or have legal authority before searching for information about third parties.'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Privacy & Data Protection',
      content: [
        'We take data protection seriously and implement industry-standard security measures to protect user information and search queries.',
        'All searches are encrypted using SSL/TLS protocols. However, users should be aware that no method of electronic transmission is 100% secure.',
        'We do not sell, rent, or share user data with third parties for marketing purposes. Data may be shared only as required by law or to provide the requested services.',
        'Users have the right to request deletion of their account and associated data at any time by contacting our support team.',
        'Search history and personal information are retained only as necessary to provide services and comply with legal obligations.'
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Limitation of Liability',
      content: [
        'SIM Finder provides information "as is" without any warranties, express or implied, including but not limited to warranties of accuracy, completeness, or fitness for a particular purpose.',
        'We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our services.',
        'The accuracy of location data depends on various factors including GPS availability, network coverage, and device settings. Location information should not be solely relied upon for critical decisions.',
        'We are not responsible for actions taken based on information obtained through our service. Users should verify critical information through official channels.',
        'Our total liability for any claims related to the service shall not exceed the amount paid by the user for the service in the preceding 12 months.'
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Responsibilities',
      content: [
        'Users must provide accurate information when creating an account and keep their login credentials secure.',
        'You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.',
        'Do not attempt to circumvent any security measures or access systems or data you are not authorized to access.',
        'Users must not use automated systems, bots, or scripts to access the service without express written permission.',
        'Respect the intellectual property rights of SIM Finder and do not reproduce, distribute, or create derivative works without authorization.'
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Service Accuracy & Availability',
      content: [
        'While we strive for 99.9% accuracy, the information provided may occasionally be outdated, incomplete, or incorrect due to factors beyond our control.',
        'Data accuracy depends on the quality of information from our sources. We update our databases regularly but cannot guarantee real-time accuracy.',
        'Service availability is not guaranteed and may be subject to interruptions for maintenance, updates, or due to technical issues.',
        'We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without prior notice.',
        'Location tracking accuracy may vary based on network conditions, device compatibility, and environmental factors.'
      ]
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: 'Prohibited Uses',
      content: [
        'Using the service to harass, stalk, threaten, or violate the privacy rights of any individual.',
        'Accessing or attempting to access information without proper authorization or legal right.',
        'Using information obtained for any unlawful purpose or in violation of any applicable laws.',
        'Reselling, redistributing, or commercially exploiting information obtained through our service.',
        'Attempting to reverse engineer, decompile, or derive source code from our platform.',
        'Interfering with or disrupting the service or servers connected to the service.',
        'Using the service to spread malware, viruses, or other harmful code.'
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Updates & Modifications',
      content: [
        'We reserve the right to update, modify, or change these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.',
        'Users will be notified of significant changes via email or through prominent notices on our platform.',
        'It is your responsibility to review these terms periodically for any updates or changes.',
        'The "Last Updated" date at the bottom of this page indicates when these terms were last modified.'
      ]
    }
  ];

  const importantNotes = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: 'Always verify critical information through official government channels or authorized agencies.'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: 'Use the service responsibly and in compliance with all applicable laws and regulations.'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: 'Respect privacy rights and obtain proper consent before searching for third-party information.'
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: 'Do not use the service for harassment, stalking, or any illegal activities.'
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: 'Do not rely solely on location data for emergency or life-critical decisions.'
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      text: 'Do not share your account credentials or allow unauthorized access to your account.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-muted/30 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-6"
          >
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm uppercase tracking-wider">Legal Information</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Terms & Disclaimer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Please read these terms carefully before using our services. By accessing SIM Finder, you agree to be bound by these terms and conditions.
          </motion.p>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-border/50"
          >
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Last Updated: February 18, 2026</span>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-y-2 border-yellow-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-yellow-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl sm:text-3xl text-primary mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Important Notice
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  This service is provided for lawful and legitimate purposes only. Users must comply with all applicable laws and regulations. Misuse of this service may result in legal consequences and immediate termination of access.
                </p>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm font-semibold text-yellow-800">
                    ⚠️ SIM Finder is NOT intended for collecting personally identifiable information (PII) or securing sensitive data. Use this service responsibly and ethically.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-muted/30 rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-lg">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 
                      className="text-2xl sm:text-3xl md:text-4xl text-primary"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 pl-0 sm:pl-18">
                  {section.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex}
                      className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-muted/20 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quick Reference Guide
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Essential do's and don'ts for using our service
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {importantNotes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-border/50 hover:border-accent/30 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1">
                  {note.icon}
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {note.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#7DB9BC] via-accent to-[#5A9EA1] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Questions or Concerns?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            If you have any questions about these terms or need clarification on our policies, please don't hesitate to contact our support team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="mailto:support@simfinder.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl group"
            >
              <span className="text-lg font-semibold">Contact Support</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/30 transition-all duration-300 border-2 border-white/50 group"
            >
              <span className="text-lg font-semibold">Call Us</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="relative py-12 bg-gray-50 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Jurisdiction & Governing Law
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions. Any disputes arising from these terms or use of the service shall be subject to the exclusive jurisdiction of the courts in the specified jurisdiction.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              © 2026 SIM Finder. All rights reserved. | Last Updated: February 18, 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
