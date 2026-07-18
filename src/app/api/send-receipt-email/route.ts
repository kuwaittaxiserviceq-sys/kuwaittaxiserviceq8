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
  const amount = body.amountPaid ?? (booking.total_price != null ? Number(booking.total_price).toFixed(2) : "—");
  const paymentMethod = body.paymentMethod || booking.payment_method || "Cash to Driver";
  const ref = `RCP-${bookingRef(booking.id)}`;

  const html = brandWrap(
    "Payment Receipt ✅",
    `<p style="color:#3f3f46;font-size:14px;line-height:22px">
      ${booking.customer_name ? `Dear ${escapeHtml(booking.customer_name)},` : "Hello,"}<br/><br/>
      Thank you for riding with Kuwait Taxi Service. This confirms your payment${body.pdfBase64 ? " (PDF receipt attached)" : ""}:
    </p>
    ${detailsTable([
      ["Receipt No.", ref],
      ["Amount Paid", `${currency} ${amount}`],
      ["Payment Method", String(paymentMethod)],
      ...bookingDetailEntries(booking),
    ])}
    <p style="color:#3f3f46;font-size:14px;line-height:22px;margin-top:16px">
      We hope to serve you again soon — save our number for your next ride!
    </p>`
  );

  const attachments =
    body.pdfBase64 && body.filename
      ? [{ filename: body.filename, content: body.pdfBase64 }]
      : undefined;

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: booking.customer_email,
    replyTo: process.env.ADMIN_GMAIL,
    subject: `Receipt ${ref} — Kuwait Taxi Service`,
    html,
    attachments,
  });

  if (error) return NextResponse.json({ error: "Email send failed" }, { status: 502 });

  await logNotification(supabase, booking.id, `Receipt sent — ${currency} ${amount}`);
  return NextResponse.json({ ok: true });
}
