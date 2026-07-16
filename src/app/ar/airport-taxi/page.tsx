import type { Metadata } from "next";
import NavbarAr from "@/components/ar/NavbarAr";
import {
  AirportFaqAr,
  AirportFaresAr,
  AirportHeroAr,
  AirportStepsAr,
  AirportWhyUsAr,
} from "@/components/ar/AirportTaxiAr";
import { FleetAr } from "@/components/ar/HomeSectionsAr2";
import FooterAr from "@/components/ar/FooterAr";

export const metadata: Metadata = {
  title: "تاكسي مطار الكويت | توصيل 24 ساعة بأسعار ثابتة | 55205485",
  description:
    "احجز تاكسي مطار الكويت — استقبال داخل صالة الوصول بلوحة باسمك، تتبع الرحلات الجوية، 60 دقيقة انتظار مجاني، وأسعار ثابتة لجميع المناطق. اتصل أو واتساب 55205485.",
  alternates: {
    canonical: "/ar/airport-taxi",
    languages: { en: "/airport-taxi", ar: "/ar/airport-taxi" },
  },
  openGraph: {
    type: "website",
    siteName: "خدمة تاكسي الكويت",
    title: "تاكسي مطار الكويت | توصيل 24 ساعة بأسعار ثابتة",
    description:
      "استقبال داخل الصالة، تتبع الرحلات، 60 دقيقة انتظار مجاني، وأسعار ثابتة لجميع مناطق الكويت.",
    locale: "ar_KW",
  },
};

export default function AirportTaxiArPage() {
  return (
    <>
      <NavbarAr />
      <main id="main-content" className="flex flex-1 flex-col">
        <AirportHeroAr />
        <AirportStepsAr />
        <AirportFaresAr />
        <AirportWhyUsAr />
        <AirportFaqAr />
        <FleetAr />
      </main>
      <FooterAr />
    </>
  );
}
