import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SaudiHero from "@/components/SaudiHero";
import RideInclusions from "@/components/RideInclusions";
import SaudiRoutesTable from "@/components/SaudiRoutesTable";
import BorderProcess from "@/components/BorderProcess";
import GccBanner from "@/components/GccBanner";
import Faq from "@/components/Faq";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { saudiRoutes } from "@/components/saudiRoutes";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/saudi-transfers" },
  title: "Kuwait to Saudi Arabia Taxi | Border Crossing Transfers | Kuwait Taxi Service",
  description:
    "Door-to-door taxi between Kuwait and all major Saudi cities and airports — Khafji, Dammam, Khobar, Riyadh, Jeddah, Makkah, Madinah. Same vehicle across the border, fixed fares, 24/7, both directions.",
};

const saudiFaqs = [
  {
    question: "Do I change vehicles at the Kuwait–Saudi border?",
    answer:
      "No. You stay in the same vehicle with the same driver for the entire journey, in both directions. Only passport control requires you to step out briefly.",
  },
  {
    question: "Which border crossing do you use?",
    answer:
      "We cross at Al-Nuwaiseeb (Al-Khafji) on the coastal route — the main crossing between Kuwait and Saudi Arabia's Eastern Province. For Riyadh and Qassim we route via the most efficient highway from there.",
  },
  {
    question: "Do you provide transport for Umrah from Kuwait?",
    answer:
      "Yes — direct rides to Makkah and Madinah are among our most requested Saudi routes. We schedule prayer and rest stops, and vans are available for families and groups.",
  },
  {
    question: "What documents do I need?",
    answer:
      "A passport with at least 6 months validity and a valid Saudi visa (eVisa, Umrah, or visit visa). GCC nationals can cross with their civil ID. For entry into Kuwait you need a valid Kuwait visa or residency.",
  },
  {
    question: "Can you pick me up from a Saudi airport and bring me to Kuwait?",
    answer:
      "Yes — we serve Dammam (DMM), Riyadh (RUH), Jeddah (JED), and Madinah (MED) airports in both directions, with flight tracking and meet & greet included.",
  },
  {
    question: "How is the fare calculated for cross-border trips?",
    answer:
      "Every route has a fixed, all-in fare per vehicle — fuel, driver, and border fees included. The price we quote before you book is exactly what you pay, in KD or SAR.",
  },
  {
    question: "Can I book a round trip with a stay in Saudi Arabia?",
    answer:
      "Yes. For multi-day trips (for example, Umrah with a 3-night stay), contact us for a package quote — it's cheaper than booking two one-way rides.",
  },
];

const saudiSchema = serviceSchema({
  name: "Kuwait to Saudi Arabia Taxi",
  description:
    "Door-to-door intercity taxi between Kuwait and all major Saudi cities and airports — same vehicle across the border, fixed fares, 24/7, both directions.",
  path: "/saudi-transfers",
  offers: saudiRoutes.map((r) => ({
    name: `Kuwait to ${r.city} — Sedan`,
    price: r.sedan,
  })),
});

const saudiBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Saudi Transfers", path: "/saudi-transfers" },
]);

export default function SaudiTransfersPage() {
  return (
    <>
      <JsonLd data={saudiSchema} />
      <JsonLd data={saudiBreadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <SaudiHero />
        <RideInclusions />
        <SaudiRoutesTable />
        <GccBanner />
        <BorderProcess />
        <Faq
          eyebrow="Border Crossing FAQs"
          title="Kuwait ⇄ Saudi Transfers — Common Questions"
          description="Everything you need to know before booking a cross-border ride."
          faqs={saudiFaqs}
        />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
