import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReservationHero from "@/components/ReservationHero";
import ReservationForm from "@/components/ReservationForm";
import RideInclusions from "@/components/RideInclusions";
import ReservationWhyChoose from "@/components/ReservationWhyChoose";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/reservation" },
  title: "Reservation | Kuwait Taxi Service",
  description:
    "Reserve your taxi or airport transfer in Kuwait online. Fixed fares, professional drivers, and instant confirmation.",
};

export default function ReservationPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <ReservationHero />
        <div className="bg-brand-black py-4">
          <h2 className="text-center text-lg font-bold tracking-wide text-white uppercase">
            Online Reservation Form
          </h2>
        </div>
        <ReservationForm />
        <RideInclusions />
        <ReservationWhyChoose />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
