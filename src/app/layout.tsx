import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from '@/lib/site-url';
import { SIM_OWNER_SEO_KEYWORDS, getKeywordSentence } from '@/lib/seo-keywords';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SIM Finder Pakistan - SIM Details Check & CNIC Owner Details',
    template: '%s | SIM Finder',
  },
  description:
    'SIM Finder helps you perform SIM details check in Pakistan, including sim owner details pakistan, sim data check, sim details by number, pta sim check, and mobile number details pakistan with fast and secure results.',
  keywords: [...SIM_OWNER_SEO_KEYWORDS],
  openGraph: {
    type: 'website',
    siteName: 'SIM Finder',
    locale: 'en_US',
    title: 'SIM Finder Pakistan - SIM Details Check & CNIC Owner Details',
    description:
      `Check SIM details, SIM owner details, and CNIC-linked mobile information in Pakistan with fast online lookup tools: ${getKeywordSentence(0, 10)}.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIM Finder Pakistan - SIM Details Check',
    description: `Pakistan SIM details check and SIM owner verification in one place: ${getKeywordSentence(10, 8)}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
      </body>
    </html>
  );
}
