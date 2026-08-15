import type { Metadata } from "next";
import NavbarAr from "@/components/ar/NavbarAr";
import {
  SaudiHeroAr,
  PopularRoutesAr,
  SaudiRoutesTableAr,
  BorderProcessAr,
  GccBannerAr,
  SaudiFaqAr,
} from "@/components/ar/SaudiTransfersAr";
import { FleetAr } from "@/components/ar/HomeSectionsAr2";
import FooterAr from "@/components/ar/FooterAr";
import { saudiRoutes } from "@/components/saudiRoutes";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "تاكسي من الكويت إلى السعودية | حدود النويصيب | 97896907",
  description:
    "تاكسي بسعر ثابت من الكويت إلى السعودية عبر حدود النويصيب — الدمام، الخبر، الرياض، مكة، المدينة، جدة. سائقون موثوقون، أسعار واضحة، بدون تأخير. احجز رحلتك الآن.",
  alternates: {
    canonical: "/ar/saudi-transfers",
    languages: { en: "/saudi-transfers", ar: "/ar/saudi-transfers" },
  },
  openGraph: {
    type: "website",
    siteName: "خدمة تاكسي الكويت",
    title: "تاكسي من الكويت إلى السعودية | حدود النويصيب",
    description:
      "رحلات مباشرة من الباب إلى الباب بين الكويت وكل مدينة سعودية رئيسية — بنفس المركبة عبر الحدود، بأجرة ثابتة.",
    locale: "ar_KW",
  },
};

const saudiSchemaAr = serviceSchema({
  name: "تاكسي الكويت إلى السعودية",
  description:
    "تاكسي بين الكويت وجميع المدن والمطارات الرئيسية في السعودية — بنفس المركبة عبر الحدود، بأجرة ثابتة، على مدار الساعة، في الاتجاهين.",
  path: "/ar/saudi-transfers",
  inLanguage: "ar",
  offers: saudiRoutes.map((r) => ({
    name: `الكويت إلى ${r.city} — سيدان`,
    price: r.sedan,
  })),
});

const saudiBreadcrumbsAr = breadcrumbSchema([
  { name: "الرئيسية", path: "/ar" },
  { name: "رحلات السعودية", path: "/ar/saudi-transfers" },
]);

export default function SaudiTransfersArPage() {
  return (
    <>
      <JsonLd data={saudiSchemaAr} />
      <JsonLd data={saudiBreadcrumbsAr} />
      <NavbarAr />
      <main id="main-content" className="flex flex-1 flex-col">
        <SaudiHeroAr />
        <PopularRoutesAr />
        <SaudiRoutesTableAr />
        <GccBannerAr />
        <BorderProcessAr />
        <SaudiFaqAr />
        <FleetAr />
      </main>
      <FooterAr />
    </>
  );
}
