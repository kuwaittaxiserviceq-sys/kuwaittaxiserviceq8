// Branded HTML email templates (server-side only).

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CONTACT_FOOTER = `
  <p style="margin:24px 0 0;color:#71717a;font-size:13px;line-height:20px">
    Kuwait Taxi Service — 24/7 across Kuwait<br/>
    Call / WhatsApp: <a href="https://wa.me/96597896907" style="color:#0a6b3d;font-weight:600">+965 9789 6907</a><br/>
    <a href="https://kuwaittaxiserviceq8.com" style="color:#0a6b3d">kuwaittaxiserviceq8.com</a>
  </p>`;

export function brandWrap(heading: string, bodyHtml: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#063f24;padding:20px 28px;border-radius:12px 12px 0 0">
      <div style="color:#ffffff;font-size:18px;font-weight:700">Kuwait Taxi Service</div>
      <div style="color:#86efac;font-size:12px">Taxi &amp; Airport Transfers — 24/7 across Kuwait</div>
    </div>
    <div style="height:4px;background:linear-gradient(90deg,#0a6b3d 60%,#ce1126 60%)"></div>
    <div style="border:1px solid #e4e4e7;border-top:none;border-radius:0 0 12px 12px;padding:28px">
      <h2 style="margin:0 0 12px;color:#0a6b3d;font-size:20px">${heading}</h2>
      ${bodyHtml}
      ${CONTACT_FOOTER}
    </div>
  </div>`;
}

export function detailsTable(entries: [string, string][]) {
  const rows = entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e4e4e7;font-weight:600;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e4e4e7">${escapeHtml(v)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>`;
}

export function customerReceivedEmail(formType: string, entries: [string, string][]) {
  const name = entries.find(([k]) => k.toLowerCase().includes("name"))?.[1] ?? "";
  return {
    subject: `We received your ${formType} — Kuwait Taxi Service`,
    html: brandWrap(
      "Thank you — we're on it! ✅",
      `<p style="color:#3f3f46;font-size:14px;line-height:22px">
        ${name ? `Dear ${escapeHtml(name)},` : "Hello,"}<br/><br/>
        We've received your <strong>${escapeHtml(formType)}</strong> and our
        dispatch team is reviewing it now. We usually reply within minutes —
        by phone or WhatsApp.
      </p>
      <p style="margin:16px 0 8px;color:#71717a;font-size:12px;font-weight:700;text-transform:uppercase">Your details</p>
      ${detailsTable(entries)}`
    ),
  };
}

export function statusEmail(
  status: string,
  formType: string,
  entries: [string, string][]
): { subject: string; html: string } | null {
  if (status === "confirmed") {
    return {
      subject: "Your booking is CONFIRMED ✅ — Kuwait Taxi Service",
      html: brandWrap(
        "Booking Confirmed ✅",
        `<p style="color:#3f3f46;font-size:14px;line-height:22px">
          Great news — your <strong>${escapeHtml(formType)}</strong> is confirmed.
          Your driver will contact you before pickup. If anything changes,
          just call or WhatsApp us.
        </p>
        <p style="margin:16px 0 8px;color:#71717a;font-size:12px;font-weight:700;text-transform:uppercase">Booking details</p>
        ${detailsTable(entries)}`
      ),
    };
  }
  if (status === "cancelled") {
    return {
      subject: "Your booking was cancelled — Kuwait Taxi Service",
      html: brandWrap(
        "Booking Cancelled",
        `<p style="color:#3f3f46;font-size:14px;line-height:22px">
          Your <strong>${escapeHtml(formType)}</strong> has been cancelled.
          If this was a mistake or you'd like to rebook, we're available
          24/7 — just call or WhatsApp us and we'll arrange a new ride
          right away.
        </p>`
      ),
    };
  }
  if (status === "completed") {
    return {
      subject: "Thank you for riding with Kuwait Taxi Service 🚕",
      html: brandWrap(
        "Thank You! 🚕",
        `<p style="color:#3f3f46;font-size:14px;line-height:22px">
          Your trip is complete — we hope you enjoyed the ride!<br/><br/>
          Next time you need an airport transfer, city ride, or a trip to
          Saudi Arabia, we're one message away, 24/7. Save our number:
          <strong>+965 9789 6907</strong>.
        </p>`
      ),
    };
  }
  return null;
}
