import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service | Kuwait Taxi Service",
  description:
    "The terms that govern bookings, payments, cancellations, and passenger conduct when riding with Kuwait Taxi Service.",
};

const sections = [
  {
    heading: "Bookings & Confirmation",
    body: "A booking is confirmed only once you receive confirmation from our dispatch team by phone, SMS, or WhatsApp. Please make sure your contact number, pickup address, and flight details (where applicable) are accurate at the time of booking.",
  },
  {
    heading: "Fares & Payment",
    body: "All fares are quoted in Kuwaiti Dinar (KD) as fixed, all-in amounts agreed before the ride. Payment is accepted by cash, KNET, or credit/debit card. Corporate accounts may be invoiced by prior arrangement.",
  },
  {
    heading: "Cancellations & No-Shows",
    body: "Cancellations made more than 24 hours before pickup are free. Cancellations within 24 hours may incur 50% of the fare. Cancellations with less than 2 hours' notice, or a no-show after 30 minutes of driver waiting, are charged the full fare.",
  },
  {
    heading: "Airport Pickups & Waiting Time",
    body: "Airport pickups include 60 minutes of free waiting time counted from the flight's actual landing. Additional waiting beyond the included period is charged at our standard hourly rate.",
  },
  {
    heading: "Passenger Conduct",
    body: "Kuwait law strictly prohibits alcohol and other intoxicants; passengers in violation will be refused service without refund. Smoking and vaping are not permitted in vehicles. Abusive or unsafe behaviour toward drivers results in immediate termination of service without refund.",
  },
  {
    heading: "Luggage & Child Seats",
    body: "Luggage capacity depends on the vehicle class booked; oversized loads may require an upgrade, subject to availability. Certified child seats are available free on request at booking time.",
  },
  {
    heading: "Liability",
    body: "In the rare event of a breakdown, accident, or circumstances beyond our control, our liability is limited to arranging a replacement vehicle as soon as reasonably possible. We are not responsible for consequential losses such as missed flights caused by events outside our control.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these terms from time to time. The latest version will always be available on this page and applies to all new bookings.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section className="bg-gradient-to-b from-brand-black to-brand-green-dark py-16 sm:py-20">
          <Container className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Terms of Service
            </h1>
            <p className="text-zinc-300">
              The terms that apply to every booking with Kuwait Taxi Service.
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

            <p className="text-sm text-zinc-500">
              See also the ride-specific conditions on our{" "}
              <Link href="/rates" className="font-semibold text-brand-green underline underline-offset-2">
                rates page
              </Link>
              .
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
