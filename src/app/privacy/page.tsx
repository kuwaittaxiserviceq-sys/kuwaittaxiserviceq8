import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy | Kuwait Taxi Service",
  description:
    "How Kuwait Taxi Service collects, uses, and protects your personal information when you book a ride with us.",
};

const sections = [
  {
    heading: "Information We Collect",
    body: "When you book a ride, we collect the details needed to provide the service: your name, phone number, email address, pickup and drop-off locations, travel date and time, and flight details where applicable. If you pay by card or KNET, payment processing is handled by the payment provider — we do not store your full card details.",
  },
  {
    heading: "How We Use Your Information",
    body: "Your information is used only to confirm and operate your booking: dispatching a driver, tracking your flight for airport pickups, contacting you about your ride, and issuing receipts. With your consent, we may also send you service updates or offers, which you can opt out of at any time.",
  },
  {
    heading: "Information Sharing",
    body: "We share your trip details only with the driver assigned to your booking. We do not sell or rent your personal information to third parties. We may disclose information if required to do so by Kuwaiti law or a valid legal request.",
  },
  {
    heading: "Data Retention",
    body: "Booking records are retained for as long as needed for accounting, dispute resolution, and legal compliance, after which they are deleted or anonymized.",
  },
  {
    heading: "Data Security",
    body: "We use reasonable technical and organizational safeguards to protect your information against unauthorized access, alteration, or loss.",
  },
  {
    heading: "Your Rights",
    body: "You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it (subject to legal retention requirements) by contacting us at info@kuwaittaxiservice.com.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this policy from time to time. The latest version will always be available on this page.",
  },
  {
    heading: "Contact Us",
    body: "For any privacy questions or requests, contact us at info@kuwaittaxiservice.com or call +965 5520 5485.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section className="bg-gradient-to-b from-brand-black to-brand-green-dark py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-zinc-300">
              How we collect, use, and protect your information.
            </p>
          </Container>
        </section>

        <section className="bg-white py-16">
          <Container className="mx-auto flex max-w-3xl flex-col gap-8">
            {sections.map(({ heading, body }) => (
              <div key={heading} className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-zinc-900">{heading}</h2>
                <p className="leading-7 text-zinc-600">{body}</p>
              </div>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
