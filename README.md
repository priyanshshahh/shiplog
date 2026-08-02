# shiplog

**Proof of work, not a portfolio.**

Public vibe marketing platform for the [Hult Cohort Developer Program](https://github.com/rogerSuperBuilderAlpha/hult-cohort-program) · Summer Pilot 2026 (`summer26`) · Week 3 submission by [@priyanshshahh](https://github.com/priyanshshahh).

| | |
|---|---|
| **Live** | https://shiplog-snowy.vercel.app |
| **Build repo** | https://github.com/priyanshshahh/shiplog |
| **Cohort ops** | https://cohorts.algorithmacy.org/dashboard |
| **Placement** | cohort@hult.edu |

---

## What to review (5 minutes)

1. **Homepage** — https://shiplog-snowy.vercel.app — hero, stats, activity ticker, ship cards, PM pulse, contributors  
2. **Roster** — https://shiplog-snowy.vercel.app/cohort — search / facet filters, open 2–3 profiles  
3. **Sample profiles**
   - https://shiplog-snowy.vercel.app/cohort/priyanshshahh  
   - https://shiplog-snowy.vercel.app/cohort/RamyaTolety  
   - https://shiplog-snowy.vercel.app/cohort/CodingWCal  
4. **Partners** — https://shiplog-snowy.vercel.app/partners — request intro  
5. **Status** — https://shiplog-snowy.vercel.app/status — PM snapshot  
6. **RSVP** — https://shiplog-snowy.vercel.app/rsvp  
7. **Claim / edit** — Sign in with GitHub → https://shiplog-snowy.vercel.app/me  
8. **Ballot** — leave a GitHub review on this repo (optional `Vote: up`). Tallies are **not** shown on-site.

---

## Features

### Public marketing surface
- Homepage narrative + enrolled/roster/deploy stats  
- Live activity ticker (merge / open events from the cohort repo)  
- Builder cards with optimized screenshots (next/image, AVIF/WebP)  
- Full roster with search + facets (`all` / `showcase` / `tools` / `infra`)  
- Per-builder profiles: bio, avatar, GitHub, ships, deploy / source / PR links  
- Privacy opt-out (private profiles withheld)  
- Contributor wall from the program repo  
- Light / dark theme  
- SEO + Open Graph metadata  
- HTTPS on Vercel  

### Member ownership (GitHub OAuth)
- Sign in at `/signin` · identity = GitHub handle  
- Edit profile at `/me`: name, bio, location, campus, privacy, build repo  
- Edit ships: tagline, tags, media order, screenshots  
- Add manual ships; merge-sourced deploy URLs stay locked as evidence  
- Screenshot upload → resized WebP via sharp → Vercel Blob  

### GO LIVE from merges
- Merged PRs on `projects/summer26/phase-1-project-{1,2,3}` sync into Postgres  
- Endpoints: `POST /api/sync` (cron + secret) · `POST /api/webhooks/github`  
- Seed roster + weeks 1–3 ships appear on profiles automatically  

### Social layer (not the contest ballot)
- Comments + replies on profiles and projects  
- Peer contest votes stay on GitHub (`Vote: up` in review issues only)  

### Partners / hiring
- `/partners` — hire / sponsor / mentor narrative  
- Request intro form → placement lead (`cohort@hult.edu`)  
- Prefill via `?with=handle`  
- `/rsvp` for end-of-pilot hiring showcase  

### Cohort ops
- `/status` — read-only PM pulse (Keel snapshot)  
- Nav: roster · cohort · status · partners · sign in  

---

## How peers vote (program rule)

1. Open this build repo (or the peer’s linked build repo on their profile)  
2. File issue: `Review by @you: @priyanshshahh`  
3. Keep `### Vote: up` to upvote, or delete that section to abstain  

No on-site tallies. Official progress: [dashboard](https://cohorts.algorithmacy.org/dashboard).

---

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Auth.js (GitHub) · Neon Postgres (Drizzle) · Vercel Blob · Vercel

---

## Local setup

```bash
git clone https://github.com/priyanshshahh/shiplog.git
cd shiplog
cp .env.example .env.local   # fill DATABASE_URL + AUTH_* at minimum
npm install
npm run db:push              # when DATABASE_URL is set
npm run build
npm run dev                  # http://localhost:3000
```

### Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | for edits / sync / comments | Neon Postgres |
| `AUTH_SECRET` | for sign-in | Auth.js secret |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | for sign-in | GitHub OAuth App |
| `AUTH_URL` | prod | e.g. `https://shiplog-snowy.vercel.app` |
| `BLOB_READ_WRITE_TOKEN` | for screenshots | Vercel Blob |
| `SYNC_SECRET` | recommended | Protect `/api/sync` |
| `GITHUB_WEBHOOK_SECRET` | optional | Webhook HMAC |
| `GITHUB_TOKEN` | optional | Higher GitHub API rate limits |
| `PLACEMENT_LEAD_EMAIL` | optional | Override `cohort@hult.edu` |

OAuth callback URL: `https://<host>/api/auth/callback/github`

After DB is up: `POST /api/sync` (with `Authorization: Bearer $SYNC_SECRET` if set) to import merged ships.

---

## Architecture notes

- Static seed: `src/data/roster.ts` (hand-verified ships)  
- Runtime overlay: Neon `members` / `projects` / `comments` / `sync_events`  
- Merge sync: `src/lib/github-sync.ts`  
- Public pages degrade to seed if `DATABASE_URL` is unset  

---

## Known limitations

- Intro / RSVP are validated and logged server-side (placement email in payload); SMTP not wired yet  
- GitHub avatar CDN cache TTL is outside our control  
- Contest winners = most public `Vote: up` in review issues — never shown as on-site tallies  
- `67` is **enrolledCount**, not a cohort name  

---

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing home |
| `/cohort` | Full roster |
| `/cohort/[handle]` | Builder profile + comments |
| `/me` | Edit profile / ships (auth) |
| `/signin` | GitHub OAuth |
| `/partners` | Partner pitch + intro form |
| `/rsvp` | Hiring showcase RSVP |
| `/status` | PM pulse |
| `/api/sync` | Merge backfill |
| `/api/webhooks/github` | Merge webhook |
