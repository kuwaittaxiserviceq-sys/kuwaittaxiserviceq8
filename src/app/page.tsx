import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LicensedService from "@/components/LicensedService";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsBar from "@/components/StatsBar";
import TrafficSolutions from "@/components/TrafficSolutions";
import VipExperience from "@/components/VipExperience";
import Services from "@/components/Services";
import PopularRoutes from "@/components/PopularRoutes";
import ReserveCta from "@/components/ReserveCta";
import AreasWeServe from "@/components/AreasWeServe";
import About from "@/components/About";
import FeaturesChecklist from "@/components/FeaturesChecklist";
import Faq from "@/components/Faq";
import Fleet, { type FleetItem } from "@/components/Fleet";
import Footer from "@/components/Footer";

const homeFleet: FleetItem[] = [
  {
    type: "suv",
    name: "Toyota Land Cruiser Prado",
    pax: 6,
    bags: 6,
    description: "Rugged, spacious 4x4 comfort for families and desert-ready trips.",
  },
  {
    type: "suv",
    name: "GMC",
    pax: 7,
    bags: 7,
    description: "Full-size American SUV — maximum space for large groups and luggage.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <PopularRoutes />
        <LicensedService />
        <WhyChooseUs />
        <StatsBar />
        <TrafficSolutions />
        <VipExperience />
        <Services />
        <ReserveCta />
        <AreasWeServe />
        <About />
        <FeaturesChecklist />
        <Faq />
        <Fleet items={homeFleet} />
      </main>
      <Footer />
    </>
  );
}
