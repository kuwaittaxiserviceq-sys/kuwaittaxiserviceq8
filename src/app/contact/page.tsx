import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactMethods from "@/components/ContactMethods";
import BusinessInquiries from "@/components/BusinessInquiries";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Kuwait Taxi Service | Book by Phone, WhatsApp or Email — 24/7",
  description:
    "Get in touch with Kuwait Taxi Service for bookings, corporate accounts, and custom routes. Available 24/7 by phone, WhatsApp, or email.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <ContactHero />
        <ContactMethods />
        <BusinessInquiries />
        <ContactForm />
        <LocationMap />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
