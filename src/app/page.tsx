import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LicensedService from "@/components/LicensedService";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsBar from "@/components/StatsBar";
import TrafficSolutions from "@/components/TrafficSolutions";
import VipExperience from "@/components/VipExperience";
import Services from "@/components/Services";
import SaudiCtaBanner from "@/components/SaudiCtaBanner";
import Rates from "@/components/Rates";
import ReserveCta from "@/components/ReserveCta";
import AreasWeServe from "@/components/AreasWeServe";
import About from "@/components/About";
import FeaturesChecklist from "@/components/FeaturesChecklist";
import Faq from "@/components/Faq";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <LicensedService />
        <WhyChooseUs />
        <StatsBar />
        <TrafficSolutions />
        <VipExperience />
        <Services />
        <SaudiCtaBanner />
        <Rates />
        <ReserveCta />
        <AreasWeServe />
        <About />
        <FeaturesChecklist />
        <Faq />
        <Fleet />
      </main>
      <Footer />
    </>
  );
}
