CREATE TABLE IF NOT EXISTS members (
  handle text PRIMARY KEY,
  name text,
  bio text,
  location text,
  campus text,
  privacy text NOT NULL DEFAULT 'public',
  avatar_url text,
  build_repo text,
  claimed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL REFERENCES members(handle) ON DELETE CASCADE,
  name text NOT NULL,
  one_liner text NOT NULL DEFAULT '',
  url text NOT NULL,
  repo text,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  shot text,
  media jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  phase text,
  pr_number integer,
  pr_url text,
  from_merge boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_handle_idx ON projects(handle);
CREATE UNIQUE INDEX IF NOT EXISTS projects_handle_phase_name_uidx ON projects(handle, phase, name);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type text NOT NULL,
  target_id text NOT NULL,
  author_handle text NOT NULL,
  body text NOT NULL,
  parent_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_target_idx ON comments(target_type, target_id);

CREATE TABLE IF NOT EXISTS sync_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pr_number integer NOT NULL,
  phase text NOT NULL,
  handle text NOT NULL,
  pr_url text NOT NULL,
  merged_at timestamptz,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS sync_pr_phase_uidx ON sync_events(pr_number, phase);
