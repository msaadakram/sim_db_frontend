import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { getHomepageBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';
import { SEO_SITE_NAME } from '@/lib/next-seo';

export const revalidate = 60;

const SITE_URL = getSiteUrl();
const HOME_FAQ_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How can I check SIMs linked to my CNIC in Pakistan?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use official CNIC-linked verification workflows and operator channels to confirm how many SIM records are associated with your identity.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is SIM owner detail verification legal in Pakistan?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, when performed for authorized and legitimate purposes using official, privacy-safe channels and compliant workflows.',
            },
        },
        {
            '@type': 'Question',
            name: 'What should I do if unknown SIM records appear?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Document the mismatch, contact the relevant operator through official support, and complete required verification steps to resolve unauthorized entries.',
            },
        },
    ],
} as const;

export const metadata: Metadata = {
    title: 'SIM Owner Details Check Pakistan | CNIC & Number Lookup',
    description:
        'Check SIM owner details in Pakistan with secure CNIC and number lookup workflows. Verify linked SIM records fast and follow legal, privacy-safe steps.',
    keywords: [
        'sim owner details',
        'sim details check pakistan',
        'sim owner details by number',
        'sim owner details online check',
        'cnic verification',
        'sim number check',
    ],
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        title: 'SIM Owner Details Check Pakistan | CNIC & Number Lookup',
        description: 'Securely verify SIM owner details, CNIC-linked records, and mobile number information in Pakistan using practical legal workflows.',
        url: SITE_URL,
        siteName: SEO_SITE_NAME,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SIM Owner Details Check Pakistan | SIM OWNER DETAIL',
        description: 'Practical SIM and CNIC verification guidance for privacy-safe number checks in Pakistan.',
    },
};

export default async function Page() {
    const blogPosts = getHomepageBlogPosts(6);

    return (
        <>
            <script
                id="faq-jsonld-home"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_JSON_LD) }}
            />
            <HomeContent blogPosts={blogPosts} />
        </>
    );
}
