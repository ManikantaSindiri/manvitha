/*
# Add message column to proposal_responses

## Purpose
Stores Tanvitha's personal handwritten message to Manish — a free-text
note she can write after answering the proposal. The message is included
in the email notification sent to Manish.

## Changes
- Added `message` (text, nullable) column to `proposal_responses`.
  Nullable because she may choose not to write anything.

## Security
- No policy changes needed. The existing INSERT/SELECT policies for
  anon + authenticated already cover the new column (RLS is column-agnostic
  in the existing permissive policies).
*/

ALTER TABLE proposal_responses
  ADD COLUMN IF NOT EXISTS message text;
