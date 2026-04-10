import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { getSiteUrl } from '@/lib/site-url';
import { OrganizationJsonLd } from 'next-seo';
import { SEO_SITE_NAME, getSeoIdentity } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();
const SEO_IDENTITY = getSeoIdentity();
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
    template: '%s | SIM Finder',
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
    title: 'SIM Owner Details Check Pakistan | SIM Finder',
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
            email: 'info@simfinder.com',
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
        <Analytics />
      </body>
    </html>
  );
}
