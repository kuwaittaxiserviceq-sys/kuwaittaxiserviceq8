import type { Metadata } from "next";
import NavbarAr from "@/components/ar/NavbarAr";
import HeroAr from "@/components/ar/HeroAr";
import {
  LicensedServiceAr,
  StatsBarAr,
  TrafficSolutionsAr,
  VipExperienceAr,
  WhyChooseUsAr,
} from "@/components/ar/HomeSectionsAr";
import {
  AboutAr,
  AreasWeServeAr,
  FaqAr,
  FeaturesChecklistAr,
  FleetAr,
  RatesAr,
  ReserveCtaAr,
  SaudiCtaBannerAr,
  ServicesAr,
} from "@/components/ar/HomeSectionsAr2";
import FooterAr from "@/components/ar/FooterAr";

export const metadata: Metadata = {
  title: "تاكسي الكويت | توصيل المطار وجميع المناطق 24 ساعة | 97896907",
  description:
    "احجز تاكسي آمن وموثوق في أي مكان في الكويت. توصيل المطار، مشاوير داخل المدينة، رحلات إلى السعودية، وسائقون مرخصون — على مدار الساعة بأسعار ثابتة.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
  openGraph: {
    type: "website",
    siteName: "خدمة تاكسي الكويت",
    title: "خدمة تاكسي الكويت | توصيل موثوق على مدار الساعة",
    description:
      "توصيل المطار ومشاوير المدينة ورحلات السعودية بأسعار ثابتة وسائقين مرخصين.",
    locale: "ar_KW",
  },
};

export default function ArabicHome() {
  return (
    <>
      <NavbarAr />
      <main id="main-content" className="flex flex-1 flex-col">
        <HeroAr />
        <LicensedServiceAr />
        <WhyChooseUsAr />
        <StatsBarAr />
        <TrafficSolutionsAr />
        <VipExperienceAr />
        <ServicesAr />
        <SaudiCtaBannerAr />
        <RatesAr />
        <ReserveCtaAr />
        <AreasWeServeAr />
        <AboutAr />
        <FeaturesChecklistAr />
        <FaqAr />
        <FleetAr />
      </main>
      <FooterAr />
    </>
  );
}
