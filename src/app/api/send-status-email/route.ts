import { NextResponse } from "next/server";
import { Resend } from "resend";
import { authorizeAdmin } from "@/lib/adminAuth";
import { brandWrap, detailsTable, escapeHtml, statusEmail } from "@/lib/emailTemplates";
import {
  EMAIL_FROM,
  bookingDetailEntries,
  bookingRef,
  logNotification,
} from "@/lib/adminEmailUtils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.bookingId || !body?.status || !body?.customerEmail) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { bookingId, status, customerEmail, customerName, totalPrice, currency } = body;

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  const entries = booking ? bookingDetailEntries(booking) : [["Booking Ref", bookingRef(bookingId)] as [string, string]];
  const curr = currency || booking?.currency || "KWD";
  const price = totalPrice ?? booking?.total_price;

  let email = statusEmail(status, "booking", entries);
  let logLabel = `Status email — ${status.charAt(0).toUpperCase()}${status.slice(1)}`;

  if (!email && status === "quote_sent") {
    email = {
      subject: `Your taxi quote — Kuwait Taxi Service`,
      html: brandWrap(
        "Your Quote is Ready 💰",
        `<p style="color:#3f3f46;font-size:14px;line-height:22px">
          ${customerName ? `Dear ${escapeHtml(customerName)},` : "Hello,"}<br/><br/>
          Thank you for your booking request. Your quote is:
        </p>
        <p style="font-size:24px;font-weight:800;color:#0a6b3d;margin:8px 0 16px">
          ${escapeHtml(curr)} ${price != null ? escapeHtml(Number(price).toFixed(2)) : "—"}
        </p>
        <p style="color:#3f3f46;font-size:14px;line-height:22px">
          Reply to this email or WhatsApp us to confirm your ride.
        </p>
        ${detailsTable(entries)}`
      ),
    };
    logLabel = `Quote sent — ${curr} ${price != null ? Number(price).toFixed(2) : ""}`.trim();
  }

  if (!email && status === "in_progress") {
    email = {
      subject: "Your driver is on the way 🚗 — Kuwait Taxi Service",
      html: brandWrap(
        "Driver On The Way 🚗",
        `<p style="color:#3f3f46;font-size:14px;line-height:22px">
          ${customerName ? `Dear ${escapeHtml(customerName)},` : "Hello,"}<br/><br/>
          Your trip is now in progress — your driver is on the way to the pickup
          point. Keep your phone nearby in case the driver calls.
        </p>
        ${detailsTable(entries)}`
      ),
    };
    logLabel = "Status email — In progress";
  }

  if (!email) return NextResponse.json({ error: "Unsupported status" }, { status: 400 });

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: customerEmail,
    replyTo: process.env.ADMIN_GMAIL,
    subject: email.subject,
    html: email.html,
  });

  if (error) return NextResponse.json({ error: "Email send failed" }, { status: 502 });

  await logNotification(supabase, bookingId, logLabel);
  return NextResponse.json({ ok: true });
}
