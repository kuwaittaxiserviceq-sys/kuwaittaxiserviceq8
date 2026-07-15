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
  title: "Our Rates | Kuwait Taxi Service",
  description:
    "Flat-rate taxi and airport transfer prices across every governorate in Kuwait. Search fares by city or area, sedan to 14-passenger van.",
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
