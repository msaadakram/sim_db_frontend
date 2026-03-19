# SIM Finder (Next.js)

Production-ready Next.js app with Sanity CMS content and MongoDB-backed view tracking API.

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local env file:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local` values.

4. Run the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Environment Variables

Use these variables locally and in Vercel:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (required): Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET` (required): Sanity dataset, usually `production`.
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional): Sanity API version. Default is `2026-02-19`.
- `MONGODB_URI` (required): MongoDB connection string used by `/api/views`.
- `NEXT_PUBLIC_SITE_URL` (recommended): Full site URL used for canonical, sitemap, and robots metadata.

If `NEXT_PUBLIC_SITE_URL` is not set, the app automatically falls back to Vercel URL envs in this order:

1. `VERCEL_PROJECT_PRODUCTION_URL`
2. `VERCEL_URL`
3. `http://localhost:3000` (local fallback)

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. In Vercel project settings, add the environment variables above for:
   - Production
   - Preview
   - Development (optional if you use local `.env.local`)
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (for example, `https://yourdomain.com`).
5. Deploy.

## Verify Before Deploying

```bash
npm run build
```

The build must pass before deployment.
