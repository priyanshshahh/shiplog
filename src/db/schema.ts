import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** Member profile overlay. Handle = GitHub login (identity). */
export const members = pgTable("members", {
  handle: text("handle").primaryKey(),
  name: text("name"),
  bio: text("bio"),
  location: text("location"),
  campus: text("campus"),
  privacy: text("privacy").notNull().default("public"), // public | private
  avatarUrl: text("avatar_url"),
  buildRepo: text("build_repo"),
  claimedAt: timestamp("claimed_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Ships: seeded from merges, editable by owner for overlay fields. */
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    handle: text("handle")
      .notNull()
      .references(() => members.handle, { onDelete: "cascade" }),
    name: text("name").notNull(),
    oneLiner: text("one_liner").notNull().default(""),
    url: text("url").notNull(),
    repo: text("repo"),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    shot: text("shot"),
    media: jsonb("media").$type<string[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
    phase: text("phase"), // phase-1-project-1 | phase-1-project-2 | phase-1-project-3
    prNumber: integer("pr_number"),
    prUrl: text("pr_url"),
    fromMerge: boolean("from_merge").notNull().default(false),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("projects_handle_idx").on(t.handle),
    uniqueIndex("projects_handle_phase_name_uidx").on(t.handle, t.phase, t.name),
  ],
);

/** On-site social layer. Not the ballot — Vote: up stays on GitHub. */
export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    targetType: text("target_type").notNull(), // profile | project
    targetId: text("target_id").notNull(), // handle or project uuid
    authorHandle: text("author_handle").notNull(),
    body: text("body").notNull(),
    parentId: uuid("parent_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("comments_target_idx").on(t.targetType, t.targetId)],
);

/** Deduped merge sync log. */
export const syncEvents = pgTable(
  "sync_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    prNumber: integer("pr_number").notNull(),
    phase: text("phase").notNull(),
    handle: text("handle").notNull(),
    prUrl: text("pr_url").notNull(),
    mergedAt: timestamp("merged_at", { withTimezone: true }),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("sync_pr_phase_uidx").on(t.prNumber, t.phase)],
);
