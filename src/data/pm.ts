// Cohort-wide program pulse. Platforms the cohort uses together.
// Not a personal task board.

export type PmInitiative = {
  id: string;
  title: string;
  status: "live" | "active" | "upcoming";
  detail: string;
  url: string;
};

export type PmSnapshot = {
  sourceLabel: string;
  sourceUrl: string;
  syncedAt: string;
  initiatives: PmInitiative[];
};

export const pmSnapshot: PmSnapshot = {
  sourceLabel: "Cohort platforms",
  sourceUrl: "https://cohorts.algorithmacy.org/program",
  syncedAt: "2026-08-01T08:00:00.000Z",
  initiatives: [
    {
      id: "p1",
      title: "Project management",
      status: "live",
      detail: "Track ships and next actions across the pilot.",
      url: "https://keel-pm.vercel.app",
    },
    {
      id: "p2",
      title: "Internal communications",
      status: "live",
      detail: "Channels and activity for the cohort.",
      url: "https://cohort-comms-phi.vercel.app",
    },
    {
      id: "p3",
      title: "Public showcase",
      status: "active",
      detail: "This marketing surface for partners and peers.",
      url: "https://shiplog-snowy.vercel.app",
    },
    {
      id: "ops",
      title: "Official dashboard",
      status: "live",
      detail: "Enrollment, submissions, and review progress.",
      url: "https://cohorts.algorithmacy.org/dashboard",
    },
  ],
};
