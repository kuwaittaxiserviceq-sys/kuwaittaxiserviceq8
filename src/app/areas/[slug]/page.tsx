import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Car,
  Clock3,
  MapPin,
  MoveRight,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ReserveCta from "@/components/ReserveCta";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { ratesData } from "@/components/ratesData";
import { slugifyArea, governorateIntros } from "@/lib/areas";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ratesData.map((row) => ({ slug: slugifyArea(row.area) }));
}

function getArea(slug: string) {
  return ratesData.find((row) => slugifyArea(row.area) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const row = getArea(slug);
  if (!row) return {};

  return {
    alternates: { canonical: `/areas/${slug}` },
    title: `Taxi Service in ${row.area}, Kuwait | Fixed Fares from KD ${row.sedan} | Kuwait Taxi Service`,
    description: `24/7 taxi and airport transfer service in ${row.area}, ${row.governorate} Governorate. Fixed fares from KD ${row.sedan} for sedans, licensed chauffeurs, no surge pricing.`,
  };
}

const priceCards = (row: (typeof ratesData)[number]) => [
  { label: "Sedan (3 pax)", price: row.sedan },
  { label: "SUV (6 pax)", price: row.suv },
  { label: "Van (8 pax)", price: row.van8 },
  { label: "Van (14 pax)", price: row.van14 },
];

const features = [
  {
    icon: Clock3,
    title: "24/7 Availability",
    description: "Dispatch never closes — book a ride at any hour, day or night.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "Commercially licensed chauffeurs, vetted and background-checked.",
  },
  {
    icon: Wallet,
    title: "Fixed, Flat Fares",
    description: "Your price is agreed before the ride — no meters, no surge pricing.",
  },
  {
    icon: MapPin,
    title: "Local Route Knowledge",
    description: "Drivers who know every street, shortcut, and landmark in the area.",
  },
];

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const row = getArea(slug);
  if (!row) notFound();

  const nearbyAreas = ratesData
    .filter((r) => r.governorate === row.governorate && r.area !== row.area)
    .slice(0, 8);

  const areaSchema = serviceSchema({
    name: `Taxi Service in ${row.area}`,
    description: `Fixed-fare taxi and airport transfer service in ${row.area}, ${row.governorate} Governorate, Kuwait.`,
    path: `/areas/${slug}`,
    offers: [
      { name: "Sedan (3 pax)", price: row.sedan },
      { name: "SUV (6 pax)", price: row.suv },
      { name: "Van (8 pax)", price: row.van8 },
      { name: "Van (14 pax)", price: row.van14 },
    ],
  });

  const areaBreadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Areas We Serve", path: "/areas" },
    { name: row.area, path: `/areas/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={areaSchema} />
      <JsonLd data={areaBreadcrumbs} />
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
              <MapPin className="h-4 w-4" />
              {`${row.governorate} Governorate · 24/7`}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Taxi Service in {row.area}, Kuwait
            </h1>
            <p className="text-zinc-300">
              Fixed-fare taxi and airport transfers in {row.area} — licensed
              chauffeurs, transparent pricing, and pickups available around
              the clock. Fares start from KD {row.sedan}.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/reservation"
                className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                Book a Ride in {row.area}
              </Link>
              <a
                href={`https://wa.me/96555205485?text=${encodeURIComponent(
                  `Hi, I need a taxi in ${row.area}, Kuwait`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Fares */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-10">
            <SectionHeading
              eyebrow="Fixed Fares"
              title={`${row.area} ⇄ Kuwait Airport Fares`}
              description="One-way, per vehicle (not per passenger) — the same fare applies to and from the airport."
            />
            <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
              {priceCards(row).map(({ label, price }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-brand-green-light/50 p-6 text-center ring-1 ring-black/5"
                >
                  <Car className="h-6 w-6 text-brand-green" strokeWidth={1.5} />
                  <span className="text-2xl font-bold text-zinc-900">
                    KD {price}
                  </span>
                  <span className="text-sm text-zinc-600">{label}</span>
                </div>
              ))}
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

        {/* About the area */}
        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-4 text-center">
            <SectionHeading
              eyebrow="Coverage"
              title={`Serving ${row.area} and All of ${row.governorate}`}
              description={governorateIntros[row.governorate]}
            />
          </Container>
        </section>

        {/* Why choose us */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-12">
            <SectionHeading
              eyebrow="Why Choose Us"
              title={`The Reliable Taxi Service for ${row.area}`}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex flex-col items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Nearby areas */}
        {nearbyAreas.length > 0 && (
          <section className="bg-brand-green-light/60 py-16 sm:py-20">
            <Container className="flex flex-col items-center gap-10">
              <SectionHeading
                eyebrow="Nearby"
                title={`Other Areas We Serve in ${row.governorate}`}
              />
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyAreas.map((r) => (
                  <Link
                    key={r.area}
                    href={`/areas/${slugifyArea(r.area)}`}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 ring-1 ring-black/5 transition-colors hover:bg-brand-green hover:text-white"
                  >
                    <MapPin className="h-4 w-4" />
                    {r.area}
                  </Link>
                ))}
              </div>
              <Link
                href="/areas"
                className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
              >
                View all areas we serve
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Container>
          </section>
        )}

        <ReserveCta />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
