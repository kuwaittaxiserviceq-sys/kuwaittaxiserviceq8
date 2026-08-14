import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactMethods from "@/components/ContactMethods";
import BusinessInquiries from "@/components/BusinessInquiries";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Kuwait Taxi Company | Call or WhatsApp - Instant Booking",
  description:
    "Need a taxi in Kuwait now? Call, WhatsApp, or book online. Fast pickup, professional drivers, available across all Kuwait areas.",
};

const contactBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactBreadcrumbs} />
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
