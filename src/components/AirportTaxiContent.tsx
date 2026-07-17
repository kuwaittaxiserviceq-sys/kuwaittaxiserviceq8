import Link from "next/link";
import {
  CalendarCheck,
  Clock3,
  Luggage,
  MoveRight,
  PlaneLanding,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { ratesData } from "./ratesData";

export function AirportTaxiHero() {
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
          <PlaneLanding className="h-4 w-4" />
          Kuwait International Airport (KWI) &middot; 24/7
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Kuwait Airport Taxi — Fixed-Fare Transfers, Day &amp; Night
        </h1>
        <p className="text-zinc-300">
          Pre-book your Kuwait airport taxi and land stress-free: we track
          your flight, wait up to 60 minutes free, and meet you inside
          arrivals with a name sign. Fixed fare to every area in Kuwait —
          confirmed before you fly.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/reservation"
            className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Book Airport Taxi
          </Link>
          <a
            href="https://wa.me/96555205485?text=Hi%2C%20I%20need%20an%20airport%20taxi%20in%20Kuwait"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: CalendarCheck,
    title: "1. Book in Under a Minute",
    description:
      "Reserve online, by phone, or on WhatsApp with your flight number. Your fixed fare is confirmed instantly — no meters, no surge.",
  },
  {
    icon: PlaneLanding,
    title: "2. We Track Your Flight",
    description:
      "Your driver is dispatched against your flight's actual landing time — early arrivals and delays are handled automatically.",
  },
  {
    icon: UserCheck,
    title: "3. Meet Inside Arrivals",
    description:
      "Your chauffeur waits in the arrivals hall with a name sign, helps with luggage, and takes you straight to your door.",
  },
];

export function AirportTaxiSteps() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="How It Works"
          title="How to Book a Kuwait Airport Taxi"
          description="Three steps from booking to your doorstep — the same simple process for pickups and drop-offs."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl bg-brand-green-light/50 p-6 ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const popularAreas = ["Kuwait City", "Salmiya", "Hawalli", "Fahaheel", "Farwaniya", "Jahra", "Mangaf", "Jabriya"];

export function AirportFares() {
  const rows = ratesData.filter((r) => popularAreas.includes(r.area));

  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          eyebrow="Airport Taxi Fares"
          title="Fixed Fares from Kuwait Airport"
          description="One-way, per vehicle (not per passenger) — the same fare applies to and from the airport."
        />

        <div className="w-full overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Airport ⇄ Area</th>
                <th className="px-4 py-3 font-semibold">Sedan (3)</th>
                <th className="px-4 py-3 font-semibold">SUV (6)</th>
                <th className="px-4 py-3 font-semibold">Van (8)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => (
                <tr key={row.area} className="even:bg-zinc-50/60">
                  <td className="px-4 py-3 font-medium text-zinc-900">{row.area}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.sedan}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.suv}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.van8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href="/rates"
          className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
        >
          See fares for all 65+ areas in Kuwait
          <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}

const airportFeatures = [
  {
    icon: Clock3,
    title: "24/7 for Every Flight",
    description:
      "Dawn landings, midnight departures, delayed red-eyes — our dispatch never closes and your driver is always on time.",
  },
  {
    icon: PlaneLanding,
    title: "60 Minutes Free Waiting",
    description:
      "Waiting time is counted from your flight's actual touchdown, not the scheduled time — immigration queues are never your problem.",
  },
  {
    icon: Luggage,
    title: "Luggage & Family Ready",
    description:
      "Sedans for up to 3 bags, SUVs and vans for family-sized luggage, and free certified child seats on request.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed Airport Operator",
    description:
      "Commercially licensed, insured vehicles and vetted chauffeurs — the safe alternative to unmarked airport touts.",
  },
];

export function AirportWhyUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Why Pre-Book With Us"
          title="The Reliable Kuwait Airport Transfer"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {airportFeatures.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
