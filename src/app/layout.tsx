import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from '@/lib/site-url';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SIM Finder - Advanced SIM Tracking System',
    template: '%s | SIM Finder',
  },
  description: "Discover comprehensive information about any SIM card including live location tracking, CNIC details, owner information, and complete number analysis.",
  openGraph: {
    type: 'website',
    siteName: 'SIM Finder',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
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
