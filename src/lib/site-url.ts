const DEFAULT_LOCAL_SITE_URL = 'http://localhost:3000';

function normalizeUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, '');
}

export function getSiteUrl(): string {
  const explicitSiteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? '');
  if (explicitSiteUrl) {
    return explicitSiteUrl;
  }

  const vercelProductionUrl = normalizeUrl(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ''
  );
  if (vercelProductionUrl) {
    return vercelProductionUrl;
  }

  const vercelPreviewUrl = normalizeUrl(process.env.VERCEL_URL ?? '');
  if (vercelPreviewUrl) {
    return vercelPreviewUrl;
  }

  return DEFAULT_LOCAL_SITE_URL;
}
