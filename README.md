# SIM Finder (Next.js)

Production-ready Next.js app with local blog content and MongoDB-backed view tracking API.

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

- `MONGODB_URI` (required): MongoDB connection string used by `/api/views`.
- `MONGODB_DB_NAME` (recommended): Target MongoDB database used by the app. Default is `sim-finder`.
- `MONGODB_SOURCE_DB_NAME` (optional): Source DB for one-time migration to `MONGODB_DB_NAME` (default fallback: `blog_views`).
- `NEXT_PUBLIC_SITE_URL` (recommended): Full site URL used for canonical, sitemap, and robots metadata.

## Database setup and migration

- The app now resolves MongoDB connection to `MONGODB_DB_NAME` (default: `sim-finder`).
- If your existing active view data is in another DB (for example `blog_views`), migrate it with:
   - `npm run migrate:active-db`

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
