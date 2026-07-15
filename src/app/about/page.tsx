import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import ExpertChauffeurs from "@/components/ExpertChauffeurs";
import TrustedExperience from "@/components/TrustedExperience";
import CoreExpertise from "@/components/CoreExpertise";
import RecognizedTrusted from "@/components/RecognizedTrusted";
import SafetyPriority from "@/components/SafetyPriority";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us | Kuwait Taxi Service",
  description:
    "Learn about Kuwait Taxi Service — a licensed, 24/7 taxi and airport transfer operator serving every governorate in Kuwait with fixed fares and professional drivers.",
};

const aboutFaqs = [
  {
    question: "What is Kuwait Taxi Service known for?",
    answer:
      "Kuwait Taxi Service is known for reliable, fixed-fare taxi and airport transfer service with professional drivers and on-time pickups across Kuwait.",
  },
  {
    question: "How long has Kuwait Taxi Service been operating?",
    answer:
      "We've spent years building a reputation for dependable, fixed-fare transfers across Kuwait, with thousands of successful airport pickups and drop-offs handled for families and businesses.",
  },
  {
    question: "What areas does Kuwait Taxi Service serve?",
    answer:
      "We cover every governorate in Kuwait — Al Asimah, Hawalli, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer. See our full area list on the Areas We Serve page.",
  },
  {
    question: "What types of vehicles does Kuwait Taxi Service offer?",
    answer:
      "Our fleet includes sedans, SUVs, 8-passenger vans, and luxury sedans, so you can pick the right vehicle for your group size and luggage.",
  },
  {
    question: "Are your drivers professionally trained?",
    answer:
      "Yes. All drivers are commercially licensed, background-checked, and trained in safe driving and professional etiquette.",
  },
  {
    question: "Does Kuwait Taxi Service offer airport transfer services?",
    answer:
      "Yes, airport transfers to and from Kuwait International Airport are one of our core services, with real-time flight tracking included.",
  },
  {
    question: "Is Kuwait Taxi Service available for long-distance travel?",
    answer:
      "Yes, we offer fixed-fare long-distance trips outside the city in addition to standard city rides and airport transfers.",
  },
  {
    question: "How does Kuwait Taxi Service ensure on-time pickups?",
    answer:
      "We combine live flight tracking with real-time traffic-aware routing, so your driver is dispatched at exactly the right time.",
  },
  {
    question: "Is Kuwait Taxi Service suitable for corporate travel?",
    answer:
      "Yes, we support corporate accounts, invoiced billing, and recurring bookings for business travelers and roadshows.",
  },
  {
    question: "Why should I choose Kuwait Taxi Service?",
    answer:
      "Fixed fares agreed before you ride, licensed and vetted drivers, 24/7 availability, and coverage across every governorate in Kuwait.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <AboutHero />
        <ExpertChauffeurs />
        <TrustedExperience />
        <CoreExpertise />
        <RecognizedTrusted />
        <SafetyPriority />
        <Testimonials />
        <Faq
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          description="Quick answers to the most common questions about Kuwait Taxi Service."
          faqs={aboutFaqs}
        />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
