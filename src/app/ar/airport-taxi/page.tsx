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
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

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

const airportSchemaAr = serviceSchema({
  name: "تاكسي مطار الكويت",
  description:
    "خدمة تاكسي مطار الكويت الدولي على مدار الساعة — استقبال داخل صالة الوصول، تتبع الرحلات الجوية، 60 دقيقة انتظار مجاني، وأسعار ثابتة لجميع مناطق الكويت.",
  path: "/ar/airport-taxi",
  inLanguage: "ar",
});

const airportBreadcrumbsAr = breadcrumbSchema([
  { name: "الرئيسية", path: "/ar" },
  { name: "تاكسي المطار", path: "/ar/airport-taxi" },
]);

export default function AirportTaxiArPage() {
  return (
    <>
      <JsonLd data={airportSchemaAr} />
      <JsonLd data={airportBreadcrumbsAr} />
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
