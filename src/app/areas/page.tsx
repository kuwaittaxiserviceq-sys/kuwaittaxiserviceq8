import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AreasHero from "@/components/AreasHero";
import AreasGrid from "@/components/AreasGrid";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/areas" },
  title: "Areas We Serve | Kuwait Taxi Service",
  description:
    "Kuwait Taxi Service covers every governorate in Kuwait — Al Asimah, Hawalli, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer — with 24/7 taxi and airport transfer service.",
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
