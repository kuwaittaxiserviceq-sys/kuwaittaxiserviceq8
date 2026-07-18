import { Phone, ShieldCheck } from "lucide-react";
import QuoteFormAr from "./QuoteFormAr";

export default function HeroAr() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-brand-black"
    >
      {/* Plain <img>, not next/image: the optimizer strips EXIF and this file
          carries GPS geo tags for local SEO. Already compressed to <100 KB. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/kuwait-taxi-service-hero.webp"
        alt="خدمة تاكسي الكويت — سيارة على شارع الخليج مع أبراج الكويت عند الغروب"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-brand-black/95 via-brand-black/75 to-brand-black/35" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-red-400">
            <ShieldCheck className="h-4 w-4" />
            خدمة نقل المطار الموثوقة في الكويت
          </span>

          <h1 className="max-w-xl text-4xl leading-[1.25] font-bold text-white sm:text-5xl">
            أفضل خدمة تاكسي في الكويت —{" "}
            <span className="text-emerald-400">موثوقة وفي الموعد</span>
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-300">
            توصيل احترافي من وإلى المطار ومشاوير داخل مدن الكويت. تتبع
            مباشر للرحلات الجوية، أسعار ثابتة وواضحة، وسائقون مرخصون —
            على مدار الساعة طوال أيام الأسبوع.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#reservation"
              className="flex h-12 items-center justify-center rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              احجز رحلتك
            </a>
            <a
              href="#fleet"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              شاهد أسطولنا
            </a>
          </div>

          <a
            href="tel:+96597896907"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white"
          >
            <Phone className="h-5 w-5 text-emerald-400" />
            <div className="text-sm">
              <div className="text-zinc-400">اتصل للحجز الآن</div>
              <div className="font-semibold" dir="ltr">
                9789 6907
              </div>
            </div>
          </a>
        </div>

        <div
          id="reservation"
          className="w-full max-w-md justify-self-start rounded-3xl bg-white p-7 shadow-2xl shadow-black/40 sm:p-8 lg:justify-self-end"
        >
          <h2 className="text-xl font-bold text-zinc-900">اطلب عرض سعر</h2>
          <p className="mt-1 text-sm text-zinc-500">
            أجرة ثابتة، تأكيد فوري — دون أي زيادات مفاجئة.
          </p>

          <QuoteFormAr />
        </div>
      </div>
    </section>
  );
}
