import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RatesHero from "@/components/RatesHero";
import RideInclusions from "@/components/RideInclusions";
import RatesTable from "@/components/RatesTable";
import TermsAndConditions from "@/components/TermsAndConditions";
import ReservationWhyChoose from "@/components/ReservationWhyChoose";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/rates" },
  title: "Taxi Fares in Kuwait | Airport Taxi Prices & Flat Rates | Kuwait Taxi Service",
  description:
    "Kuwait taxi fares and airport taxi prices for every governorate — search flat rates by area, from sedans to 14-passenger vans. No surge pricing, ever.",
};

export default function RatesPage() {
  return (
    <>
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
