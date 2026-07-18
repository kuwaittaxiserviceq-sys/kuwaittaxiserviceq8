import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/adminAuth";

export async function GET(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Query failed" }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.code !== "string" || !body.code.trim()) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const record = {
    code: body.code.trim().toUpperCase().slice(0, 40),
    discount_type: body.discount_type === "percentage" ? "percentage" : "fixed",
    discount_value: Number(body.discount_value) || 0,
    max_uses: body.max_uses != null ? Number(body.max_uses) : null,
    expires_at: body.expires_at || null,
    is_active: body.is_active !== false,
  };

  const { data, error } = await supabase
    .from("promo_codes")
    .insert(record)
    .select()
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json(
      { error: status === 409 ? "Code already exists" : "Insert failed" },
      { status }
    );
  }
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { id, ...updates } = body;
  const { error } = await supabase.from("promo_codes").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = body?.id || new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("promo_codes").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
