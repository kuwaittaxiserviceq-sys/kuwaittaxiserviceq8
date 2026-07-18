import { NextResponse } from "next/server";
import { Resend } from "resend";
import { authorizeAdmin } from "@/lib/adminAuth";
import { brandWrap, detailsTable, escapeHtml } from "@/lib/emailTemplates";
import {
  EMAIL_FROM,
  bookingDetailEntries,
  logNotification,
} from "@/lib/adminEmailUtils";

const resend = new Resend(process.env.RESEND_API_KEY);

// Emails the customer their assigned driver's details.
export async function POST(req: Request) {
  const supabase = await authorizeAdmin(req);
  if (!supabase) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const booking = body?.booking;
  if (!booking?.id || !booking?.customer_email) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (!booking.driver_name && !booking.driver_phone) {
    return NextResponse.json({ error: "No driver assigned" }, { status: 400 });
  }

  const driverEntries: [string, string][] = [];
  if (booking.driver_name) driverEntries.push(["Driver", booking.driver_name]);
  if (booking.driver_phone) driverEntries.push(["Driver Phone", booking.driver_phone]);
  if (booking.actual_vehicle) driverEntries.push(["Vehicle", booking.actual_vehicle]);
  if (booking.driver_plate) driverEntries.push(["Plate No.", booking.driver_plate]);

  const html = brandWrap(
    "Your Driver Details 🚖",
    `<p style="color:#3f3f46;font-size:14px;line-height:22px">
      ${booking.customer_name ? `Dear ${escapeHtml(booking.customer_name)},` : "Hello,"}<br/><br/>
      Your driver has been assigned. Here are the details for your upcoming trip:
    </p>
    ${detailsTable(driverEntries)}
    <p style="margin:16px 0 8px;color:#71717a;font-size:12px;font-weight:700;text-transform:uppercase">Trip details</p>
    ${detailsTable(bookingDetailEntries(booking))}
    <p style="color:#3f3f46;font-size:14px;line-height:22px;margin-top:16px">
      Your driver will contact you before pickup. Keep your phone nearby.
    </p>`
  );

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: booking.customer_email,
    replyTo: process.env.ADMIN_GMAIL,
    subject: "Your driver details — Kuwait Taxi Service 🚖",
    html,
  });

  if (error) return NextResponse.json({ error: "Email send failed" }, { status: 502 });

  await logNotification(supabase, booking.id, `Driver details sent — ${booking.driver_name || ""}`.trim());
  return NextResponse.json({ ok: true });
}
