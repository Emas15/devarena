# DevArena

Personalized tech knowledge hub — aggregate engineering articles, Reddit discussions, and YouTube tutorials, publish your own blogs, and follow structured career roadmaps from one dashboard.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase Auth (Google OAuth) + PostgreSQL + RLS
- Modular content adapters (DEV, Hashnode, Hacker News, Medium RSS, Substack RSS, Reddit, YouTube)
- TipTap blog editor
- Vercel Cron-compatible sync (`/api/cron/sync`)

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server sync / seeding |
| `NEXT_PUBLIC_APP_URL` | Yes | e.g. `http://localhost:3000` |
| `CRON_SECRET` | Recommended | Protects cron + seed endpoints |
| `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET` | For Reddit | [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) |
| `YOUTUBE_API_KEY` | For YouTube | Google Cloud YouTube Data API v3 |
| `MEDIUM_TAG_FEEDS` | Optional | Comma-separated Medium RSS URLs |
| `SUBSTACK_FEEDS` | Optional | Comma-separated Substack RSS URLs |

3. **Supabase database**

In the Supabase SQL editor, run in order:

- `supabase/migrations/001_initial.sql`
- `supabase/migrations/002_seed_catalog.sql`

4. **Google OAuth**

- Supabase Dashboard → Authentication → Providers → Google
- Add redirect URL: `http://localhost:3000/auth/callback` (and production URL)

5. **Seed roadmaps**

```bash
curl -X POST http://localhost:3000/api/admin/seed-roadmaps \
  -H "Authorization: Bearer $CRON_SECRET"
```

6. **Run**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content sync

- Manual: use **Refresh feed** in the app (calls `POST /api/sync`)
- Scheduled: Vercel Cron hits `GET/POST /api/cron/sync` every 30 minutes (`vercel.json`)
- Missing Reddit/YouTube keys degrade gracefully with clear empty states — never fake content

## Content policy

- Medium/Substack: RSS metadata + permitted previews only; paywalled items link out
- YouTube: discovery cards open on YouTube (no redistribution)
- Reddit: official API when credentials are present

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Architecture notes

- Adapters live in `src/lib/adapters/` and normalize into `content_items`
- Ranking in `src/lib/recommendations/rank.ts` balances relevance, freshness, and diversity
- Roadmap seeds in `src/lib/roadmaps/seed/` use real documentation/course URLs only
