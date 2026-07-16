import Link from "next/link";
import {
  CalendarCheck,
  ChevronDown,
  Clock3,
  Luggage,
  MoveLeft,
  PlaneLanding,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Container from "../Container";
import { SectionHeadingAr } from "./HomeSectionsAr";
import { ratesData } from "../ratesData";

export function AirportHeroAr() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-black to-brand-green-dark py-24 sm:py-28">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-green/30 blur-3xl" />
      <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-brand-red/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-red-400">
          <PlaneLanding className="h-4 w-4" />
          مطار الكويت الدولي &middot; على مدار الساعة
        </span>
        <h1 className="text-3xl leading-snug font-bold text-white sm:text-4xl">
          تاكسي مطار الكويت — توصيل بأسعار ثابتة ليلًا ونهارًا
        </h1>
        <p className="text-zinc-300">
          احجز تاكسي المطار مسبقًا وانزل من الطائرة براحة بال: نتتبع
          رحلتك الجوية، ننتظرك حتى 60 دقيقة مجانًا، ونستقبلك داخل صالة
          الوصول بلوحة باسمك. أجرة ثابتة إلى كل منطقة في الكويت — مؤكدة
          قبل إقلاعك.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://wa.me/96555205485?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%AA%D8%A7%D9%83%D8%B3%D9%8A%20%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            احجز عبر واتساب
          </a>
          <a
            href="tel:+96555205485"
            className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            اتصل: <span dir="ltr">5520 5485</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: CalendarCheck,
    title: "1. احجز خلال دقيقة",
    description:
      "احجز عبر واتساب أو الهاتف مع رقم رحلتك الجوية. أجرتك الثابتة تُؤكد فورًا — لا عدادات ولا زيادات.",
  },
  {
    icon: PlaneLanding,
    title: "2. نتتبع رحلتك",
    description:
      "ننسق وصول السائق مع موعد هبوط طائرتك الفعلي — الوصول المبكر والتأخير نتعامل معهما تلقائيًا.",
  },
  {
    icon: UserCheck,
    title: "3. استقبال داخل الصالة",
    description:
      "سائقك بانتظارك في صالة الوصول بلوحة باسمك، يساعدك بالحقائب ويوصلك حتى باب منزلك.",
  },
];

export function AirportStepsAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr
          eyebrow="كيف تحجز"
          title="كيف تحجز تاكسي مطار الكويت؟"
          description="ثلاث خطوات من الحجز حتى باب منزلك — بنفس السهولة للاستقبال والتوديع."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl bg-brand-green-light/50 p-6 ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const areaNamesAr: Record<string, string> = {
  "Kuwait City": "مدينة الكويت",
  Salmiya: "السالمية",
  Hawalli: "حولي",
  Fahaheel: "الفحيحيل",
  Farwaniya: "الفروانية",
  Jahra: "الجهراء",
  Mangaf: "المنقف",
  Jabriya: "الجابرية",
};

export function AirportFaresAr() {
  const rows = ratesData.filter((r) => areaNamesAr[r.area]);

  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeadingAr
          eyebrow="أسعار تاكسي المطار"
          title="أسعار ثابتة من مطار الكويت"
          description="سعر الاتجاه الواحد لكل مركبة (وليس لكل راكب) — نفس السعر من وإلى المطار."
        />

        <div className="w-full overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[560px] text-right text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">المطار ⇄ المنطقة</th>
                <th className="px-4 py-3 font-semibold">سيدان (3)</th>
                <th className="px-4 py-3 font-semibold">دفع رباعي (6)</th>
                <th className="px-4 py-3 font-semibold">فان (8)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => (
                <tr key={row.area} className="even:bg-zinc-50/60">
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {areaNamesAr[row.area]}
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{row.sedan} د.ك</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{row.suv} د.ك</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{row.van8} د.ك</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href="/rates"
          className="group flex items-center gap-2 font-semibold text-brand-green hover:underline"
        >
          شاهد أسعار جميع مناطق الكويت (65+ منطقة)
          <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}

const features = [
  {
    icon: Clock3,
    title: "24 ساعة لكل الرحلات",
    description:
      "هبوط فجرًا أو إقلاع منتصف الليل — فريقنا لا يتوقف وسائقك دائمًا في الموعد.",
  },
  {
    icon: PlaneLanding,
    title: "60 دقيقة انتظار مجاني",
    description:
      "الانتظار يُحسب من لحظة هبوط الطائرة الفعلي وليس الموعد المجدول — طوابير الجوازات ليست مشكلتك.",
  },
  {
    icon: Luggage,
    title: "جاهزون للعائلات والحقائب",
    description:
      "سيدان حتى 3 حقائب، ودفع رباعي وفانات لحقائب العائلة، ومقاعد أطفال مجانية عند الطلب.",
  },
  {
    icon: ShieldCheck,
    title: "مشغّل مطار مرخص",
    description:
      "مركبات مرخصة ومؤمّنة وسائقون موثوقون — البديل الآمن عن سيارات المطار غير المعروفة.",
  },
];

export function AirportWhyUsAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="لماذا الحجز المسبق معنا" title="توصيل المطار الموثوق في الكويت" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const faqs = [
  {
    question: "كيف أحجز تاكسي من مطار الكويت؟",
    answer:
      "احجز عبر واتساب أو اتصل على 55205485 مع رقم رحلتك ووجهتك، وستُؤكد أجرتك الثابتة فورًا.",
  },
  {
    question: "أين يستقبلني السائق في مطار الكويت الدولي؟",
    answer: "سائقك ينتظرك داخل صالة الوصول حاملًا لوحة باسمك، ويساعدك بحقائبك حتى السيارة.",
  },
  {
    question: "ماذا لو تأخرت رحلتي؟",
    answer:
      "نتتبع رحلتك لحظة بلحظة وننسق وصول السائق مع موعد الهبوط الفعلي، مع 60 دقيقة انتظار مجاني — التأخير لا يكلفك شيئًا.",
  },
  {
    question: "كم سعر التاكسي من مطار الكويت إلى المدينة؟",
    answer:
      "الأسعار الثابتة تبدأ من 6–8 د.ك للسيدان حسب منطقتك — راجع جدول الأسعار أعلاه أو صفحة الأسعار الكاملة.",
  },
  {
    question: "هل يتوفر تاكسي المطار للرحلات الليلية؟",
    answer:
      "نعم — نعمل على مدار الساعة طوال أيام السنة، وبنفس الأسعار الثابتة دون أي رسوم ليلية إضافية.",
  },
  {
    question: "هل يمكنني الدفع بكي-نت أو البطاقة؟",
    answer: "نعم — نقبل النقد وكي-نت والبطاقات البنكية والدفع الإلكتروني.",
  },
];

export function AirportFaqAr() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section className="bg-brand-green-light/40 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="flex flex-col items-center gap-10">
        <SectionHeadingAr
          eyebrow="أسئلة شائعة"
          title="تاكسي مطار الكويت — الأسئلة المتكررة"
        />
        <div className="flex w-full max-w-2xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-zinc-200 bg-white px-5 py-4 open:bg-brand-green-light/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-zinc-900">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-green transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
