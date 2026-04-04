import { getSiteUrl } from '@/lib/site-url';

export const SEO_SITE_NAME = 'SIM Finder';

export function getSeoIdentity() {
  const siteUrl = getSiteUrl();

  return {
    siteUrl,
    siteName: SEO_SITE_NAME,
    logoUrl: `${siteUrl}/icon-512.png`,
  };
}
