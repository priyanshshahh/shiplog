// Active contributors on rogerSuperBuilderAlpha/hult-cohort-program
// Sourced from GitHub Contributors API (public). Bots filtered. Sorted by commits.
// Importers: ContributorWall.tsx, page.tsx (home stats)

export type Contributor = {
  handle: string;
  contributions: number;
};

export const repoUrl =
  "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program";

export const contributors: Contributor[] = [
  { handle: "rogerSuperBuilderAlpha", contributions: 182 },
  { handle: "nikjain15", contributions: 62 },
  { handle: "kiaracaesar5627", contributions: 30 },
  { handle: "Lorra-V", contributions: 25 },
  { handle: "joes9987", contributions: 14 },
  { handle: "r3s0lv343vr", contributions: 11 },
  { handle: "alaskalam", contributions: 8 },
  { handle: "kureen-cyber", contributions: 8 },
  { handle: "mitchelldante99-create", contributions: 8 },
  { handle: "priyanshshahh", contributions: 7 },
  { handle: "jayyyW34", contributions: 6 },
  { handle: "ramyat674", contributions: 5 },
  { handle: "artira", contributions: 4 },
  { handle: "godwinKamau", contributions: 4 },
  { handle: "zukhriddingit", contributions: 4 },
  { handle: "kperpignant", contributions: 3 },
  { handle: "DivyaPrakash04", contributions: 3 },
  { handle: "CodingWCal", contributions: 3 },
  { handle: "frankgomezdev", contributions: 2 },
  { handle: "RAVEN-dubgub", contributions: 2 },
  { handle: "rebekah-dev", contributions: 2 },
  { handle: "Studmuffin01", contributions: 2 },
  { handle: "arjun-singh2127", contributions: 2 },
  { handle: "lvcasmadeit", contributions: 2 },
  { handle: "solzco1", contributions: 1 },
  { handle: "Xavierhuang", contributions: 1 },
  { handle: "jj-javascript", contributions: 1 },
  { handle: "gge513", contributions: 1 },
  { handle: "celiciakitty-creator", contributions: 1 },
  { handle: "Paramjeet-singh-neu", contributions: 1 },
  { handle: "Josie-ctrl", contributions: 1 },
  { handle: "SuperCUDA", contributions: 1 },
  { handle: "AnushaVissapragada23", contributions: 1 },
];

export const contributorCount = contributors.length;
export const totalContributions = contributors.reduce(
  (n, c) => n + c.contributions,
  0,
);
