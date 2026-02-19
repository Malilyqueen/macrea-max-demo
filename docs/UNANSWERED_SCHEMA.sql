-- SQL for Supabase / Postgres: create table to store unanswered questions
-- Run this once in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.unanswered_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text,
  question text NOT NULL,
  page text,
  snippet text,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Index for retention queries
CREATE INDEX IF NOT EXISTS idx_unanswered_created_at ON public.unanswered_questions (created_at);
