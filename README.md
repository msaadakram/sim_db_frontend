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
- `SEARCH_API_BASE_URL` (required for search): Base URL of backend API (for example `https://sim-db-backend.vercel.app`).
- `SHORTLINK_SETTINGS_API_URL` (optional but recommended): URL of admin public gate settings endpoint (for example `https://your-admin-domain/api/public/website-gate-settings`).
- `SHORTLINK_GATE_ENABLED` (optional): Enable website-only short-link gate after free searches.
- `SHORTLINK_GATE_FREE_QUERIES` (optional): Number of free searches before short-link redirect starts (default `3`).
- `SHORTLINK_GATE_RESET_WINDOW_MINUTES` (optional fallback): Resets free-search quota after this many minutes when settings API is unavailable (default `1440`).
- `SHORTLINK_UNLOCK_SECRET` (required when gate enabled): Secret used to verify short-link return tokens.
- `SHORTLINK_REDIRECT_BASE_URL` (recommended): Public URL used as short-link destination base (helps providers reject neither localhost nor private URLs).
- `SHORTLINK_CUTY_API_KEY`, `SHORTLINK_EXE_API_KEY`, `SHORTLINK_GPLINKS_API_KEY`, `SHORTLINK_SHRINKEARN_API_KEY`: API keys for short-link providers.
- `NEXT_PUBLIC_MONETAG_SCRIPT_SRC` (optional): Monetag script source URL (default `https://quge5.com/88/tag.min.js`).
- `NEXT_PUBLIC_MONETAG_POPUNDER_ZONE_ID` (recommended): Monetag zone ID used for popunder/on-click ads on the search results page.
- `NEXT_PUBLIC_MONETAG_BANNER_ZONE_ID` (optional but recommended): Monetag zone ID used for banner placement on the search results page.
- `NEXT_PUBLIC_POPADS_ANDROID_DIRECT_URL` (optional): Exact PopAds direct-link URL used on trusted Android taps only; do not use shorteners or redirect wrappers.
- `NEXT_PUBLIC_MONETAG_ANDROID_DIRECT_URL` (optional): Exact Monetag direct-link URL for Android sponsor tap flow.
- `NEXT_PUBLIC_PROFITABLECPM_ANDROID_DIRECT_URL` (optional): ProfitableCPM direct-link URL used for Android sponsor tap flow.
- `NEXT_PUBLIC_ADSTERRA_ANDROID_DIRECT_URL` (legacy alias): Backward-compatible Android direct-link variable still supported in code.
- `NEXT_PUBLIC_SITE_URL` (recommended): Full site URL used for canonical, sitemap, and robots metadata.

## Website-only short-link search gate

- Search flow is enforced in the website route `/api/website-search` (frontend app), not in backend `/api/search`.
- Direct backend API calls are not blocked by this website gate.
- Flow:
   1. Searches 1-3: direct output
   2. Search 4: Cuty
   3. Search 5: Exe
   4. Search 6: GPLinks
   5. Search 7: ShrinkEarn
   6. Search 8+: repeat from Cuty

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
