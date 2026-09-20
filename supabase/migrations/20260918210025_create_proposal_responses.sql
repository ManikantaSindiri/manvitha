/*
# Create proposal_responses table

## Purpose
Stores Tanvitha's one-time answer to the proposal ("Will you be mine?") and
her optional date invitation details. Once a row exists, the proposal is
locked — she cannot change her answer on refresh or re-open.

## New Tables
- `proposal_responses`
  - `id` (uuid, primary key)
  - `choice` (text: 'yes' | 'think' | 'friends')
  - `date_date` (text, nullable — chosen date for the date invitation)
  - `date_time` (text, nullable — chosen time)
  - `date_location` (text, nullable — chosen location)
  - `date_activity` (text, nullable — chosen activity)
  - `created_at` (timestamptz, defaults to now())

## Security
- RLS enabled.
- This is a single-tenant, no-auth app (no sign-in screen). The anon-key
  frontend must be able to insert a response and read whether one already
  exists. Policies use `TO anon, authenticated` with `USING (true)` /
  `WITH CHECK (true)` because the data is intentionally public/shared
  within this private one-recipient site.

## Important Notes
1. Only one row should ever exist. The edge function enforces this by
   checking for an existing row before inserting. A unique index on a
   constant guarantees at most one row in the table.
2. UPDATE is intentionally NOT granted to anon — once written, the
   response cannot be changed by the frontend.
*/

CREATE TABLE IF NOT EXISTS proposal_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  choice text NOT NULL CHECK (choice IN ('yes', 'think', 'friends')),
  date_date text,
  date_time text,
  date_location text,
  date_activity text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE proposal_responses ENABLE ROW LEVEL SECURITY;

-- Ensure at most one response ever exists
CREATE UNIQUE INDEX IF NOT EXISTS proposal_responses_singleton
  ON proposal_responses ((1));

DROP POLICY IF EXISTS "anon_select_proposal_responses" ON proposal_responses;
CREATE POLICY "anon_select_proposal_responses"
  ON proposal_responses FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_insert_proposal_responses" ON proposal_responses;
CREATE POLICY "anon_insert_proposal_responses"
  ON proposal_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
