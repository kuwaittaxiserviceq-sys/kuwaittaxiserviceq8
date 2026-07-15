import { Phone, ShieldCheck } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-black to-brand-green-dark"
    >
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

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
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

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#reservation"
              className="flex h-12 items-center justify-center rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Book a Ride
            </a>
            <a
              href="#fleet"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Our Fleet
            </a>
          </div>

          <a
            href="tel:+96555205485"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white"
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
          className="w-full max-w-md justify-self-start rounded-3xl bg-white p-7 shadow-2xl shadow-black/40 sm:p-8 lg:justify-self-end"
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
