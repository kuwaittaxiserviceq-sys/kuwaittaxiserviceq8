import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-brand-black"
    >
      {/* Plain <img>, not next/image: the optimizer strips EXIF and this file
          carries GPS geo tags for local SEO. Already compressed to <100 KB. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/kuwait-taxi-service-hero.webp"
        alt="Kuwait taxi service — taxi driving along Gulf Road with Kuwait Towers and the city skyline at sunset"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-black/95 via-brand-black/75 to-brand-black/35" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-white sm:h-32" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pt-20 pb-14 lg:grid-cols-2 lg:items-center lg:pt-28 lg:pb-20">
        {/* Left: copy */}
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-red-400">
            <ShieldCheck className="h-4 w-4" />
            Kuwait&apos;s Trusted Airport Transfer Service
          </span>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Best Taxi Service in Kuwait —{" "}
            <span className="text-emerald-400">Reliable, On-Time</span>
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-300">
            Professional airport transfers and city rides across Kuwait.
            Flight-synchronized pickups, transparent flat fares, and
            licensed chauffeurs — available 24 hours a day.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-zinc-400">
              4.9/5 rated by 500+ riders across Kuwait
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#reservation"
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-brand-green px-7 text-base font-semibold text-white shadow-lg shadow-brand-green/30 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Book a Ride
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#fleet"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
            >
              View Our Fleet
            </a>
          </div>

          <a
            href="tel:+96555205485"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white transition-colors hover:border-emerald-400/30 hover:bg-white/10"
          >
            <Phone className="h-5 w-5 text-emerald-400" />
            <div className="text-sm">
              <div className="text-zinc-400">Call to book now</div>
              <div className="font-semibold">5520 5485</div>
            </div>
          </a>
        </div>

        {/* Right: quote form */}
        <div
          id="reservation"
          className="w-full max-w-md justify-self-start rounded-3xl bg-white p-7 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:p-8 lg:justify-self-end"
        >
          <h2 className="text-xl font-bold text-zinc-900">
            Request a Price Quote
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Fixed fare, confirmed instantly — no surge pricing.
          </p>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
