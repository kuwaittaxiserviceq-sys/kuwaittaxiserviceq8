"use client";

import { FormEvent } from "react";
import { CalendarDays, Clock, MapPin, Phone, User, Users } from "lucide-react";

export default function QuoteForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "New Quote Request",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Pickup: ${data.get("pickup")}`,
      `Drop-off: ${data.get("dropoff")}`,
      `Date: ${data.get("date")}  Time: ${data.get("time")}`,
      `Passengers: ${data.get("pax")}`,
    ];
    const url = `https://wa.me/96518008080?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green">
          <User className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="text"
            name="name"
            required
            placeholder="Full name"
            className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green">
          <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone number"
            className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 focus-within:border-brand-green">
        <MapPin className="h-5 w-5 shrink-0 text-brand-green" />
        <input
          type="text"
          name="pickup"
          required
          placeholder="Pickup location"
          className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 focus-within:border-brand-green">
        <MapPin className="h-5 w-5 shrink-0 text-brand-red" />
        <input
          type="text"
          name="dropoff"
          required
          placeholder="Drop-off location"
          className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="col-span-1 flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green">
          <CalendarDays className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="date"
            name="date"
            required
            aria-label="Pickup date"
            className="w-full text-sm text-zinc-900 outline-none"
          />
        </label>
        <label className="col-span-1 flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green">
          <Clock className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="time"
            name="time"
            required
            aria-label="Pickup time"
            className="w-full text-sm text-zinc-900 outline-none"
          />
        </label>
        <label className="col-span-1 flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-3 focus-within:border-brand-green">
          <Users className="h-4 w-4 shrink-0 text-zinc-400" />
          <input
            type="number"
            name="pax"
            min={1}
            required
            placeholder="Pax"
            aria-label="Passengers"
            className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-brand-red text-base font-semibold text-white transition-colors hover:bg-red-700"
      >
        Get Instant Quote on WhatsApp
      </button>
      <p className="text-center text-xs text-zinc-400">
        Opens WhatsApp with your trip details — we reply with a fixed fare in minutes.
      </p>
    </form>
  );
}
