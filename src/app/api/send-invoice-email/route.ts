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
  const ref = `INV-${bookingRef(booking.id)}`;
  const paymentStatus = body.paymentStatus || booking.payment_status || "unpaid";

  const html = brandWrap(
    "Your Invoice 🧾",
    `<p style="color:#3f3f46;font-size:14px;line-height:22px">
      ${booking.customer_name ? `Dear ${escapeHtml(booking.customer_name)},` : "Hello,"}<br/><br/>
      Please find your invoice from Kuwait Taxi Service${body.pdfBase64 ? " attached as a PDF" : " below"}.
    </p>
    ${detailsTable([
      ["Invoice No.", ref],
      ["Amount", `${currency} ${booking.total_price != null ? Number(booking.total_price).toFixed(2) : "—"}`],
      ["Payment Status", String(paymentStatus)],
      ...(body.paymentMethod ? ([["Payment Method", String(body.paymentMethod)]] as [string, string][]) : []),
      ...bookingDetailEntries(booking),
    ])}
    <p style="color:#3f3f46;font-size:14px;line-height:22px;margin-top:16px">
      If you have any questions about this invoice, just reply to this email.
    </p>`
  );

  const attachments =
    body.pdfBase64 && body.filename
      ? [{ filename: body.filename, content: body.pdfBase64 }]
      : undefined;

  const cc: string[] = Array.isArray(body.additionalEmails)
    ? body.additionalEmails.filter((e: string) => typeof e === "string" && e.includes("@"))
    : [];

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: booking.customer_email,
    cc: cc.length ? cc : undefined,
    replyTo: process.env.ADMIN_GMAIL,
    subject: `Invoice ${ref} — Kuwait Taxi Service`,
    html,
    attachments,
  });

  if (error) return NextResponse.json({ error: "Email send failed" }, { status: 502 });

  await logNotification(supabase, booking.id, `Invoice sent — ${currency} ${booking.total_price ?? ""}`.trim());
  return NextResponse.json({ ok: true });
}
