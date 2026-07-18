import type { SupabaseClient } from "@supabase/supabase-js";

// Shared helpers for admin email API routes (server-side only).

export const EMAIL_FROM = `Kuwait Taxi Service <bookings@${process.env.RESEND_EMAIL_DOMAIN}>`;

export interface BookingLike {
  id: string;
  pickup_location?: string;
  destination?: string;
  pickup_date?: string;
  pickup_time?: string;
  vehicle_type?: string;
  passengers?: number;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  special_requests?: string;
  total_price?: number;
  currency?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_plate?: string;
  actual_vehicle?: string;
  flight_number?: string;
  has_return_trip?: boolean;
  internal_notes?: string | null;
}

export function bookingRef(id: string) {
  return id.slice(0, 8).toUpperCase();
}

export function bookingDetailEntries(b: BookingLike): [string, string][] {
  const entries: [string, string][] = [["Booking Ref", bookingRef(b.id)]];
  if (b.pickup_location) entries.push(["Pickup", b.pickup_location]);
  if (b.destination) entries.push(["Drop-off", b.destination]);
  if (b.pickup_date) entries.push(["Date", b.pickup_date]);
  if (b.pickup_time) entries.push(["Time", b.pickup_time]);
  if (b.vehicle_type) entries.push(["Vehicle", b.vehicle_type]);
  if (b.passengers) entries.push(["Passengers", String(b.passengers)]);
  if (b.flight_number) entries.push(["Flight", b.flight_number]);
  if (b.has_return_trip) entries.push(["Trip", "Round trip"]);
  if (b.special_requests) entries.push(["Notes", b.special_requests]);
  return entries;
}

// Appends a `📧 [DD Mon HH:MM] <label>` line to the booking's internal_notes
// so the admin Notifications page can show the send history.
export async function logNotification(
  supabase: SupabaseClient,
  bookingId: string,
  label: string
) {
  try {
    const { data } = await supabase
      .from("bookings")
      .select("internal_notes")
      .eq("id", bookingId)
      .single();

    const now = new Date();
    const stamp = now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const line = `📧 [${stamp}] ${label}`;
    const notes = data?.internal_notes ? `${data.internal_notes}\n${line}` : line;

    await supabase.from("bookings").update({ internal_notes: notes }).eq("id", bookingId);
  } catch {
    // Logging must never fail the email send.
  }
}
