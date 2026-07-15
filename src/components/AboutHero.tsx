import Link from "next/link";

export default function AboutHero() {
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
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          About Kuwait Taxi Service
        </h1>
        <p className="text-zinc-300">
          Kuwait Taxi Service provides licensed, KWI-authorized transport
          with a desert-ready fleet and full commercial insurance. Our
          drivers navigate Kuwait&apos;s highways and city traffic to
          ensure on-time arrivals at fixed fares — with real-time flight
          tracking and professional accountability, we offer corporate
          travelers and families the most reliable, stress-free
          transfers across Kuwait.
        </p>
        <Link
          href="/reservation"
          className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          Reserve Your Ride
        </Link>
      </div>
    </section>
  );
}
