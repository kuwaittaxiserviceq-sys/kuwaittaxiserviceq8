import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RatesHero from "@/components/RatesHero";
import RideInclusions from "@/components/RideInclusions";
import RatesTable from "@/components/RatesTable";
import TermsAndConditions from "@/components/TermsAndConditions";
import ReservationWhyChoose from "@/components/ReservationWhyChoose";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { ratesData } from "@/components/ratesData";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/rates" },
  title: "Taxi Fares in Kuwait | Airport Taxi Prices & Flat Rates | Kuwait Taxi Service",
  description:
    "Kuwait taxi fares and airport taxi prices for every governorate — search flat rates by area, from sedans to 14-passenger vans. No surge pricing, ever.",
};

const allFares = ratesData.flatMap((r) => [r.sedan, r.suv, r.van8, r.van14]);

const ratesSchema = serviceSchema({
  name: "Taxi Rides Across Kuwait",
  description:
    "Flat-rate taxi fares to 65+ areas in every Kuwait governorate — sedans, SUVs, and 8–14 passenger vans at fixed prices with no surge pricing.",
  path: "/rates",
  aggregateOffer: {
    lowPrice: Math.min(...allFares),
    highPrice: Math.max(...allFares),
  },
});

const ratesBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Rates", path: "/rates" },
]);

export default function RatesPage() {
  return (
    <>
      <JsonLd data={ratesSchema} />
      <JsonLd data={ratesBreadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <RatesHero />
        <RideInclusions />
        <RatesTable />
        <TermsAndConditions />
        <ReservationWhyChoose />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
