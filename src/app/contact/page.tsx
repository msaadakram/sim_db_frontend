import { Suspense, lazy } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { GlobalSearchCard } from '@/components/GlobalSearchCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getSiteUrl } from '@/lib/site-url';
import { SEO_SITE_NAME } from '@/lib/next-seo';
import { BreadcrumbJsonLd } from 'next-seo';

const SITE_URL = getSiteUrl();
const CONTACT_URL = `${SITE_URL}/contact`;

const CONTACT_DESCRIPTION =
  'Contact SIM OWNER DETAIL support for help with CNIC checks, SIM number verification workflows, technical issues, and partnership inquiries in Pakistan.';

const CONTACT_PAGE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SEO_SITE_NAME}`,
  url: CONTACT_URL,
  description: CONTACT_DESCRIPTION,
  mainEntity: {
    '@type': 'Organization',
    name: SEO_SITE_NAME,
    url: SITE_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@simownerdetail.app',
        telephone: '+92 300 1234567',
        areaServed: 'PK',
        availableLanguage: ['en', 'ur'],
      },
    ],
  },
} as const;

const CONTACT_FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does SIM OWNER DETAIL support reply?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Support inquiries are typically reviewed within one business day, with urgent verification-flow issues prioritized earlier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request help with CNIC and SIM verification workflows?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can contact support for guidance on practical CNIC-linked SIM checks, result interpretation, and safe next steps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer business partnerships or integrations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the partnerships email channel and include your use case, expected volume, and technical requirements for a faster response.',
      },
    },
  ],
} as const;

export const metadata: Metadata = {
  title: 'Contact SIM OWNER DETAIL | Support for SIM & CNIC Queries',
  description: CONTACT_DESCRIPTION,
  keywords: [
    'contact sim owner detail',
    'sim verification support pakistan',
    'cnic check help',
    'sim number verification support',
  ],
  alternates: {
    canonical: CONTACT_URL,
  },
  openGraph: {
    title: 'Contact SIM OWNER DETAIL | Support for SIM & CNIC Queries',
    description: CONTACT_DESCRIPTION,
    url: CONTACT_URL,
    siteName: SEO_SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact SIM OWNER DETAIL | Support Team',
    description:
      'Get support for SIM and CNIC verification workflows, technical issues, and business inquiries in Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Footer = lazy(() => import('@/components/Footer').then((m) => ({ default: m.Footer })));

function SectionLoader() {
  return (
    <div className="w-full min-h-[220px] flex items-center justify-center">
      <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        id="contact-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_JSON_LD) }}
      />
      <script
        id="contact-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_FAQ_JSON_LD) }}
      />

      <BreadcrumbJsonLd
        scriptId="breadcrumb-jsonld-contact"
        items={[
          { name: 'Home', item: SITE_URL },
          { name: 'Contact', item: CONTACT_URL },
        ]}
      />

      <Header />

      <main className="w-full">
        <div className="pt-16 sm:pt-20">
          <GlobalSearchCard className="pt-5 sm:pt-6 pb-5 sm:pb-7" />

          <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/30 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact SIM OWNER DETAIL
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Need help with SIM owner checks, CNIC verification workflows, or technical issues?
                  Reach our team through the channels below and include your query details for faster support.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <a
                  href="mailto:support@simownerdetail.app"
                  className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <h2 className="text-xl text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Support Email
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">General help, troubleshooting, and verification guidance.</p>
                  <p className="text-accent font-medium">support@simownerdetail.app</p>
                </a>

                <a
                  href="mailto:partnerships@simownerdetail.app"
                  className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <h2 className="text-xl text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Partnerships
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">Business collaboration, integrations, and enterprise workflows.</p>
                  <p className="text-accent font-medium">partnerships@simownerdetail.app</p>
                </a>

                <a
                  href="tel:+923001234567"
                  className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <h2 className="text-xl text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Phone Support
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">For urgent account and verification-flow issues.</p>
                  <p className="text-accent font-medium">+92 300 1234567</p>
                </a>
              </div>

              <div className="rounded-3xl border border-border/60 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl text-primary mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Before you contact us
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Include the exact page URL where you faced the issue.</li>
                  <li>• Mention whether your query is mobile-number or CNIC-related.</li>
                  <li>• Share relevant timestamps and non-sensitive screenshots.</li>
                  <li>• Never share OTPs, full CNIC images, or sensitive credentials.</li>
                </ul>
              </div>
            </div>
          </section>

          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}
