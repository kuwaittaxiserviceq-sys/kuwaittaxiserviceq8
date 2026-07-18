"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, type Session } from "@supabase/supabase-js";
import {
  ArrowRight,
  CarFront,
  FileText,
  FolderOpen,
  MessageCircle,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import AdminShell from "./AdminShell";
import { ratesData } from "./ratesData";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
);

type DocType = "quotation" | "invoice" | "receipt";
type Item = { desc: string; qty: string; price: string };

type SavedDoc = {
  id: string;
  created_at: string;
  doc_type: DocType;
  number: string;
  customer_name: string | null;
  total: number | null;
  currency: string | null;
  payload: Record<string, unknown>;
};

const docMeta: Record<DocType, { prefix: string; title: string }> = {
  quotation: { prefix: "QT", title: "QUOTATION" },
  invoice: { prefix: "INV", title: "INVOICE" },
  receipt: { prefix: "RCT", title: "RECEIPT" },
};

function genNumber(prefix: string) {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${prefix}-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const CURRENCIES = {
  KWD: { label: "KD", name: "Kuwaiti Dinar (KD)", decimals: 3 },
  SAR: { label: "SAR", name: "Saudi Riyal (SAR)", decimals: 2 },
  BHD: { label: "BD", name: "Bahraini Dinar (BD)", decimals: 3 },
  AED: { label: "AED", name: "UAE Dirham (AED)", decimals: 2 },
  QAR: { label: "QR", name: "Qatari Riyal (QR)", decimals: 2 },
  OMR: { label: "OMR", name: "Omani Rial (OMR)", decimals: 3 },
  USD: { label: "$", name: "US Dollar (USD)", decimals: 2 },
} as const;
type Currency = keyof typeof CURRENCIES;

const fmtCur = (n: number, c: Currency) =>
  `${CURRENCIES[c].label} ${n.toFixed(CURRENCIES[c].decimals)}`;

type Prefill = { formType: string; data: Record<string, string> };

// Suggest a fare from the rate card when the booking mentions a known area.
function suggestFare(data: Record<string, string>): string {
  const haystack = `${data.pickup ?? ""} ${data.dropoff ?? ""}`.toLowerCase();
  const match = ratesData.find((r) => haystack.includes(r.area.toLowerCase()));
  if (!match) return "";
  const vehicle = (data.vehicle ?? "").toLowerCase();
  if (vehicle.includes("van")) return String(match.van8);
  if (vehicle.includes("suv")) return String(match.suv);
  return String(match.sedan);
}

function prefillFields(p: Prefill) {
  const d = p.data;
  const name =
    d.name || [d.salutation, d.firstName, d.lastName].filter(Boolean).join(" ") || "";
  const route =
    d.pickup && d.dropoff ? `${d.pickup} → ${d.dropoff}` : d.pickup || d.dropoff || "";
  const service = d.service || p.formType;
  const desc = route ? `${service} — ${route}` : service;
  const noteBits = [
    d.date && `Trip: ${d.date}${d.time ? ` ${d.time}` : ""}`,
    d.tripType === "round-trip" && "Round trip",
    d.flight && `Flight: ${d.flight}`,
    (d.passengers || d.pax) && `Passengers: ${d.passengers ?? d.pax}`,
    d.vehicle && `Vehicle: ${d.vehicle}`,
    d.childSeat === "yes" && "Child seat required",
  ].filter(Boolean) as string[];

  return {
    customer: { name, phone: d.phone ?? "", address: "" },
    items: [{ desc, qty: "1", price: suggestFare(d) }],
    notes: noteBits.join(" · "),
  };
}

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand-green";
const labelClass = "text-xs font-semibold text-zinc-500 uppercase tracking-wide";

export default function DocumentBuilder() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  const [docType, setDocType] = useState<DocType>("quotation");
  const [number, setNumber] = useState(() => genNumber("QT"));
  const [date, setDate] = useState(() => todayISO());
  const [secondDate, setSecondDate] = useState(() => todayISO(7));
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [items, setItems] = useState<Item[]>([
    { desc: "Airport Transfer — Kuwait International Airport", qty: "1", price: "" },
  ]);
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [paid, setPaid] = useState(false);
  const [payMethod, setPayMethod] = useState("Cash");
  const [currency, setCurrency] = useState<Currency>("KWD");

  // persistence
  const [savedDocs, setSavedDocs] = useState<SavedDoc[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const money = (n: number) => fmtCur(n, currency);
  const cur = CURRENCIES[currency];

  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const loadList = async () => {
    const token = await getToken();
    if (!token) return;
    try {
      const res = await fetch("/api/admin/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setSavedDocs(json.rows ?? []);
      }
    } catch {
      /* list is non-critical */
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Consume a booking passed from the admin dashboard (one-shot) + load saved list.
  useEffect(() => {
    if (!session) return;
    const t = setTimeout(() => {
      try {
        const raw = sessionStorage.getItem("doc-prefill");
        if (raw) {
          sessionStorage.removeItem("doc-prefill");
          const filled = prefillFields(JSON.parse(raw) as Prefill);
          setCustomer(filled.customer);
          setItems(filled.items);
          setNotes(filled.notes);
        }
      } catch {
        /* ignore malformed prefill */
      }
      loadList();
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function buildPayload() {
    return {
      docType,
      number,
      date,
      secondDate,
      customer,
      items,
      discount,
      notes,
      paid,
      payMethod,
      currency,
    };
  }

  async function saveDocument() {
    const token = await getToken();
    if (!token) return;
    setSaving(true);
    setNotice("");
    try {
      const res = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: loadedId ?? undefined,
          docType,
          number,
          customerName: customer.name || null,
          total,
          currency,
          payload: buildPayload(),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setLoadedId(json.id);
        setNotice(loadedId ? "Updated ✓" : "Saved ✓");
        loadList();
      } else {
        setNotice("Save failed — try again.");
      }
    } catch {
      setNotice("Save failed — try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotice(""), 3000);
    }
  }

  function loadSaved(doc: SavedDoc) {
    const p = doc.payload as ReturnType<typeof buildPayload>;
    setDocType(p.docType ?? doc.doc_type);
    setNumber(p.number ?? doc.number);
    setDate(p.date ?? todayISO());
    setSecondDate(p.secondDate ?? todayISO(7));
    setCustomer(p.customer ?? { name: "", phone: "", address: "" });
    setItems(p.items?.length ? p.items : [{ desc: "", qty: "1", price: "" }]);
    setDiscount(p.discount ?? "");
    setNotes(p.notes ?? "");
    setPaid(!!p.paid);
    setPayMethod(p.payMethod ?? "Cash");
    setCurrency((p.currency as Currency) ?? "KWD");
    setLoadedId(doc.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteSaved(id: string) {
    if (!window.confirm("Delete this saved document?")) return;
    const token = await getToken();
    if (!token) return;
    setSavedDocs((d) => d.filter((x) => x.id !== id));
    if (loadedId === id) setLoadedId(null);
    await fetch(`/api/admin/documents?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => loadList());
  }

  function newDocument() {
    setLoadedId(null);
    setNumber(genNumber(docMeta[docType].prefix));
    setCustomer({ name: "", phone: "", address: "" });
    setItems([{ desc: "", qty: "1", price: "" }]);
    setDiscount("");
    setNotes("");
    setPaid(docType === "receipt");
  }

  function switchType(t: DocType) {
    setDocType(t);
    setNumber(genNumber(docMeta[t].prefix));
    if (t === "receipt") setPaid(true);
  }

  function updateItem(i: number, patch: Partial<Item>) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }

  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => {
        const q = parseFloat(it.qty) || 0;
        const p = parseFloat(it.price) || 0;
        return sum + q * p;
      }, 0),
    [items]
  );
  const discountNum = parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountNum);

  function whatsappText() {
    const meta = docMeta[docType];
    const lines = [
      `${meta.title} ${number} — Kuwait Taxi Service`,
      `Date: ${date}`,
      customer.name && `Customer: ${customer.name}`,
      "",
      ...items
        .filter((it) => it.desc.trim())
        .map((it) => {
          const amount = (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0);
          return `• ${it.desc} x${it.qty || "1"} — ${money(amount)}`;
        }),
      "",
      discountNum > 0 && `Discount: -${money(discountNum)}`,
      `TOTAL: ${money(total)}`,
      docType === "receipt" && `Paid by ${payMethod} — thank you!`,
      docType === "invoice" && (paid ? "Status: PAID" : "Status: UNPAID"),
      docType === "quotation" && `Valid until: ${secondDate}`,
      notes && `Note: ${notes}`,
      "",
      "Kuwait Taxi Service — +965 9789 6907",
    ].filter((l) => l !== false && l !== undefined && l !== null);
    const digits = customer.phone.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!checked) return null;

  if (!session) {
    return (
      <AdminShell center>
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5">
          <FileText className="h-10 w-10 text-brand-green" />
          <h1 className="text-xl font-bold text-zinc-900">Documents — Admin Only</h1>
          <p className="text-sm text-zinc-500">Please sign in to the admin panel first.</p>
          <Link
            href="/admin"
            className="flex h-11 items-center gap-2 rounded-full bg-brand-green px-6 text-sm font-semibold text-white hover:bg-brand-green-dark"
          >
            Go to Admin Login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AdminShell>
    );
  }

  const meta = docMeta[docType];

  return (
    <AdminShell userEmail={session.user.email} onLogout={() => supabase.auth.signOut()}>
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 lg:grid-cols-[380px_1fr]">
        {/* ------- Form ------- */}
        <div className="no-print flex flex-col gap-5">
          <div className="flex gap-2">
            {(Object.keys(docMeta) as DocType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => switchType(t)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold capitalize transition-colors ${
                  docType === t
                    ? "bg-brand-green text-white"
                    : "bg-white text-zinc-600 ring-1 ring-black/10 hover:bg-zinc-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Number</label>
                <input value={number} onChange={(e) => setNumber(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
              </div>
            </div>

            {docType === "quotation" && (
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Valid Until</label>
                <input type="date" value={secondDate} onChange={(e) => setSecondDate(e.target.value)} className={inputClass} />
              </div>
            )}
            {docType === "invoice" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Due Date</label>
                  <input type="date" value={secondDate} onChange={(e) => setSecondDate(e.target.value)} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Status</label>
                  <button
                    type="button"
                    onClick={() => setPaid((p) => !p)}
                    className={`rounded-lg px-3 py-2 text-sm font-bold ${paid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
                  >
                    {paid ? "PAID" : "UNPAID"}
                  </button>
                </div>
              </div>
            )}
            {docType === "receipt" && (
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Payment Method</label>
                <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} className={inputClass}>
                  <option>Cash</option>
                  <option>KNET</option>
                  <option>Credit / Debit Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <span className={labelClass}>Customer</span>
            <input
              placeholder="Customer name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className={inputClass}
            />
            <input
              placeholder="Phone (+965...)"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className={inputClass}
              dir="ltr"
            />
            <input
              placeholder="Address / area (optional)"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Line Items ({cur.label})</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                aria-label="Currency"
                className="rounded-lg border border-zinc-300 px-2 py-1.5 text-xs font-semibold text-zinc-700 outline-none focus:border-brand-green"
              >
                {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                  <option key={c} value={c}>
                    {c} — {CURRENCIES[c].name}
                  </option>
                ))}
              </select>
            </div>
            {items.map((it, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex flex-1 flex-col gap-2">
                  <input
                    placeholder="Description (e.g. Airport Transfer — Salmiya)"
                    value={it.desc}
                    onChange={(e) => updateItem(i, { desc: e.target.value })}
                    className={inputClass}
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      value={it.qty}
                      onChange={(e) => updateItem(i, { qty: e.target.value })}
                      className={`${inputClass} w-20`}
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.001"
                      placeholder={`Unit price (${cur.label})`}
                      value={it.price}
                      onChange={(e) => updateItem(i, { price: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setItems((arr) => arr.filter((_, idx) => idx !== i))}
                  disabled={items.length === 1}
                  aria-label="Remove item"
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setItems((arr) => [...arr, { desc: "", qty: "1", price: "" }])}
              className="flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add item
            </button>

            <div className="grid grid-cols-2 gap-3 border-t border-zinc-100 pt-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Discount ({cur.label})</label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0.000"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col justify-end text-right">
                <span className={labelClass}>Total</span>
                <span className="text-xl font-bold text-brand-green">{money(total)}</span>
              </div>
            </div>

            <textarea
              placeholder="Notes / terms (optional)"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-black font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <Printer className="h-5 w-5" />
              Print / Save PDF
            </button>
            <a
              href={customer.phone ? whatsappText() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!customer.phone}
              className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl font-semibold text-white transition-colors ${
                customer.phone
                  ? "bg-[#25D366] hover:bg-[#1fb355]"
                  : "pointer-events-none bg-zinc-300"
              }`}
            >
              <MessageCircle className="h-5 w-5" />
              Send on WhatsApp
            </a>
          </div>
          <p className="text-xs text-zinc-500">
            Print / Save PDF opens your browser&apos;s print dialog — choose
            &quot;Save as PDF&quot; as the destination. WhatsApp sends a text
            summary to the customer&apos;s number.
          </p>
        </div>

        {/* ------- Document preview ------- */}
        <div className="flex flex-col items-center">
          <div
            id="doc-sheet"
            className="relative w-full max-w-[794px] bg-white shadow-xl ring-1 ring-black/10"
          >
            {/* Stamp */}
            {(docType === "receipt" || (docType === "invoice" && paid)) && (
              <div className="absolute top-24 right-10 rotate-12 rounded-lg border-4 border-emerald-500 px-4 py-1 text-2xl font-black tracking-widest text-emerald-500 opacity-80">
                PAID
              </div>
            )}
            {docType === "invoice" && !paid && (
              <div className="absolute top-24 right-10 rotate-12 rounded-lg border-4 border-red-400 px-4 py-1 text-2xl font-black tracking-widest text-red-400 opacity-80">
                UNPAID
              </div>
            )}

            {/* Letterhead */}
            <div className="flex items-center justify-between bg-brand-green-dark px-10 py-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                  <CarFront className="h-7 w-7" strokeWidth={2} />
                </span>
                <div>
                  <div className="text-xl font-bold text-white">Kuwait Taxi Service</div>
                  <div className="text-xs text-emerald-200">
                    Taxi &amp; Airport Transfers — 24/7 across Kuwait
                  </div>
                </div>
              </div>
              <div className="max-w-[260px] text-right text-xs leading-5 text-emerald-100">
                <div dir="ltr">+965 9789 6907</div>
                <div>kuwaittaxiserviceq@gmail.com</div>
                <div>kuwaittaxiserviceq8.com</div>
                <div>
                  Office 34, Mezzanine Floor, Al-Manqaf Commercial Center, Block 4, Street 14,
                  Al-Manqaf
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-green via-brand-green to-brand-red" />

            <div className="px-10 py-8">
              {/* Title + meta */}
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-black tracking-wide text-zinc-900">{meta.title}</h1>
                <div className="text-right text-sm leading-6 text-zinc-600">
                  <div>
                    <span className="font-semibold text-zinc-900">No:</span> {number}
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-900">Date:</span> {date}
                  </div>
                  {docType === "quotation" && (
                    <div>
                      <span className="font-semibold text-zinc-900">Valid until:</span> {secondDate}
                    </div>
                  )}
                  {docType === "invoice" && (
                    <div>
                      <span className="font-semibold text-zinc-900">Due:</span> {secondDate}
                    </div>
                  )}
                  {docType === "receipt" && (
                    <div>
                      <span className="font-semibold text-zinc-900">Paid by:</span> {payMethod}
                    </div>
                  )}
                </div>
              </div>

              {/* Customer */}
              <div className="mt-8 rounded-xl bg-zinc-50 px-5 py-4">
                <div className="text-xs font-bold tracking-wide text-zinc-400 uppercase">
                  {docType === "receipt" ? "Received From" : "Bill To"}
                </div>
                <div className="mt-1 font-semibold text-zinc-900">
                  {customer.name || "—"}
                </div>
                <div className="text-sm text-zinc-600" dir="ltr">
                  {customer.phone}
                </div>
                {customer.address && (
                  <div className="text-sm text-zinc-600">{customer.address}</div>
                )}
              </div>

              {/* Items */}
              <table className="mt-8 w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-zinc-900 text-left text-xs font-bold tracking-wide text-zinc-500 uppercase">
                    <th className="py-2">Description</th>
                    <th className="w-16 py-2 text-center">Qty</th>
                    <th className="w-28 py-2 text-right">Unit Price</th>
                    <th className="w-28 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items
                    .filter((it) => it.desc.trim() || it.price)
                    .map((it, i) => {
                      const q = parseFloat(it.qty) || 0;
                      const p = parseFloat(it.price) || 0;
                      return (
                        <tr key={i} className="border-b border-zinc-100">
                          <td className="py-3 text-zinc-800">{it.desc || "—"}</td>
                          <td className="py-3 text-center text-zinc-600">{it.qty || "1"}</td>
                          <td className="py-3 text-right text-zinc-600">{money(p)}</td>
                          <td className="py-3 text-right font-semibold text-zinc-900">
                            {money(q * p)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-6 flex justify-end">
                <div className="w-64 text-sm">
                  <div className="flex justify-between py-1.5 text-zinc-600">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  {discountNum > 0 && (
                    <div className="flex justify-between py-1.5 text-zinc-600">
                      <span>Discount</span>
                      <span>-{money(discountNum)}</span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t-2 border-zinc-900 py-2 text-base font-bold text-zinc-900">
                    <span>{docType === "receipt" ? "Amount Received" : "Total"}</span>
                    <span className="text-brand-green">{money(total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {notes && (
                <div className="mt-8 rounded-xl border border-zinc-200 px-5 py-3 text-sm text-zinc-600">
                  <span className="font-semibold text-zinc-900">Notes: </span>
                  {notes}
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 flex items-end justify-between border-t border-zinc-100 pt-6">
                <div className="text-xs leading-5 text-zinc-500">
                  {docType === "quotation" && (
                    <>Prices are in {cur.name} and valid until {secondDate}.<br /></>
                  )}
                  {docType !== "quotation" && (
                    <>All amounts are in {cur.name}.<br /></>
                  )}
                  Payment accepted by Cash, KNET, or card.
                  <br />
                  Thank you for riding with Kuwait Taxi Service.
                </div>
                <div className="text-center">
                  <div className="h-10 w-44 border-b border-zinc-400" />
                  <div className="mt-1 text-xs text-zinc-500">Authorized Signature</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
