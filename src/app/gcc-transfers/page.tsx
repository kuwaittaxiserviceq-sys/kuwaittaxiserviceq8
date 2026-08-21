import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, MapPin, MoveRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import ReserveCta from "@/components/ReserveCta";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { gccRoutes } from "@/components/gccRoutes";
import { slugifyArea } from "@/lib/areas";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/gcc-transfers" },
  title: "Kuwait to Bahrain & UAE Taxi | Manama, Dubai & Abu Dhabi Transfers",
  description:
    "Door-to-door taxi from Kuwait to Bahrain (Manama) and the UAE (Dubai, Abu Dhabi) — fixed KWD fares, same vehicle the whole way, 24/7 both directions.",
};

const gccFaqs = [
  {
    question: "Do I need a visa to travel from Kuwait to Bahrain or the UAE by road?",
    answer:
      "Yes. GCC nationals can travel on a civil ID; other nationalities typically need a valid visa for each country on the route, including Saudi Arabia, which you transit through. Confirm your specific visa requirements before booking.",
  },
  {
    question: "Do I change vehicles at any border?",
    answer:
      "No — you stay in the same vehicle with the same driver for the entire trip, including the Kuwait–Saudi border and the King Fahd Causeway or the Saudi–UAE crossing.",
  },
  {
    question: "How long does the Kuwait to Dubai or Abu Dhabi trip take?",
    answer:
      "Around 11.5–12.5 hours of driving via Saudi Arabia, plus border processing time. We schedule rest stops along the way and can split the journey with an overnight stop on request.",
  },
  {
    question: "What's the fastest way to reach Bahrain from Kuwait?",
    answer:
      "By road via Saudi Arabia's Eastern Province and the King Fahd Causeway — around 6.5 hours door to door, faster than connecting flights for many travelers.",
  },
];

const gccSchema = serviceSchema({
  name: "Kuwait to Bahrain and UAE Taxi",
  description:
    "Door-to-door taxi between Kuwait and Bahrain (Manama) and the UAE (Dubai, Abu Dhabi) — same vehicle the whole way, fixed fares, 24/7, both directions.",
  path: "/gcc-transfers",
  offers: gccRoutes.map((r) => ({
    name: `Kuwait to ${r.city} — Sedan`,
    price: r.sedan,
  })),
});

const gccBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Bahrain & UAE Transfers", path: "/gcc-transfers" },
]);

export default function GccTransfersPage() {
  return (
    <>
      <JsonLd data={gccSchema} />
      <JsonLd data={gccBreadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
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
              <Globe2 className="h-4 w-4" />
              Kuwait ⇄ Bahrain &amp; UAE &middot; Door to Door
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kuwait to Bahrain &amp; UAE — Door-to-Door Taxi
            </h1>
            <p className="text-zinc-300">
              Direct road transfers from Kuwait to Manama, Dubai and Abu
              Dhabi — the same vehicle the whole way via Saudi Arabia, with
              your driver handling every border crossing. Both directions,
              24/7.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/96597896907?text=Hi%2C%20I%20want%20a%20quote%20for%20Kuwait%20to%20Bahrain%2FUAE"
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

        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Routes & Fares"
              title="Kuwait ⇄ Bahrain & UAE Routes"
              description="One-way fares per vehicle (not per passenger), in either direction. Distances measured from Kuwait City."
            />

            <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-brand-green-light text-zinc-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Destination</th>
                    <th className="px-4 py-3 font-semibold">Distance</th>
                    <th className="px-4 py-3 font-semibold">Duration*</th>
                    <th className="px-4 py-3 font-semibold">Sedan (3)</th>
                    <th className="px-4 py-3 font-semibold">SUV (6)</th>
                    <th className="px-4 py-3 font-semibold">Van (10)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {gccRoutes.map((route) => (
                    <tr key={route.city} className="even:bg-zinc-50/60">
                      <td className="px-4 py-3">
                        <Link
                          href={`/gcc-transfers/${slugifyArea(route.city)}`}
                          className="font-medium text-zinc-900 hover:text-brand-green hover:underline"
                        >
                          {route.city}
                        </Link>
                        <div className="text-xs text-zinc-500">{route.country}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{route.distanceKm} km</td>
                      <td className="px-4 py-3 text-zinc-600">{route.duration}</td>
                      <td className="px-4 py-3 font-semibold text-brand-green">KD {route.sedan}</td>
                      <td className="px-4 py-3 font-semibold text-brand-green">KD {route.suv}</td>
                      <td className="px-4 py-3 font-semibold text-brand-green">KD {route.van}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-zinc-500">
              *Durations include typical border processing. UAE routes
              transit through Saudi Arabia; Bahrain routes cross the King
              Fahd Causeway. Need a custom itinerary or a multi-day trip?
              Call{" "}
              <a href="tel:+96597896907" className="font-semibold text-brand-green">
                +965 9789 6907
              </a>{" "}
              for a tailored quote.
            </p>
          </Container>
        </section>

        <section className="bg-brand-green-light/60 py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-10">
            <SectionHeading
              eyebrow="How It Works"
              title="Crossing Into Bahrain & the UAE"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {gccRoutes.map((route) => (
                <div
                  key={route.city}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Kuwait &rarr; {route.city}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600">{route.transitNote}</p>
                </div>
              ))}
            </div>
            <Link
              href="/border-crossing"
              className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
            >
              Read our full Kuwait border crossing guide
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Container>
        </section>

        <Faq
          eyebrow="Bahrain & UAE FAQs"
          title="Kuwait ⇄ Bahrain & UAE — Common Questions"
          description="What to know before booking a longer GCC road transfer."
          faqs={gccFaqs}
        />

        <ReserveCta />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
