// Read-only PM snapshot for Summer Pilot 2026 (Keel + program calendar).
// Importers: PmPanel.tsx, status/page.tsx, page.tsx
// Schema: initiatives[{id,title,status,ownerHandle,openTasks,doneTasks,updatedAt:ISO8601}]
// User: "do it also this is the https://cohorts.algorithmacy.org/dashboard..."

export type PmInitiative = {
  id: string;
  title: string;
  status: "done" | "on-track" | "at-risk" | "upcoming";
  ownerHandle: string;
  openTasks: number;
  doneTasks: number;
  updatedAt: string;
};

export type PmSnapshot = {
  sourceLabel: string;
  sourceUrl: string;
  syncedAt: string;
  initiatives: PmInitiative[];
};

export const pmSnapshot: PmSnapshot = {
  sourceLabel: "Keel · cohort PM snapshot",
  sourceUrl: "https://keel-pm.vercel.app",
  syncedAt: "2026-08-01T08:00:00.000Z",
  initiatives: [
    {
      id: "p1",
      title: "Phase 1 · Project management platform",
      status: "done",
      ownerHandle: "priyanshshahh",
      openTasks: 0,
      doneTasks: 12,
      updatedAt: "2026-07-20T21:00:00.000Z",
    },
    {
      id: "p2",
      title: "Phase 1 · Internal communications",
      status: "done",
      ownerHandle: "priyanshshahh",
      openTasks: 1,
      doneTasks: 14,
      updatedAt: "2026-07-27T11:41:00.000Z",
    },
    {
      id: "p3",
      title: "Phase 1 · Public showcase (vibe marketing)",
      status: "on-track",
      ownerHandle: "priyanshshahh",
      openTasks: 4,
      doneTasks: 9,
      updatedAt: "2026-08-01T08:00:00.000Z",
    },
    {
      id: "review-p3",
      title: "Peer review week · Project 3",
      status: "upcoming",
      ownerHandle: "cohort",
      openTasks: 8,
      doneTasks: 0,
      updatedAt: "2026-08-01T08:00:00.000Z",
    },
    {
      id: "uni",
      title: "Phase 1 · Ecosystem unification",
      status: "at-risk",
      ownerHandle: "cohort",
      openTasks: 8,
      doneTasks: 1,
      updatedAt: "2026-07-30T12:00:00.000Z",
    },
  ],
};
