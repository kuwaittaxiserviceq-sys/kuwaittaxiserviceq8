import { NextResponse } from "next/server";
import { Resend } from "resend";
import { authorizeAdmin } from "@/lib/adminAuth";
import { brandWrap, detailsTable, escapeHtml } from "@/lib/emailTemplates";
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
  const booking = body?.booking;
  if (!booking?.id || !booking?.customer_email) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const currency = body.currency || booking.currency || "KWD";
  const price = booking.total_price;
  const entries = bookingDetailEntries(booking);

  const html = brandWrap(
    "Your Quotation 💰",
    `<p style="color:#3f3f46;font-size:14px;line-height:22px">
      ${booking.customer_name ? `Dear ${escapeHtml(booking.customer_name)},` : "Hello,"}<br/><br/>
      Thank you for choosing Kuwait Taxi Service. Please find your quotation below${body.pdfBase64 ? " (PDF attached)" : ""}:
    </p>
    <p style="font-size:24px;font-weight:800;color:#0a6b3d;margin:8px 0 16px">
      ${escapeHtml(currency)} ${price != null ? escapeHtml(Number(price).toFixed(2)) : "—"}
      ${booking.has_return_trip ? '<span style="font-size:12px;color:#71717a;font-weight:600"> (round trip)</span>' : ""}
    </p>
    ${detailsTable(entries)}
    <p style="color:#3f3f46;font-size:14px;line-height:22px;margin-top:16px">
      Reply to this email or WhatsApp us to confirm your booking.
    </p>`
  );

  const attachments =
    body.pdfBase64 && (body.pdfFilename || body.filename)
      ? [{ filename: body.pdfFilename || body.filename, content: body.pdfBase64 }]
      : undefined;

  const to = [booking.customer_email as string];
  const cc: string[] = Array.isArray(body.additionalEmails) ? body.additionalEmails : [];

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    cc: cc.length ? cc : undefined,
    replyTo: process.env.ADMIN_GMAIL,
    subject: `Quotation ${bookingRef(booking.id)} — Kuwait Taxi Service`,
    html,
    attachments,
  });

  if (error) return NextResponse.json({ error: "Email send failed" }, { status: 502 });

  await logNotification(
    supabase,
    booking.id,
    `Quote sent — ${currency} ${price != null ? Number(price).toFixed(2) : ""}`.trim()
  );

  // Move the booking forward so the pipeline reflects that a quote went out.
  await supabase
    .from("bookings")
    .update({ status: "quote_sent" })
    .eq("id", booking.id)
    .eq("status", "pending");

  return NextResponse.json({ ok: true });
}
