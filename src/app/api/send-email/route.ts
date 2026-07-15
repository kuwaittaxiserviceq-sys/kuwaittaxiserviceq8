import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SECRET_KEY
      )
    : null;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const labels: Record<string, string> = {
  name: "Name",
  firstName: "First name",
  lastName: "Last name",
  salutation: "Salutation",
  phone: "Phone",
  email: "Email",
  pickup: "Pickup",
  dropoff: "Drop-off",
  extraPickupAddress: "Extra pickup",
  extraDropoffAddress: "Extra drop-off",
  date: "Date",
  time: "Time",
  pax: "Passengers",
  passengers: "Passengers",
  luggage: "Luggage",
  carryons: "Carry-ons",
  service: "Service",
  tripType: "Trip type",
  vehicle: "Vehicle",
  childSeat: "Child seat",
  flight: "Flight",
  payment: "Payment method",
  subject: "Subject",
  message: "Message",
  comments: "Comments",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const formType = typeof body.formType === "string" ? body.formType.slice(0, 60) : "";
    const data = body.data;

    if (!formType || typeof data !== "object" || data === null) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const entries = Object.entries(data)
      .filter(
        (e): e is [string, string] =>
          typeof e[1] === "string" && e[1].trim() !== "" && e[1].length <= 2000
      )
      .slice(0, 30);

    if (entries.length === 0) {
      return NextResponse.json({ error: "Empty form" }, { status: 400 });
    }

    const rows = entries
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border:1px solid #e4e4e7;font-weight:600;white-space:nowrap">${escapeHtml(
            labels[k] ?? k
          )}</td><td style="padding:6px 12px;border:1px solid #e4e4e7">${escapeHtml(v)}</td></tr>`
      )
      .join("");

    // Save to database first — the permanent record, independent of email delivery.
    let saved = false;
    if (supabase) {
      const { error: dbError } = await supabase
        .from("submissions")
        .insert({ form_type: formType, data: Object.fromEntries(entries) });
      if (dbError) console.error("Supabase insert error:", dbError);
      else saved = true;
    }

    const customerEmail =
      typeof data.email === "string" && data.email.includes("@") ? data.email : undefined;

    const { error } = await resend.emails.send({
      from: `Kuwait Taxi Website <bookings@${process.env.RESEND_EMAIL_DOMAIN}>`,
      to: process.env.ADMIN_GMAIL as string,
      replyTo: customerEmail,
      subject: `New ${formType} — Kuwait Taxi Website`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px">
          <h2 style="color:#0a6b3d;margin-bottom:4px">New ${escapeHtml(formType)}</h2>
          <p style="color:#71717a;margin-top:0">Submitted from kuwaittaxiserviceq8.com</p>
          <table style="border-collapse:collapse;width:100%">${rows}</table>
        </div>`,
    });

    if (error) console.error("Resend error:", error);

    // Success if the submission reached at least one channel.
    if (error && !saved) {
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, saved, emailed: !error });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
