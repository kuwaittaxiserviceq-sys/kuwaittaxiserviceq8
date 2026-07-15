import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";

export default function SaudiHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-black to-brand-green-dark py-24 sm:py-28">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-green/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-brand-red/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-red-400">
          <ArrowLeftRight className="h-4 w-4" />
          Kuwait ⇄ Saudi Arabia &middot; Door to Door
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Kuwait to Saudi Arabia Border-Crossing Taxi
        </h1>
        <p className="text-zinc-300">
          Direct, door-to-door rides between Kuwait and every major Saudi
          city and airport — Khafji, Dammam, Khobar, Riyadh, Jeddah,
          Makkah, and Madinah — in the same vehicle the whole way, with
          your driver handling the border formalities. Both directions,
          24/7.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/reservation"
            className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Book a Saudi Transfer
          </Link>
          <a
            href="https://wa.me/96518008080?text=Hi%2C%20I%20want%20to%20book%20a%20Kuwait%20%E2%86%94%20Saudi%20Arabia%20transfer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
