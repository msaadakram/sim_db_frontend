import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { getSiteUrl } from '@/lib/site-url';
import { OrganizationJsonLd } from 'next-seo';
import { SEO_SITE_NAME, getSeoIdentity } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();
const SEO_IDENTITY = getSeoIdentity();
const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb7eGJN1NCrSvQXX0L3g';
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SEO_IDENTITY.siteName,
  url: SEO_IDENTITY.siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?query={search_term_string}&type=mobile`,
    'query-input': 'required name=search_term_string',
  },
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SIM Owner Details Check Pakistan | CNIC & Number Lookup',
    template: '%s | SIM OWNER DETAIL',
  },
  description:
    'Check SIM owner details in Pakistan with secure CNIC and number lookup workflows. Verify linked SIM records quickly using legal, privacy-safe methods.',
  keywords: [
    'sim owner details',
    'sim details check pakistan',
    'cnic verification',
    'sim number check',
    'sim owner details by number',
    'sim owner details online check',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SEO_SITE_NAME,
    locale: 'en_US',
    title: 'SIM Owner Details Check Pakistan | CNIC & Number Lookup',
    description:
      'Securely verify SIM owner details, CNIC-linked records, and mobile number information in Pakistan using practical and legal workflows.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIM Owner Details Check Pakistan | SIM OWNER DETAIL',
    description: 'Verify SIM owner details and CNIC-linked mobile records in Pakistan with privacy-safe, practical lookup guidance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Telecommunications',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <OrganizationJsonLd
          scriptId="organization-jsonld"
          name={SEO_IDENTITY.siteName}
          url={SEO_IDENTITY.siteUrl}
          logo={SEO_IDENTITY.logoUrl}
          contactPoint={{
            contactType: 'customer support',
            telephone: '+92 300 1234567',
            email: 'info@simownerdetail.app',
          }}
          address={{
            streetAddress: 'Karachi, Pakistan',
            addressLocality: 'Karachi',
            addressCountry: 'PK',
          }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        {children}
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join our WhatsApp channel"
          className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m8 8-4.35-2.49A9 9 0 1 1 21 12c0 1.64-.44 3.18-1.21 4.5L21 22Z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp Channel</span>
          <span className="sm:hidden">Channel</span>
        </a>
        <Analytics />
      </body>
    </html>
  );
}
