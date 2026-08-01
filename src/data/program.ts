/** Official program surfaces. */

export const program = {
  cohortId: "summer26",
  cohortLabel: "Summer Pilot 2026",
  enrolledCount: 67,
  peerReviewCount: 66,
  officialSite: "https://cohorts.algorithmacy.org",
  dashboard: "https://cohorts.algorithmacy.org/dashboard",
  programPage: "https://cohorts.algorithmacy.org/program/phase-1-project-3",
  winningGuide: "https://cohorts.algorithmacy.org/winning-guide",
  placementEmail: "cohort@hult.edu",
  repo: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program",
  statsApi: "https://cohorts.algorithmacy.org/api/cohort/stats",
  reviewDeadline: "Mon Aug 3, 2026 · 17:00 ET",
  mergeDeadline: "Sun Aug 2, 2026 · 17:00 ET",
  voteRule:
    "Winners are chosen by Vote: up lines inside written GitHub review issues.",
} as const;

export type ReviewPulse = {
  reviewer: string;
  subject: string;
  url: string;
  at: string;
  hasUpvote: boolean;
};

export const reviewPulse: ReviewPulse[] = [
  {
    reviewer: "joes9987",
    subject: "ryanroper79-alt",
    url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/issues/188",
    at: "2026-07-31T20:00:00.000Z",
    hasUpvote: true,
  },
  {
    reviewer: "CodingWCal",
    subject: "raven-dubgub",
    url: "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/issues/125",
    at: "2026-07-26T22:58:54Z",
    hasUpvote: true,
  },
];

export function reviewIssueUrl(
  buildRepo: string,
  reviewer: string,
  subject: string,
) {
  const title = encodeURIComponent(`Review by @${reviewer}: @${subject}`);
  const body = encodeURIComponent(
    [
      `## Review by @${reviewer}: @${subject}`,
      "**Deployment tested:** yes",
      "**Time spent:** ~N min",
      "",
      "### Rubric",
      "| Dimension | Score (1-5) | Note |",
      "|-----------|-------------|------|",
      "| Production readiness |  |  |",
      "| Core functionality |  |  |",
      "| Code quality |  |  |",
      "| Ecosystem thinking |  |  |",
      "| Credibility to employers |  |  |",
      "",
      "### Vote: up",
      "",
      "_Delete the Vote: up section above to abstain._",
    ].join("\n"),
  );
  return `${buildRepo}/issues/new?title=${title}&body=${body}`;
}
