import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, Clock3, MapPin, MoveRight, Route, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import RouteTimeBanner from "@/components/RouteTimeBanner";
import ReserveCta from "@/components/ReserveCta";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { gccRoutes } from "@/components/gccRoutes";
import { slugifyArea } from "@/lib/areas";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return gccRoutes.map((row) => ({ slug: slugifyArea(row.city) }));
}

function getRoute(slug: string) {
  return gccRoutes.find((row) => slugifyArea(row.city) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const row = getRoute(slug);
  if (!row) return {};

  return {
    alternates: { canonical: `/gcc-transfers/${slug}` },
    title: `Kuwait to ${row.city} Taxi | Fixed Fare from KD ${row.sedan} | ${row.duration}`,
    description: `Direct door-to-door taxi from Kuwait to ${row.city}, ${row.country} — fixed fare from KD ${row.sedan}, same vehicle the whole way, ${row.duration} journey, 24/7 both directions.`,
  };
}

const priceCards = (row: (typeof gccRoutes)[number]) => [
  { label: "Sedan (3 pax)", price: row.sedan },
  { label: "SUV (6 pax)", price: row.suv },
  { label: "Van (10 pax)", price: row.van },
];

const features = [
  {
    icon: Route,
    title: "Same Vehicle, Whole Way",
    description: "No transfers at any border — one driver, one car, door to door.",
  },
  {
    icon: ShieldCheck,
    title: "Every Border Handled",
    description: "Your driver manages crossing paperwork and tolls while you stay with your luggage.",
  },
  {
    icon: Clock3,
    title: "24/7, Both Directions",
    description: "Book outbound or return trips any hour — dispatch never closes.",
  },
];

export default async function GccRoutePage({ params }: Props) {
  const { slug } = await params;
  const row = getRoute(slug);
  if (!row) notFound();

  const otherRoutes = gccRoutes.filter((r) => r.city !== row.city);

  const routeSchema = serviceSchema({
    name: `Kuwait to ${row.city} Taxi`,
    description: `Fixed-fare door-to-door taxi from Kuwait to ${row.city}, ${row.country} — same vehicle the whole way, ${row.duration} journey.`,
    path: `/gcc-transfers/${slug}`,
    offers: [
      { name: "Sedan (3 pax)", price: row.sedan },
      { name: "SUV (6 pax)", price: row.suv },
      { name: "Van (10 pax)", price: row.van },
    ],
  });

  const routeBreadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Bahrain & UAE Transfers", path: "/gcc-transfers" },
    { name: row.city, path: `/gcc-transfers/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={routeSchema} />
      <JsonLd data={routeBreadcrumbs} />
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
              {row.country} &middot; {row.duration}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kuwait to {row.city} Taxi
            </h1>
            <p className="text-zinc-300">
              Direct, door-to-door taxi from Kuwait to {row.city} — same
              vehicle the whole way. Fixed fare from KD {row.sedan},
              available 24/7 in both directions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`https://wa.me/96597896907?text=${encodeURIComponent(
                  `Hi, I want a taxi from Kuwait to ${row.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                Get a Quote on WhatsApp
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

        <RouteTimeBanner duration={row.duration} distanceKm={row.distanceKm} fareFrom={row.sedan} />

        {/* Fares */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-10">
            <SectionHeading
              eyebrow="Fixed Fares"
              title={`Kuwait ⇄ ${row.city} Fares`}
              description="One-way, per vehicle (not per passenger) — the same fare applies in both directions."
            />
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
              {priceCards(row).map(({ label, price }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-brand-green-light/50 p-6 text-center ring-1 ring-black/5"
                >
                  <Car className="h-6 w-6 text-brand-green" strokeWidth={1.5} />
                  <span className="text-2xl font-bold text-zinc-900">KD {price}</span>
                  <span className="text-sm text-zinc-600">{label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/gcc-transfers"
              className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
            >
              See all Kuwait ⇄ Bahrain &amp; UAE routes
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Container>
        </section>

        {/* Transit info */}
        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow="How It Works"
              title={`Crossing Into ${row.country}`}
              description={row.transitNote}
            />
          </Container>
        </section>

        {/* Why choose us */}
        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-12">
            <SectionHeading
              eyebrow="Why Choose Us"
              title={`The Reliable Kuwait to ${row.city} Transfer`}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
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
            <Link
              href="/border-crossing"
              className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
            >
              What to expect at the Kuwait border crossing
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Container>
        </section>

        {/* Other routes */}
        {otherRoutes.length > 0 && (
          <section className="bg-brand-green-light/60 py-16 sm:py-20">
            <Container className="flex flex-col items-center gap-10">
              <SectionHeading eyebrow="More Destinations" title="Other Kuwait ⇄ GCC Routes" />
              <div className="flex flex-wrap justify-center gap-3">
                {otherRoutes.map((r) => (
                  <Link
                    key={r.city}
                    href={`/gcc-transfers/${slugifyArea(r.city)}`}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 ring-1 ring-black/5 transition-colors hover:bg-brand-green hover:text-white"
                  >
                    <MapPin className="h-4 w-4" />
                    {r.city}
                  </Link>
                ))}
                <Link
                  href="/saudi-transfers"
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 ring-1 ring-black/5 transition-colors hover:bg-brand-green hover:text-white"
                >
                  <MapPin className="h-4 w-4" />
                  Saudi Arabia routes
                </Link>
              </div>
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
