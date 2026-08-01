# shiplog

**Proof of work, not a portfolio.**

shiplog is [@priyanshshahh](https://github.com/priyanshshahh)'s Week 3 ("Vibe marketing")
submission to the [Hult Cohort Program](https://github.com/rogerSuperBuilderAlpha/hult-cohort-program),
Summer Pilot 2026, Cohort 67. It's the public-facing showcase site for the cohort:
participant profiles, real shipped projects, and a partner-facing narrative — every
link on it points at a merged GitHub pull request and a live production deploy.

**Live:** https://shiplog-snowy.vercel.app

## For hiring partners

Start at [`/partners`](https://shiplog-snowy.vercel.app/partners). Every builder
profiled at [`/cohort`](https://shiplog-snowy.vercel.app/cohort) has a merged pull
request you can read directly — this isn't self-reported metrics, it's the same
repository the whole cohort ships against.

## Why it looks the way it does

The design leans into a terminal / GitHub-native aesthetic on purpose: this cohort's
entire submission and review process runs through pull requests and issues, so the
site's visual language (monospace labels, a single accent color, hover states that
reveal the deploy/repo/PR links rather than hide them) is meant to reinforce
"inspectable," not just "energetic."

## Data

All roster data in [`src/data/roster.ts`](src/data/roster.ts) is sourced directly
from merged PR bodies on `rogerSuperBuilderAlpha/hult-cohort-program` (PRs #66, #161,
#183–193) — no placeholder names, fabricated metrics, or invented URLs. The roster
currently profiles the 8 peers with merged Project 3 submissions plus the author;
`enrolledCount` (67) comes from the program's own public
[`/api/cohort/stats`](https://site-nine-rouge-68.vercel.app/api/cohort/stats)
endpoint.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Framer Motion ·
deployed on Vercel.

## Local setup

```bash
git clone https://github.com/priyanshshahh/shiplog.git
cd shiplog
npm install
npm run dev   # http://localhost:3000
```

No environment variables or backend credentials are required — all data is static
and checked into `src/data/roster.ts`.

## Known limitations

- Roster only includes builders with a verified merged PR for this project week;
  the rest of Cohort 67 (67 enrolled total) isn't individually profiled yet.
- No self-serve claim flow or auth — by design, to ship reliably inside the review
  window rather than stand up new backend infrastructure under deadline.

## Agent usage

Built with Claude Code: researched the cohort repo (`AGENTS.md`, `content/program.ts`,
governance docs) and all 8 competing Project 3 submissions via the GitHub API before
writing any code, to ground every data point in a real, verifiable source.
