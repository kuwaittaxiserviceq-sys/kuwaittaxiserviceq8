import { supabase } from "./supabase";

// fetch() wrapper that attaches the admin's Supabase session token so
// API routes can verify the caller via lib/adminAuth.authorizeAdmin.
export async function adminFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(input, { ...init, headers });
}
