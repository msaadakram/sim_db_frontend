import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { getSiteUrl } from '@/lib/site-url';
import { buildPageSeoTitle, getKeywordSentence, getPageKeywordSet } from '@/lib/seo-keywords';
import { OrganizationJsonLd } from 'next-seo';
import { SEO_SITE_NAME, getSeoIdentity } from '@/lib/next-seo';

const SITE_URL = getSiteUrl();
const SEO_IDENTITY = getSeoIdentity();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: buildPageSeoTitle(
      'SIM Details Check Pakistan, SIM Owner Details & CNIC Check',
      'home',
      3,
      96
    ),
    template: '%s | sim owner details online check',
  },
  description:
    `SIM Finder helps you perform SIM details checks in Pakistan with practical CNIC-linked verification workflows. High-demand intents from your keyword dataset include: ${getKeywordSentence(0, 8)}.`,
  keywords: getPageKeywordSet('home', 42),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SEO_SITE_NAME,
    locale: 'en_US',
    title: buildPageSeoTitle(
      'SIM Details Check Pakistan, SIM Owner Details & CNIC Check',
      'home',
      3,
      96
    ),
    description:
      `Check SIM owner and number verification workflows in Pakistan with terms from your latest search dataset: ${getKeywordSentence(8, 10)}.`,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: buildPageSeoTitle('SIM Details Check Pakistan, SIM Owner Verification', 'home', 2, 90),
    description: `Pakistan SIM details check and CNIC-linked verification coverage: ${getKeywordSentence(18, 8)}.`,
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
