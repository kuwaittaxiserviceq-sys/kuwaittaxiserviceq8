import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Verifies the caller's Supabase session token and returns a service-role
// client only when the caller is the configured admin account.
export async function authorizeAdmin(req: Request): Promise<SupabaseClient | null> {
  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SECRET_KEY as string,
    { auth: { persistSession: false } }
  );
  const { data, error } = await supabase.auth.getUser(authHeader.slice(7));

  const adminEmail = (process.env.ADMIN_GMAIL ?? "").toLowerCase();
  const userEmail = (data?.user?.email ?? "").toLowerCase();
  if (error || !adminEmail || userEmail !== adminEmail) return null;

  return supabase;
}
