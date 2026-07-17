import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/adminAuth";

const DOC_TYPES = ["quotation", "invoice", "receipt"];

export async function GET(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("documents")
    .select("id, created_at, doc_type, number, customer_name, total, currency, payload")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: "Query failed" }, { status: 500 });
  return NextResponse.json({ rows: data });
}

export async function POST(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (
    !body ||
    !DOC_TYPES.includes(body.docType) ||
    typeof body.number !== "string" ||
    typeof body.payload !== "object" ||
    body.payload === null
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const record = {
    doc_type: body.docType,
    number: body.number.slice(0, 60),
    customer_name:
      typeof body.customerName === "string" ? body.customerName.slice(0, 120) : null,
    total: typeof body.total === "number" && isFinite(body.total) ? body.total : null,
    currency: typeof body.currency === "string" ? body.currency.slice(0, 8) : null,
    payload: body.payload,
  };

  // Update in place when an id is provided (re-saving a loaded document).
  if (typeof body.id === "string" && body.id) {
    const { error } = await supabase.from("documents").update(record).eq("id", body.id);
    if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
    return NextResponse.json({ ok: true, id: body.id });
  }

  const { data, error } = await supabase
    .from("documents")
    .insert(record)
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}

export async function DELETE(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("documents").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
