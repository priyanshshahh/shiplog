// Real Cohort 67 (Summer Pilot 2026) data, sourced from merged GitHub PRs against
// rogerSuperBuilderAlpha/hult-cohort-program. No fabricated names, metrics, or URLs.
// Source of truth: submissions/*.md + PR bodies on the cohort repo.

export type Project = {
  name: string;
  oneLiner: string;
  url: string;
  repo?: string;
  tags: [string, string];
};

export type Builder = {
  handle: string;
  name?: string;
  isMe?: boolean;
  bio: string;
  location?: string;
  prUrl: string;
  projects: Project[];
};

export const cohortId = "summer26";
export const cohortLabel = "Cohort 67";
export const enrolledCount = 67;

export const builders: Builder[] = [
  {
    handle: "priyanshshahh",
    name: "Priyansh Shah",
    isMe: true,
    bio: "Data scientist & blockchain developer — AI, NLP, and trading systems. Stony Brook AMS.",
    location: "New York, NY",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/66",
    projects: [
      {
        name: "Keel",
        oneLiner:
          "PM platform built around shipping momentum, not points — Stand, Pulse, and a single highlighted next action instead of leaderboards.",
        url: "https://keel-pm.vercel.app",
        repo: "https://github.com/priyanshshahh/keel-pm",
        tags: ["productivity", "pm-tracking"],
      },
      {
        name: "Cohort Comms",
        oneLiner:
          "Internal comms platform for the cohort — channels, SSE-live typing, and a webhook-driven activity feed.",
        url: "https://cohort-comms-phi.vercel.app",
        tags: ["internal-tools", "realtime-comms"],
      },
    ],
  },
  {
    handle: "Studmuffin01",
    bio: "Builder of Lighthouse — a hiring-partner-facing showcase with a live activity feed and PM status snapshot.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/193",
    projects: [
      {
        name: "Lighthouse",
        oneLiner:
          "Hiring-partner homepage, project showcase, live activity feed, and developer profiles in a signal/night visual identity.",
        url: "https://lighthouse-studmuffin01.vercel.app",
        tags: ["partnerships", "hiring-showcase"],
      },
    ],
  },
  {
    handle: "kureen-cyber",
    bio: "Builder of Banterfolio — cohort dashboard with self-serve profiles, AI captions, and a social post scheduler.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/191",
    projects: [
      {
        name: "Banterfolio",
        oneLiner:
          "Weekly shipping narrative, self-serve creator profiles, AI captions, and a scheduler for partners.",
        url: "https://banterfolio.vercel.app/",
        repo: "https://github.com/kureen-cyber/Banterfolio",
        tags: ["creator-tools", "social-scheduling"],
      },
    ],
  },
  {
    handle: "mitchelldante99-create",
    name: "Dante Mitchell",
    bio: "Builder of Vibey — a self-serve cohort wall with hand-drawn visual identity and passcode-protected profiles.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/190",
    projects: [
      {
        name: "Vibey",
        oneLiner:
          "Self-serve cohort wall — participants add their own profile and projects, no admin bottleneck.",
        url: "https://vibey-three.vercel.app/",
        tags: ["community", "self-serve-wall"],
      },
    ],
  },
  {
    handle: "RamyaTolety",
    bio: "Builder of Lighthouse — a directory that parses the cohort repo's submissions/ directly from the GitHub API on every request.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/189",
    projects: [
      {
        name: "Lighthouse",
        oneLiner:
          "Zero-sync-job directory: fetches submissions/ from the GitHub Contents API on every request via ISR.",
        url: "https://lighthouse-ramyatolety.vercel.app",
        repo: "https://github.com/RamyaTolety/lighthouse-ramyatolety",
        tags: ["infra", "auto-sync-directory"],
      },
    ],
  },
  {
    handle: "joes9987",
    name: "Joseph Singh",
    bio: "Builder of EudaMarket — a partner-facing showcase connected to a suite of cohort tools (EudaPM/EudaChat).",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/187",
    projects: [
      {
        name: "EudaMarket",
        oneLiner:
          "Roster profiles, PM status snapshot, partner intro + RSVP, and a connected suite account.",
        url: "https://showcase-joes9987.vercel.app",
        repo: "https://github.com/joes9987/showcase-joes9987",
        tags: ["partnerships", "suite-integration"],
      },
    ],
  },
  {
    handle: "r3s0lv343vr",
    bio: "Builder of Pixie Dust Cheesecake — a brand-first showcase with a conversational AI Brand Designer studio.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/185",
    projects: [
      {
        name: "Pixie Dust Cheesecake",
        oneLiner:
          "Cohort profiles, partner intro flow, PM status snapshot, and an AI Brand Designer studio.",
        url: "https://pixie-dust-cheesecake.vercel.app",
        repo: "https://github.com/r3s0lv343vr/vibe-marketing-platform",
        tags: ["branding", "ai-studio"],
      },
    ],
  },
  {
    handle: "CodingWCal",
    name: "Calvin V.",
    bio: "Builder of the Cursor Boston × Hult showcase — an editorial marketing surface with full admin CRUD.",
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/184",
    projects: [
      {
        name: "Cursor Boston Showcase",
        oneLiner:
          "Curated editorial marketing surface — project gallery, member directory, GitHub OAuth admin CRUD.",
        url: "https://cursor-boston-showcase.vercel.app",
        repo: "https://github.com/CodingWCal/cursor-boston-showcase",
        tags: ["editorial", "admin-cms"],
      },
    ],
  },
  {
    handle: "RAVEN-dubgub",
    bio: 'Builder of a showcase positioned on one idea: "Don\'t trust our word — inspect their GitHub."',
    prUrl: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/pull/183",
    projects: [
      {
        name: "Showcase",
        oneLiner:
          "Student profiles, live PM status integration, and a partner intro + RSVP flow.",
        url: "https://showcase-raven-dubgub.vercel.app",
        repo: "https://github.com/RAVEN-dubgub/showcase-raven-dubgub",
        tags: ["transparency", "live-status"],
      },
    ],
  },
];

export const myBuilder = builders.find((b) => b.isMe)!;
