# shiplog

**Proof of work, not a portfolio.**

shiplog is [@priyanshshahh](https://github.com/priyanshshahh)'s Week 3 ("Vibe marketing")
submission to the [Hult Cohort Program](https://github.com/rogerSuperBuilderAlpha/hult-cohort-program),
Summer Pilot 2026 (cohort id `summer26`). It's the public-facing showcase / launchpad for the cohort:
Debut-dense launch board, GitHub-native `Vote: up` review CTAs, partner intro + RSVP,
PM pulse, and active contributors from the program repo.

**Live:** https://shiplog-snowy.vercel.app

**Official cohort ops:** https://cohorts.algorithmacy.org/dashboard

## For hiring partners

Start at [`/partners`](https://shiplog-snowy.vercel.app/partners). Request intros route to
`cohort@hult.edu`. RSVP for the end-of-pilot hiring showcase at
[`/rsvp`](https://shiplog-snowy.vercel.app/rsvp). Every builder profiled at
[`/cohort`](https://shiplog-snowy.vercel.app/cohort) links a merged pull request.

**Why partner with us?**
- **Proven execution:** live deploys, not repos alone
- **Rapid iteration:** weekly merge clock + public GitHub peer review
- **GitHub-native votes:** winners = most `Vote: up` in written review issues (no on-site ballots)

## How peers upvote (contest winners)

1. Open the peer's build repo (linked on each launch row / profile)
2. File issue `Review by @you: @peer`
3. Keep `### Vote: up` to upvote, or delete that section to abstain

Tallies are **never shown on this site** (program rule). Track progress on the
[official dashboard](https://cohorts.algorithmacy.org/dashboard).

## Why it looks the way it does

Terminal / GitHub-native aesthetic on purpose: liquid-glass nav, 3D page transitions,
Debut-style launch board (sort / search / micro-tags), social pulse of merges + reviews,
contributor wall from the program repo API. Inspired by Debut, OpenAI Showcase,
BuildNatively, RapidNative — without inventing metrics.

## Data

- Roster: merged Project 3 PRs on `rogerSuperBuilderAlpha/hult-cohort-program`
- Contributors: GitHub Contributors API (bots filtered)
- Stats: `https://cohorts.algorithmacy.org/api/cohort/stats` → enrolledCount 67
- PM pulse: read-only Keel snapshot (`src/data/pm.ts`)

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Auth.js (GitHub) · Neon Postgres · Vercel

## Local setup

```bash
git clone https://github.com/priyanshshahh/shiplog.git
cd shiplog
npm install
npm run dev   # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill:

- `DATABASE_URL` — Neon Postgres
- `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` — Sign in with GitHub
- Optional: `SYNC_SECRET`, `GITHUB_WEBHOOK_SECRET`, `BLOB_READ_WRITE_TOKEN`, `GITHUB_TOKEN`

Then: `npm run db:push` and `POST /api/sync` (or hourly cron) to GO LIVE from merged cohort PRs.

Optional: `PLACEMENT_LEAD_EMAIL` overrides the default `cohort@hult.edu` for intro/RSVP logs.

## Known limitations

- Intro/RSVP notify via server log (+ placement email address) until SMTP provider is wired
- Roster profiles builders with verified Project 3 PRs (+ privacy opt-out placeholder)
- Vote tallies intentionally absent on-site — GitHub is the ballot


## Member ownership + GO LIVE

- Static roster in `src/data/roster.ts` is the seed.
- Merged PRs on `projects/summer26/phase-1-project-{1,2,3}` sync into Postgres (`/api/sync`, `/api/webhooks/github`).
- Members sign in with GitHub at `/signin`, edit at `/me` (bio, privacy, taglines, tags, media order).
- Comments/replies are on-site social only. Contest `Vote: up` stays on GitHub.
