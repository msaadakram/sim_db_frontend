'use client';

import { lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { LazySection } from '@/components/LazySection';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BlogSection } from '@/components/BlogSection';
import { NewsletterSubscribeSection } from '@/components/NewsletterSubscribeSection';
import { useRouter } from 'next/navigation';

// Lazy load components
const FeaturesSection = lazy(() => import('@/components/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const AppDownloadSection = lazy(() => import('@/components/AppDownloadSection').then(m => ({ default: m.AppDownloadSection })));
const ServiceSection = lazy(() => import('@/components/ServiceSection').then(m => ({ default: m.ServiceSection })));
const HowItWorksSection = lazy(() => import('@/components/HowItWorksSection').then(m => ({ default: m.HowItWorksSection })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const DisclaimerSection = lazy(() => import('@/components/DisclaimerSection').then(m => ({ default: m.DisclaimerSection })));
const CTASection = lazy(() => import('@/components/CTASection').then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

// Loading fallback component
function SectionLoader() {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
    );
}

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

interface HomeContentProps {
    blogPosts: BlogPost[];
}

export function HomeContent({ blogPosts }: HomeContentProps) {
    const router = useRouter();

    const handleSearch = (query: string, type: 'mobile' | 'cnic') => {
        router.push(`/search?query=${encodeURIComponent(query)}&type=${type}`);
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <main className="w-full">
                <HeroSection onSearch={handleSearch} />

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <AppDownloadSection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <FeaturesSection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <ServiceSection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <HowItWorksSection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <TestimonialsSection />
                    </LazySection>
                </Suspense>

                <BlogSection initialPosts={blogPosts} />

                <NewsletterSubscribeSection
                    title="Get Pakistan SIM Check Updates"
                    description="Receive the latest guides on SIM details check, SIM owner details, CNIC verification, and mobile number security in Pakistan."
                />

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <DisclaimerSection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LazySection>
                        <CTASection />
                    </LazySection>
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <Footer />
                </Suspense>
            </main>
            <ScrollToTop />
        </div>
    );
}
