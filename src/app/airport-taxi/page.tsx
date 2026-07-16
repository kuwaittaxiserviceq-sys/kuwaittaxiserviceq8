import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import {
  AirportFares,
  AirportTaxiHero,
  AirportTaxiSteps,
  AirportWhyUs,
} from "@/components/AirportTaxiContent";
import RideInclusions from "@/components/RideInclusions";
import Faq from "@/components/Faq";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/airport-taxi",
    languages: { en: "/airport-taxi", ar: "/ar/airport-taxi" },
  },
  title: "Kuwait Airport Taxi | 24/7 Airport Transfer at Fixed Fares (KWI)",
  description:
    "Pre-book your Kuwait airport taxi — meet & greet inside arrivals, flight tracking, 60 minutes free waiting, and fixed fares to every area. 24/7 at Kuwait International Airport. Call 5520 5485.",
};

const airportFaqs = [
  {
    question: "How do I book a taxi from Kuwait Airport?",
    answer:
      "Book online through our reservation page, by phone, or on WhatsApp at +965 5520 5485. Share your flight number and destination, and your fixed fare is confirmed instantly.",
  },
  {
    question: "Where does the driver meet me at Kuwait International Airport?",
    answer:
      "Your chauffeur waits inside the arrivals hall holding a sign with your name, and helps you with luggage to the car.",
  },
  {
    question: "What if my flight is delayed?",
    answer:
      "We track your flight in real time and dispatch the driver against the actual landing time, with 60 minutes of free waiting counted from touchdown — delays never cost you extra.",
  },
  {
    question: "How much is a taxi from Kuwait Airport to the city?",
    answer:
      "Fixed fares start from KD 6–8 for a sedan depending on your area — for example Kuwait City or Salmiya. Check the fare table above or our full rates page for all 65+ areas.",
  },
  {
    question: "Can I book an airport taxi for a night flight?",
    answer:
      "Yes — we operate 24/7, every day of the year. Late-night and early-morning pickups are our specialty, at the same fixed fares with no night surcharge.",
  },
  {
    question: "Do you provide child seats for airport pickups?",
    answer:
      "Yes, certified child seats are free on request — just mention them when booking.",
  },
  {
    question: "Can I pay by KNET or card for an airport taxi?",
    answer: "Yes — we accept cash, KNET, credit/debit cards, and online payment.",
  },
];

export default function AirportTaxiPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <AirportTaxiHero />
        <RideInclusions />
        <AirportTaxiSteps />
        <AirportFares />
        <AirportWhyUs />
        <Faq
          eyebrow="Airport Taxi FAQs"
          title="Kuwait Airport Taxi — Common Questions"
          description="Everything travelers ask before booking an airport transfer with us."
          faqs={airportFaqs}
        />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
