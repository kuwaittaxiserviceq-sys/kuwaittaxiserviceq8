import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AreasHero from "@/components/AreasHero";
import AreasGrid from "@/components/AreasGrid";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/areas" },
  title: "Taxi Service in All Kuwait Areas | Hawalli, Salmiya, Fahaheel & More",
  description:
    "24/7 taxi service in every Kuwait governorate — Kuwait City, Hawalli, Salmiya, Fahaheel, Farwaniya, Jahra, Ahmadi and 60+ areas. Airport taxi and city rides at fixed fares.",
};

export default function AreasPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <AreasHero />
        <AreasGrid />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
