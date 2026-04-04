const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_SITE_URL = 'https://www.simownerdetail.app';
const PLACEHOLDER_HOSTS = new Set([
  'your-domain.com',
  'www.your-domain.com',
  'example.com',
  'www.example.com',
  'localhost',
]);

function isPlaceholderUrl(url) {
  try {
    const { hostname } = new URL(url);

    return (
      PLACEHOLDER_HOSTS.has(hostname.toLowerCase()) ||
      hostname.toLowerCase().endsWith('.example.com')
    );
  } catch {
    return true;
  }
}

function normalizeSiteUrl(url) {
  if (!url) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = String(url).trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  const withProtocol =
    trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;

  const normalized = withProtocol.replace(/\/+$/, '');

  if (isPlaceholderUrl(normalized)) {
    return DEFAULT_SITE_URL;
  }

  return normalized;
}

function getBlogSlugs() {
  const blogDataPath = path.join(process.cwd(), 'src', 'data', 'blogData.ts');

  if (!fs.existsSync(blogDataPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(blogDataPath, 'utf8');
  const matches = fileContents.matchAll(/slug:\s*'([^']+)'/g);

  return [...new Set(Array.from(matches, (match) => match[1]))];
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL
  ),
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/api/*', '/search*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search'],
      },
    ],
  },
  transform: async (siteConfig, pathName) => {
    const isHome = pathName === '/';
    const isBlogListing = pathName === '/blog';
    const isBlogPost = pathName.startsWith('/blog/') && !isBlogListing;

    return {
      loc: pathName,
      changefreq: isBlogPost ? 'weekly' : 'daily',
      priority: isHome ? 1.0 : isBlogListing ? 0.9 : isBlogPost ? 0.7 : 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: siteConfig.alternateRefs ?? [],
    };
  },
  additionalPaths: async (siteConfig) => {
    const blogSlugs = getBlogSlugs();

    return blogSlugs.map((slug) => ({
      loc: `/blog/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: siteConfig.alternateRefs ?? [],
    }));
  },
};

module.exports = config;