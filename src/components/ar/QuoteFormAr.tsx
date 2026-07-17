"use client";

import { FormEvent } from "react";
import { CalendarDays, Clock, MapPin, Phone, User, Users } from "lucide-react";
import { notifyAdmin } from "@/lib/notify";

export default function QuoteFormAr() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    notifyAdmin("Quote Request (Arabic)", data);
    const lines = [
      "طلب عرض سعر جديد",
      `الاسم: ${data.get("name")}`,
      `الهاتف: ${data.get("phone")}`,
      `موقع الانطلاق: ${data.get("pickup")}`,
      `الوجهة: ${data.get("dropoff")}`,
      `التاريخ: ${data.get("date")}  الوقت: ${data.get("time")}`,
      `عدد الركاب: ${data.get("pax")}`,
    ];
    const url = `https://wa.me/96555205485?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const box =
    "flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green";
  const input =
    "w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400 bg-transparent";

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <label className={box}>
          <User className="h-4 w-4 shrink-0 text-zinc-400" />
          <input type="text" name="name" required placeholder="الاسم الكامل" className={input} />
        </label>
        <label className={box}>
          <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
          <input type="tel" name="phone" required placeholder="رقم الهاتف" className={input} dir="ltr" />
        </label>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 focus-within:border-brand-green">
        <MapPin className="h-5 w-5 shrink-0 text-brand-green" />
        <input type="text" name="pickup" required placeholder="موقع الانطلاق" className={input} />
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 focus-within:border-brand-green">
        <MapPin className="h-5 w-5 shrink-0 text-brand-red" />
        <input type="text" name="dropoff" required placeholder="الوجهة" className={input} />
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className={`${box} min-w-0`}>
          <CalendarDays className="h-4 w-4 shrink-0 text-zinc-400" />
          <input type="date" name="date" required aria-label="تاريخ الانطلاق" className={input} />
        </label>
        <label className={`${box} min-w-0`}>
          <Clock className="h-4 w-4 shrink-0 text-zinc-400" />
          <input type="time" name="time" required aria-label="وقت الانطلاق" className={input} />
        </label>
        <label className={`${box} col-span-2 min-w-0 sm:col-span-1`}>
          <Users className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="number"
            name="pax"
            min={1}
            required
            placeholder="الركاب"
            aria-label="عدد الركاب"
            className={input}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-brand-red text-base font-semibold text-white transition-colors hover:bg-red-700"
      >
        احصل على السعر عبر واتساب
      </button>
      <p className="text-center text-xs text-zinc-400">
        يفتح واتساب مع تفاصيل رحلتك — نرد عليك بسعر ثابت خلال دقائق.
      </p>
    </form>
  );
}
