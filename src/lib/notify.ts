// Fire-and-forget email notification to the admin inbox.
// WhatsApp remains the primary flow; a failed email never blocks the user.
export function notifyAdmin(formType: string, form: FormData) {
  const data: Record<string, string> = {};
  form.forEach((value, key) => {
    if (typeof value === "string") data[key] = value;
  });

  fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, data }),
    keepalive: true,
  }).catch(() => {});
}
