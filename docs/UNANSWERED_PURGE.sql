-- Purge old unanswered_questions rows older than 90 days
-- Run this in the Supabase SQL editor.

-- Create a helper function that deletes rows older than 90 days
CREATE OR REPLACE FUNCTION public.purge_unanswered_questions()
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count integer := 0;
BEGIN
  DELETE FROM public.unanswered_questions
  WHERE created_at < (now() - INTERVAL '90 days')
  RETURNING 1 INTO deleted_count;

  -- Return number of rows deleted (may be null -> 0)
  IF deleted_count IS NULL THEN
    RETURN 0;
  END IF;
  RETURN deleted_count;
END;
$$;

-- If your Supabase project allows the pg_cron extension, you can schedule
-- the purge to run once per day at midnight UTC. Uncomment and run the
-- following lines if pg_cron is available in your project.

-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('daily_purge_unanswered', '0 0 * * *', $$SELECT public.purge_unanswered_questions();$$);

-- Alternative: if pg_cron is not available, schedule a daily HTTP request
-- from your hosting provider (Vercel cron, GitHub Actions, server cron) to
-- hit an admin-only endpoint that calls `SELECT public.purge_unanswered_questions();`
