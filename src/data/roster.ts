// Real Summer Pilot 2026 (cohortId "summer26") data, sourced from merged GitHub PRs
// against rogerSuperBuilderAlpha/hult-cohort-program. No fabricated names, metrics,
// or URLs. "67" is enrolledCount (from the program's own /api/cohort/stats), not a
// cohort number. there is no "Cohort 67" designation anywhere in the program.
// Source of truth: submissions/*.md + PR bodies on the cohort repo.

export type Project = {
  id?: string;
  name: string;
  oneLiner: string;
  url: string;
  repo?: string;
  tags: [string, string];
  // Real screenshot captured live from `url` via Chrome DevTools, saved under
  // public/shots/. Not a stock image or mockup.
  shot?: string;
  media?: string[];
  fromMerge?: boolean;
  phase?: string;
  prUrl?: string;
};

// Importers: BuilderCard, CohortGrid, LaunchBoard, profile pages, partners forms
// User: "winner is by upvotes, and upvotes are received from review on github."
export type Builder = {
  handle: string;
  name?: string;
  isMe?: boolean;
  bio: string;
  location?: string;
  campus?: string;
  prUrl: string;
  /** Build repo where peers file Review issues + optional Vote: up */
  buildRepo?: string;
  privacy?: "public" | "private";
  projects: Project[];
  /** Optional override from member profile edit */
  avatarOverride?: string;
  claimed?: boolean;
};

export type ActivityEvent = {
  handle: string;
  project: string;
  action: "merged" | "opened";
  prNumber: number;
  url: string;
  at: string; // real ISO timestamp from `gh pr list --json mergedAt`
};

export function avatarUrl(handle: string, size = 64) {
  const s = Math.min(460, Math.max(32, Math.round(size * 2)));
  return `https://github.com/${handle}.png?size=${s}`;
}

export const cohortId = "summer26";
export const cohortLabel = "Summer Pilot 2026";
export const enrolledCount = 67;

// Real merge/open events pulled via `gh pr list --repo rogerSuperBuilderAlpha/hult-cohort-program
// --base projects/summer26/phase-1-project-3 --state all --json . mergedAt`. Sorted newest first.
export const activity: ActivityEvent[] = [
  { handle: "priyanshshahh", project: "shiplog", action: "opened", prNumber: 197, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/197", at: "2026-08-01T07:16:31Z" },
  { handle: "Studmuffin01", project: "Lighthouse", action: "merged", prNumber: 193, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/193", at: "2026-07-31T22:39:14Z" },
  { handle: "kureen-cyber", project: "Banterfolio", action: "merged", prNumber: 191, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/191", at: "2026-07-31T21:07:17Z" },
  { handle: "mitchelldante99-create", project: "Vibey", action: "merged", prNumber: 190, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/190", at: "2026-07-31T21:07:20Z" },
  { handle: "RamyaTolety", project: "Lighthouse", action: "merged", prNumber: 189, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/189", at: "2026-07-31T21:07:23Z" },
  { handle: "joes9987", project: "EudaMarket", action: "merged", prNumber: 187, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/187", at: "2026-07-31T21:07:27Z" },
  { handle: "r3s0lv343vr", project: "Pixie Dust Cheesecake", action: "merged", prNumber: 185, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/185", at: "2026-07-31T21:07:31Z" },
  { handle: "CodingWCal", project: "Cursor Boston Showcase", action: "merged", prNumber: 184, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/184", at: "2026-07-31T21:07:34Z" },
  { handle: "RAVEN-dubgub", project: "Showcase", action: "merged", prNumber: 183, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/183", at: "2026-07-31T21:07:37Z" },
  { handle: "priyanshshahh", project: "Cohort Comms", action: "merged", prNumber: 161, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/161", at: "2026-07-27T11:41:21Z" },
  { handle: "priyanshshahh", project: "Keel", action: "merged", prNumber: 66, url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/66", at: "2026-07-19T18:19:35Z" },
];

export const builders: Builder[] = [
  {
    handle: "priyanshshahh",
    name: "Priyansh Shah",
    isMe: true,
    bio: "Data scientist & blockchain developer. AI, NLP, and trading systems. Stony Brook AMS.",
    location: "New York, NY",
    campus: "boston",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/197",
    buildRepo: "https://github.com/priyanshshahh/shiplog",
    privacy: "public",
    projects: [
      {
        name: "shiplog",
        oneLiner:
          "Cohort vibe marketing roster with live deploys, partner intros, and GitHub review links.",
        url: "https://shiplog-snowy.vercel.app",
        repo: "https://github.com/priyanshshahh/shiplog",
        tags: ["vibe-marketing", "hiring-showcase"],
      },
      {
        name: "Keel",
        oneLiner:
          "PM platform built around shipping momentum, not points. Stand, Pulse, and a single highlighted next action instead of leaderboards.",
        url: "https://keel-pm.vercel.app",
        repo: "https://github.com/priyanshshahh/keel-pm",
        tags: ["productivity", "pm-tracking"],
        shot: "/shots/priyanshshahh-keel.jpg",
      },
      {
        name: "Cohort Comms",
        oneLiner:
          "Internal comms platform for the cohort. channels, SSE-live typing, and a webhook-driven activity feed.",
        url: "https://cohort-comms-phi.vercel.app",
        tags: ["internal-tools", "realtime-comms"],
        shot: "/shots/priyanshshahh-comms.jpg",
      },
    ],
  },
  {
    handle: "Studmuffin01",
    privacy: "public",
    buildRepo: "https://github.com/Studmuffin01",
    bio: "Builder of Lighthouse. a hiring-partner-facing showcase with a live activity feed and PM status snapshot.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/193",
    projects: [
      {
        name: "Lighthouse",
        oneLiner:
          "Hiring-partner homepage, project showcase, live activity feed, and developer profiles in a signal/night visual identity.",
        url: "https://lighthouse-studmuffin01.vercel.app",
        tags: ["partnerships", "hiring-showcase"],
        shot: "/shots/studmuffin01-lighthouse.jpg",
      },
    ],
  },
  {
    handle: "kureen-cyber",
    privacy: "public",
    buildRepo: "https://github.com/kureen-cyber/Banterfolio",
    bio: "Builder of Banterfolio. cohort dashboard with self-serve profiles, AI captions, and a social post scheduler.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/191",
    projects: [
      {
        name: "Banterfolio",
        oneLiner:
          "Weekly shipping narrative, self-serve creator profiles, AI captions, and a scheduler for partners.",
        url: "https://banterfolio.vercel.app/",
        repo: "https://github.com/kureen-cyber/Banterfolio",
        tags: ["creator-tools", "social-scheduling"],
        shot: "/shots/kureen-cyber-banterfolio.jpg",
      },
    ],
  },
  {
    handle: "mitchelldante99-create",
    name: "Dante Mitchell",
    privacy: "public",
    bio: "Builder of Vibey. a self-serve cohort wall with hand-drawn visual identity and passcode-protected profiles.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/190",
    projects: [
      {
        name: "Vibey",
        oneLiner:
          "Self-serve cohort wall. participants add their own profile and projects, no admin bottleneck.",
        url: "https://vibey-three.vercel.app/",
        tags: ["community", "self-serve-wall"],
        shot: "/shots/mitchelldante99-vibey.jpg",
      },
    ],
  },
  {
    handle: "RamyaTolety",
    privacy: "public",
    buildRepo: "https://github.com/RamyaTolety/lighthouse-ramyatolety",
    bio: "Builder of Lighthouse. a directory that parses the cohort repo's submissions/ directly from the GitHub API on every request.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/189",
    projects: [
      {
        name: "Lighthouse",
        oneLiner:
          "Zero-sync-job directory: fetches submissions/ from the GitHub Contents API on every request via ISR.",
        url: "https://lighthouse-ramyatolety.vercel.app",
        repo: "https://github.com/RamyaTolety/lighthouse-ramyatolety",
        tags: ["infra", "auto-sync-directory"],
        shot: "/shots/ramyatolety-lighthouse.jpg",
      },
    ],
  },
  {
    handle: "joes9987",
    name: "Joseph Singh",
    privacy: "public",
    buildRepo: "https://github.com/joes9987/showcase-joes9987",
    bio: "Builder of EudaMarket. a partner-facing showcase connected to a suite of cohort tools (EudaPM/EudaChat).",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/187",
    projects: [
      {
        name: "EudaMarket",
        oneLiner:
          "Roster profiles, PM status snapshot, partner intro + RSVP, and a connected suite account.",
        url: "https://showcase-joes9987.vercel.app",
        repo: "https://github.com/joes9987/showcase-joes9987",
        tags: ["partnerships", "suite-integration"],
        shot: "/shots/joes9987-eudamarket.jpg",
      },
    ],
  },
  {
    handle: "r3s0lv343vr",
    privacy: "public",
    buildRepo: "https://github.com/r3s0lv343vr/vibe-marketing-platform",
    bio: "Builder of Pixie Dust Cheesecake. a brand-first showcase with a conversational AI Brand Designer studio.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/185",
    projects: [
      {
        name: "Pixie Dust Cheesecake",
        oneLiner:
          "Cohort profiles, partner intro flow, PM status snapshot, and an AI Brand Designer studio.",
        url: "https://pixie-dust-cheesecake.vercel.app",
        repo: "https://github.com/r3s0lv343vr/vibe-marketing-platform",
        tags: ["branding", "ai-studio"],
        shot: "/shots/r3s0lv343vr-pixiedust.jpg",
      },
    ],
  },
  {
    handle: "CodingWCal",
    name: "Calvin V.",
    privacy: "public",
    buildRepo: "https://github.com/CodingWCal/cursor-boston-showcase",
    bio: "Builder of the Cursor Boston × Hult showcase. an editorial marketing surface with full admin CRUD.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/184",
    projects: [
      {
        name: "Cursor Boston Showcase",
        oneLiner:
          "Curated editorial marketing surface. project gallery, member directory, GitHub OAuth admin CRUD.",
        url: "https://cursor-boston-showcase.vercel.app",
        repo: "https://github.com/CodingWCal/cursor-boston-showcase",
        tags: ["editorial", "admin-cms"],
        shot: "/shots/codingwcal-cursorboston.jpg",
      },
    ],
  },
  {
    handle: "RAVEN-dubgub",
    privacy: "public",
    buildRepo: "https://github.com/RAVEN-dubgub/showcase-raven-dubgub",
    bio: 'Builder of a showcase positioned on one idea: "Don\'t trust our word. inspect their GitHub."',
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/183",
    projects: [
      {
        name: "Showcase",
        oneLiner:
          "Student profiles, live PM status integration, and a partner intro + RSVP flow.",
        url: "https://showcase-raven-dubgub.vercel.app",
        repo: "https://github.com/RAVEN-dubgub/showcase-raven-dubgub",
        tags: ["transparency", "live-status"],
        shot: "/shots/raven-dubgub-showcase.jpg",
      },
    ],
  },

  {
    handle: "opt-out-placeholder",
    name: "Private builder",
    privacy: "private",
    bio: "This participant opted out of the public hiring showcase. Profile details are withheld.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program",
    projects: [
      {
        name: "Private",
        oneLiner: "Opted out of public marketing surface. still enrolled in Summer Pilot 2026.",
        url: "https://cohorts.algorithmacy.org/privacy",
        tags: ["privacy", "opt-out"],
      },
    ],
  },
];

export const myBuilder = builders.find((b) => b.isMe)!;
