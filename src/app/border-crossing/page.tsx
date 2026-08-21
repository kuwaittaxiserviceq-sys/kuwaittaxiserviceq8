import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Car,
  FileCheck,
  Landmark,
  MapPin,
  MoveRight,
  PlaneLanding,
  Route,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import ReserveCta from "@/components/ReserveCta";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { saudiRoutes } from "@/components/saudiRoutes";
import { gccRoutes } from "@/components/gccRoutes";
import { slugifyArea } from "@/lib/areas";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/border-crossing" },
  title: "Kuwait Border Crossing Taxi | Cross-Border Transportation Guide",
  description:
    "Everything you need to know about crossing the Kuwait–Saudi Arabia border by taxi — the Nuwaiseeb crossing, required documents, private vs shared transport, and routes to Dammam, Riyadh, Bahrain and the UAE.",
};

const requirements = [
  {
    title: "Passport or Civil ID",
    description:
      "A passport valid for at least 6 months is the standard requirement for most nationalities. GCC nationals can typically cross using their civil ID instead. Requirements can vary by nationality, so confirm your specific case before travel.",
  },
  {
    title: "Visa for Your Destination",
    description:
      "Saudi Arabia, Bahrain and the UAE each have their own visa rules — eVisa, Umrah visa, visit visa, or GCC exemptions depending on your nationality. Check the relevant embassy or official government portal for the current rules that apply to you.",
  },
  {
    title: "Return Entry Documents",
    description:
      "If Kuwait isn't your home country, make sure your Kuwait visa or residency (iqama) will still be valid when you return, so re-entry isn't held up at the border.",
  },
  {
    title: "Documents for Children",
    description:
      "Children need their own passport or ID and, in many cases, additional documentation if travelling with only one parent or a guardian. Confirm requirements for your family's situation in advance.",
  },
];

const vehicleOptions = [
  {
    icon: Car,
    title: "Sedan — Solo or Couple",
    description: "The most economical option for one or two passengers with standard luggage.",
  },
  {
    icon: Users,
    title: "SUV — Small Families",
    description: "Extra space and comfort for families or small groups travelling together with more bags.",
  },
  {
    icon: Briefcase,
    title: "Van — Groups & Umrah Parties",
    description: "8–14 seats for larger families, staff groups, or Umrah parties, with room for luggage and gifts.",
  },
];

const borderFaqs = [
  {
    question: "Which border crossing do taxis use between Kuwait and Saudi Arabia?",
    answer:
      "The only land crossing between Kuwait and Saudi Arabia is at Nuwaiseeb on the Kuwaiti side, opposite Al-Khafji on the Saudi side. Routes to Bahrain continue on from Saudi Arabia's Eastern Province via the King Fahd Causeway; routes to the UAE continue further south through Saudi Arabia to the UAE border.",
  },
  {
    question: "Do I need a different visa for each country I pass through?",
    answer:
      "Generally yes — travelling from Kuwait to Bahrain or the UAE means transiting Saudi Arabia, so you typically need valid entry permissions for every country on the route, not just the final destination. Visa rules differ by nationality and change over time, so verify the current requirements with each country's official channels before you book.",
  },
  {
    question: "How long does border processing usually take?",
    answer:
      "It varies by time of day, day of the week, and how busy the crossing is — processing can be quick or take longer during peak travel periods like holiday weekends. We don't quote a fixed number because it genuinely depends on conditions on the day; your driver will keep you updated.",
  },
  {
    question: "Should I book a private taxi or use shared transportation?",
    answer:
      "A private taxi means one vehicle and one driver for your entire party, door to door, with a fixed fare agreed before you travel. Shared transportation (shared taxis or buses) usually costs less per seat but means fixed departure times, sharing the vehicle with strangers, and sometimes changing vehicles at the border — worth weighing against your budget and priorities.",
  },
  {
    question: "Can I be picked up from Kuwait International Airport before crossing the border?",
    answer:
      "Yes — many travellers combine an airport pickup with a cross-border trip in a single booking, so you land at Kuwait International Airport and continue straight to Saudi Arabia, Bahrain, or the UAE in the same vehicle without a separate transfer into the city first.",
  },
];

const borderSchema = serviceSchema({
  name: "Kuwait Border Crossing Taxi",
  description:
    "Cross-border taxi transportation from Kuwait through the Nuwaiseeb land border to Saudi Arabia, Bahrain, and the UAE — same vehicle door to door, with border formalities handled by your driver.",
  path: "/border-crossing",
});

const borderBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Border Crossing Taxi", path: "/border-crossing" },
]);

export default function BorderCrossingPage() {
  return (
    <>
      <JsonLd data={borderSchema} />
      <JsonLd data={borderBreadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        {/* Hero */}
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
              <Landmark className="h-4 w-4" />
              Nuwaiseeb &middot; Kuwait&apos;s Only Land Border
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kuwait Border Crossing Taxi: Your Cross-Border Transportation Guide
            </h1>
            <p className="text-zinc-300">
              A private, door-to-door taxi is one of the simplest ways to
              cross from Kuwait into Saudi Arabia, Bahrain, or the UAE — one
              vehicle, one driver, and no changing transport at the border.
              Here&apos;s how the crossing works and what to have ready.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/96597896907?text=Hi%2C%20I%20want%20to%20ask%20about%20a%20cross-border%20taxi%20from%20Kuwait"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                Ask on WhatsApp
              </a>
              <a
                href="tel:+96597896907"
                className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call: 9789 6907
              </a>
            </div>
          </div>
        </section>

        {/* The crossing itself */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="mx-auto flex max-w-3xl flex-col gap-6">
            <SectionHeading
              eyebrow="The Land Border"
              title="Crossing at Nuwaiseeb"
              align="left"
            />
            <p className="text-zinc-600">
              Every road route from Kuwait into Saudi Arabia — and onward to
              Bahrain via the King Fahd Causeway, or south through Saudi
              Arabia toward the UAE — passes through the{" "}
              <strong>Nuwaiseeb border crossing</strong>, opposite Al-Khafji
              on the Saudi side. It&apos;s the only land border between
              Kuwait and Saudi Arabia, which makes it the starting point for
              every{" "}
              <Link href="/saudi-transfers" className="font-semibold text-brand-green hover:underline">
                Kuwait to Saudi Arabia taxi
              </Link>{" "}
              journey.
            </p>
            <p className="text-zinc-600">
              With a private{" "}
              <Link href="/border-crossing" className="font-semibold text-brand-green hover:underline">
                cross-border taxi service
              </Link>
              , you don&apos;t need to work out the process yourself — your
              driver handles the vehicle paperwork and guides you through
              passport control, and you stay with your luggage the entire
              time. Processing time at any land border can vary with traffic
              and time of day, so we don&apos;t promise an exact number of
              minutes; your driver will keep you updated in real time.
            </p>
          </Container>
        </section>

        {/* Documents */}
        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-12">
            <SectionHeading
              eyebrow="Before You Travel"
              title="Documents & Travel Requirements"
              description="Rules are set by government authorities and can change — always confirm the latest requirements for your nationality before booking."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {requirements.map(({ title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                    <FileCheck className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                  <p className="text-sm leading-6 text-zinc-600">{description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Private vs shared */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="mx-auto flex max-w-3xl flex-col gap-6">
            <SectionHeading
              eyebrow="Choosing How to Travel"
              title="Private Taxi vs Shared Transportation"
              align="left"
            />
            <p className="text-zinc-600">
              Travellers crossing from Kuwait generally choose between a{" "}
              <strong>private taxi</strong> and{" "}
              <strong>shared transportation</strong> such as shared taxis or
              intercity buses. A{" "}
              <Link href="/saudi-transfers" className="font-semibold text-brand-green hover:underline">
                private taxi from Kuwait
              </Link>{" "}
              means one vehicle reserved for your party alone, a fixed fare
              agreed before you travel, and a departure time that suits you
              — with no changing vehicles at the border.
            </p>
            <p className="text-zinc-600">
              Shared transportation can cost less per seat, but usually runs
              on fixed schedules, seats you alongside other passengers, and
              sometimes requires switching vehicles at the crossing. For
              families, groups, business travellers, or anyone carrying
              extra luggage, a private{" "}
              <Link href="/gcc-transfers" className="font-semibold text-brand-green hover:underline">
                Saudi Arabia taxi service
              </Link>{" "}
              is generally the more predictable option.
            </p>
          </Container>
        </section>

        {/* Airport to border */}
        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white">
              <PlaneLanding className="h-6 w-6" />
            </span>
            <SectionHeading
              eyebrow="Combined Journeys"
              title="From the Airport, Straight to the Border"
            />
            <p className="text-zinc-600">
              You don&apos;t need a separate transfer into Kuwait City before
              starting a cross-border trip. Many travellers land at{" "}
              <Link href="/airport-taxi" className="font-semibold text-brand-green hover:underline">
                Kuwait International Airport
              </Link>{" "}
              and continue directly to Nuwaiseeb and on to their Saudi,
              Bahraini, or Emirati destination in the same vehicle — useful
              for business trips, Umrah journeys, and family visits where
              every hour matters.
            </p>
          </Container>
        </section>

        {/* Vehicle options */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-12">
            <SectionHeading
              eyebrow="Taxi Options"
              title="The Right Vehicle for Your Group"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {vehicleOptions.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-brand-green-light/50 p-6 ring-1 ring-black/5"
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

        {/* Routes grid */}
        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-10">
            <SectionHeading
              eyebrow="Where You Can Go"
              title="Cross-Border Routes from Kuwait"
              description="Every route below crosses at Nuwaiseeb. Select a destination for its exact distance, journey time, and fixed fare."
            />
            <div className="flex flex-wrap justify-center gap-3">
              {saudiRoutes.map((r) => (
                <Link
                  key={r.city}
                  href={`/saudi-transfers/${slugifyArea(r.city)}`}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 ring-1 ring-black/5 transition-colors hover:bg-brand-green hover:text-white"
                >
                  <MapPin className="h-4 w-4" />
                  {r.city}, Saudi Arabia
                </Link>
              ))}
              {gccRoutes.map((r) => (
                <Link
                  key={r.city}
                  href={`/gcc-transfers/${slugifyArea(r.city)}`}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 ring-1 ring-black/5 transition-colors hover:bg-brand-green hover:text-white"
                >
                  <MapPin className="h-4 w-4" />
                  {r.city}, {r.country}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <Link
                href="/saudi-transfers"
                className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
              >
                Full Kuwait ⇄ Saudi Arabia route list
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/gcc-transfers"
                className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
              >
                Kuwait ⇄ Bahrain &amp; UAE route list
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Container>
        </section>

        <Faq
          eyebrow="Border Crossing FAQs"
          title="Kuwait Border Crossing Taxi — Common Questions"
          description="What travellers ask most before a cross-border trip from Kuwait."
          faqs={borderFaqs}
        />

        <ReserveCta />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
