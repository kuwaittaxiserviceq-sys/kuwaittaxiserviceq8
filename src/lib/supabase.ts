import { createClient } from "@supabase/supabase-js";

// Shared browser client (anon key). Server routes use lib/adminAuth instead.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) as string
);
