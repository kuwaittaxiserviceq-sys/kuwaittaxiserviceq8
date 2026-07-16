import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { statusEmail } from "@/lib/emailTemplates";

const STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;

const resend = new Resend(process.env.RESEND_API_KEY);

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SECRET_KEY as string,
    { auth: { persistSession: false } }
  );
}

async function authorize(req: Request): Promise<SupabaseClient | null> {
  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return null;

  const supabase = adminClient();
  const { data, error } = await supabase.auth.getUser(authHeader.slice(7));

  const adminEmail = (process.env.ADMIN_GMAIL ?? "").toLowerCase();
  const userEmail = (data?.user?.email ?? "").toLowerCase();
  if (error || !adminEmail || userEmail !== adminEmail) return null;

  return supabase;
}

export async function GET(req: Request) {
  const supabase = await authorize(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("submissions")
    .select("id, created_at, form_type, data, status")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) return NextResponse.json({ error: "Query failed" }, { status: 500 });
  return NextResponse.json({ rows: data });
}

export async function PATCH(req: Request) {
  const supabase = await authorize(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = body?.status;

  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { data: updated, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .select("form_type, data")
    .single();
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });

  // Notify the customer of the status change when they left an email.
  let customerEmailed = false;
  const customerEmail =
    typeof updated?.data?.email === "string" && updated.data.email.includes("@")
      ? updated.data.email
      : null;
  if (customerEmail) {
    const entries = Object.entries(updated.data).filter(
      (e): e is [string, string] => typeof e[1] === "string" && e[1].trim() !== ""
    );
    const mail = statusEmail(status, updated.form_type, entries);
    if (mail) {
      const { error: mailError } = await resend.emails.send({
        from: `Kuwait Taxi Service <bookings@${process.env.RESEND_EMAIL_DOMAIN}>`,
        to: customerEmail,
        replyTo: process.env.ADMIN_GMAIL,
        subject: mail.subject,
        html: mail.html,
      });
      if (mailError) console.error("Status email error:", mailError);
      else customerEmailed = true;
    }
  }

  return NextResponse.json({ ok: true, customerEmailed });
}

export async function DELETE(req: Request) {
  const supabase = await authorize(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("submissions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
