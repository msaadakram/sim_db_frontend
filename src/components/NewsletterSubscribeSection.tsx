'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface NewsletterSubscribeSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSubscribeSection({
  title = 'Stay Updated with Latest Insights',
  description = 'Subscribe to our newsletter and never miss an article',
  className = '',
}: NewsletterSubscribeSectionProps) {
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subscriptionError, setSubscriptionError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleSubscribe = async () => {
    const email = subscriberEmail.trim().toLowerCase();
    setSubscriptionMessage('');
    setSubscriptionError('');

    if (!email) {
      setSubscriptionError('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(email)) {
      setSubscriptionError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubscribing(true);

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubscriptionError(data?.error || 'Unable to subscribe right now.');
        return;
      }

      setSubscriptionMessage(data?.message || 'Subscribed successfully.');
      setSubscriberEmail('');
    } catch {
      setSubscriptionError('Network issue. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className={`relative py-12 sm:py-16 md:py-20 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#7DB9BC] via-accent to-[#5A9EA1]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 px-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
          {description}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={subscriberEmail}
            onChange={(e) => {
              setSubscriberEmail(e.target.value);
              if (subscriptionError) setSubscriptionError('');
              if (subscriptionMessage) setSubscriptionMessage('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void handleSubscribe();
              }
            }}
            disabled={isSubscribing}
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full sm:rounded-2xl outline-none text-sm sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              void handleSubscribe();
            }}
            disabled={isSubscribing}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-3xl text-sm sm:text-base font-semibold whitespace-nowrap"
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
          </motion.button>
        </motion.div>

        {(subscriptionError || subscriptionMessage) && (
          <div className="mt-4 min-h-6">
            {subscriptionError ? (
              <p className="text-red-100 text-sm sm:text-base">{subscriptionError}</p>
            ) : (
              <p className="text-white text-sm sm:text-base">{subscriptionMessage}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
