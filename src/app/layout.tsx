import type { Metadata } from 'next';
import './globals.css';
import { getSiteUrl, getCanonicalUrl } from '@/lib/site-url';

const SITE_URL = getSiteUrl();
const CANONICAL_URL = getCanonicalUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Official PTA SIM Verification Guide Pakistan',
    template: '%s | PTA SIM Guide',
  },
  description:
    'Learn official PTA methods, the 668 SIM verification guide, SIM registration laws, fraud reporting steps, and legal telecom education for Pakistan.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  verification: {
    google: 'OKsQOE0_msEJg2uxDRX_-2z9ec2YQCZxhc4XQwDz5kQ',
  },
  openGraph: {
    type: 'website',
    siteName: 'PTA SIM Guide',
    locale: 'en_US',
    title: 'Official PTA SIM Verification Guide Pakistan',
    description:
      'Educational guides on official PTA SIM verification, 668 method usage, telecom laws, and legal fraud prevention in Pakistan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official PTA SIM Verification Guide Pakistan',
    description:
      'Learn the official PTA 668 method, SIM registration rules, and legal verification steps for Pakistan.',
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
