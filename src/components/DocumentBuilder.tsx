"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient, type Session } from "@supabase/supabase-js";
import {
  ArrowRight,
  CarFront,
  FileText,
  MessageCircle,
  Plus,
  Printer,
  Trash2,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
);

type DocType = "quotation" | "invoice" | "receipt";
type Item = { desc: string; qty: string; price: string };

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

const fmt = (n: number) => `KD ${n.toFixed(3)}`;

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

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
          return `• ${it.desc} x${it.qty || "1"} — ${fmt(amount)}`;
        }),
      "",
      discountNum > 0 && `Discount: -${fmt(discountNum)}`,
      `TOTAL: ${fmt(total)}`,
      docType === "receipt" && `Paid by ${payMethod} — thank you!`,
      docType === "invoice" && (paid ? "Status: PAID" : "Status: UNPAID"),
      docType === "quotation" && `Valid until: ${secondDate}`,
      notes && `Note: ${notes}`,
      "",
      "Kuwait Taxi Service — +965 5520 5485",
    ].filter((l) => l !== false && l !== undefined && l !== null);
    const digits = customer.phone.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!checked) return null;

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-100 px-6 text-center">
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
    );
  }

  const meta = docMeta[docType];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <header className="no-print bg-brand-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-bold text-white">Kuwait Taxi — Documents</span>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-zinc-300 hover:text-white">
            ← Back to Bookings
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-6 py-8 lg:grid-cols-[380px_1fr]">
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
            <span className={labelClass}>Line Items (KD)</span>
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
                      placeholder="Unit price (KD)"
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
                <label className={labelClass}>Discount (KD)</label>
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
                <span className="text-xl font-bold text-brand-green">{fmt(total)}</span>
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
              <div className="text-right text-xs leading-5 text-emerald-100">
                <div dir="ltr">+965 5520 5485</div>
                <div>kuwaittaxiserviceq@gmail.com</div>
                <div>kuwaittaxiserviceq8.com</div>
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
                          <td className="py-3 text-right text-zinc-600">{fmt(p)}</td>
                          <td className="py-3 text-right font-semibold text-zinc-900">
                            {fmt(q * p)}
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
                    <span>{fmt(subtotal)}</span>
                  </div>
                  {discountNum > 0 && (
                    <div className="flex justify-between py-1.5 text-zinc-600">
                      <span>Discount</span>
                      <span>-{fmt(discountNum)}</span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t-2 border-zinc-900 py-2 text-base font-bold text-zinc-900">
                    <span>{docType === "receipt" ? "Amount Received" : "Total"}</span>
                    <span className="text-brand-green">{fmt(total)}</span>
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
                    <>Prices are in Kuwaiti Dinar (KD) and valid until {secondDate}.<br /></>
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
      </main>
    </div>
  );
}
