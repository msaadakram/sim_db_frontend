import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://simfinder.pk'),
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
