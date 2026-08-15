import {
  CheckCircle2,
  CreditCard,
  FileCheck,
  Landmark,
  MapPin,
  MoonStar,
  MoveLeft,
  Plane,
  Route,
} from "lucide-react";
import Container from "../Container";
import { SectionHeadingAr } from "./HomeSectionsAr";
import { saudiRoutes } from "../saudiRoutes";

export function SaudiHeroAr() {
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
          <Route className="h-4 w-4" />
          الكويت ⇄ السعودية &middot; من الباب إلى الباب
        </span>
        <h1 className="text-3xl leading-snug font-bold text-white sm:text-4xl">
          تاكسي الكويت إلى السعودية عبر حدود النويصيب
        </h1>
        <p className="text-zinc-300">
          رحلات مباشرة من الباب إلى الباب بين الكويت وكل مدينة ومطار رئيسي في
          السعودية — الخفجي، الجبيل، الدمام، الخبر، الرياض، مكة، المدينة
          المنورة وجدة — بنفس المركبة طوال الطريق، وسائقك يتولى إجراءات
          الحدود. في الاتجاهين، على مدار الساعة.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://wa.me/96597896907?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%B1%D8%AD%D9%84%D8%A9%20%D9%85%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            احجز عبر واتساب
          </a>
          <a
            href="tel:+96597896907"
            className="flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            اتصل: <span dir="ltr">9789 6907</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const cityNamesAr: Record<string, string> = {
  Khafji: "الخفجي",
  Jubail: "الجبيل",
  Dammam: "الدمام",
  Khobar: "الخبر",
  Dhahran: "الظهران",
  "Hafr Al-Batin": "حفر الباطن",
  Riyadh: "الرياض",
  Buraidah: "بريدة",
  Madinah: "المدينة المنورة",
  Makkah: "مكة المكرمة",
  Jeddah: "جدة",
};

const regionNamesAr: Record<string, string> = {
  "Eastern Province": "المنطقة الشرقية",
  Central: "المنطقة الوسطى",
  Western: "المنطقة الغربية",
};

function durationAr(duration: string) {
  return duration.replace("hrs", "ساعة").replace("hr", "ساعة");
}

const popularCities = ["Dammam", "Khobar", "Riyadh", "Makkah", "Madinah", "Jeddah"];
const popularRoutes = popularCities
  .map((city) => saudiRoutes.find((r) => r.city === city))
  .filter((r): r is NonNullable<typeof r> => Boolean(r));

export function PopularRoutesAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeadingAr
          eyebrow="أشهر الرحلات"
          title="أكثر رحلات الكويت إلى السعودية طلبًا"
          description="أسعار ثابتة للاتجاه الواحد، بنفس المركبة عبر الحدود، في الاتجاهين."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route) => (
            <div
              key={route.city}
              className="flex flex-col gap-5 rounded-2xl bg-white p-5 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                {durationAr(route.duration)}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                  <span className="rounded bg-brand-green-light px-1.5 py-0.5 text-[10px] font-bold text-brand-green">
                    KW
                  </span>
                  الكويت
                </span>
                <span className="flex flex-1 items-center gap-1.5 px-1">
                  <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                    <MoveLeft className="h-3.5 w-3.5" />
                  </span>
                  <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                  {cityNamesAr[route.city]}
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500">
                    SA
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="text-sm">
                  <span className="text-zinc-500">من </span>
                  <span className="font-bold text-brand-green">{route.sedan} د.ك</span>
                </div>
                <a
                  href={`https://wa.me/96597896907?text=${encodeURIComponent(
                    `مرحباً، أريد سعر رحلة من الكويت إلى ${cityNamesAr[route.city]}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-green px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  اطلب السعر
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SaudiRoutesTableAr() {
  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeadingAr
          eyebrow="الأسعار والوجهات"
          title="جميع رحلات الكويت ⇄ السعودية"
          description="سعر الاتجاه الواحد لكل مركبة (وليس لكل راكب)، في الاتجاهين. المسافات محسوبة من مدينة الكويت — الاستلام من أي منطقة في الكويت دون أي رسوم إضافية."
        />

        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[720px] text-right text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">الوجهة</th>
                <th className="px-4 py-3 font-semibold">المسافة</th>
                <th className="px-4 py-3 font-semibold">المدة*</th>
                <th className="px-4 py-3 font-semibold">سيدان (3)</th>
                <th className="px-4 py-3 font-semibold">دفع رباعي (6)</th>
                <th className="px-4 py-3 font-semibold">فان (10)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {saudiRoutes.map((route) => (
                <tr key={route.city} className="even:bg-zinc-50/60">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-900">{cityNamesAr[route.city]}</div>
                    <div className="text-xs text-zinc-500">{regionNamesAr[route.region]}</div>
                    {route.airport && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-brand-green">
                        <Plane className="h-3 w-3" />
                        {route.airport}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{route.distanceKm} كم</td>
                  <td className="px-4 py-3 text-zinc-600">{durationAr(route.duration)}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{route.sedan} د.ك</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{route.suv} د.ك</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">{route.van} د.ك</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-500">
          *المدة تشمل إجراءات الحدود المعتادة عند منفذ النويصيب. الرحلات
          الطويلة (الرياض، جدة، مكة، المدينة) تشمل توقفات راحة مجدولة. لم تجد
          مدينتك — الطائف، أبها، الأحساء، القصيم؟ اتصل على{" "}
          <a href="tel:+96597896907" className="font-semibold text-brand-green">
            <span dir="ltr">9789 6907</span>
          </a>{" "}
          لسعر فوري.
        </p>
      </Container>
    </section>
  );
}

const steps = [
  {
    icon: Route,
    title: "مركبة واحدة من الباب إلى الباب",
    description:
      "لا تغيير للسيارة عند الحدود ولا حافلات مشتركة. نفس السائق والمركبة يوصلانك من باب منزلك في الكويت إلى عنوانك بالتحديد في السعودية — والعكس صحيح.",
  },
  {
    icon: Landmark,
    title: "إجراءات الحدود نتولاها بالكامل",
    description:
      "نعبر من منفذ النويصيب (الخفجي) — المعبر الرئيسي بين الكويت والسعودية. سائقك يتولى أوراق المركبة ويرافقك خلال إجراءات الجوازات، عادة خلال 30–60 دقيقة.",
  },
  {
    icon: MoonStar,
    title: "رحلات العمرة والزيارة",
    description:
      "رحلات مباشرة إلى مكة والمدينة لأداء العمرة، مع توقفات للصلاة والراحة في الطريق. فانات متوفرة للعائلات والمجموعات مع مساحة كافية للأمتعة وزمزم والهدايا.",
  },
  {
    icon: CreditCard,
    title: "أجرة ثابتة في الاتجاهين",
    description:
      "السعر الذي يُعرض عليك يشمل الرحلة كاملة — الوقود والسائق ورسوم الحدود. ادفع بالدينار أو الريال، نقدًا أو كي-نت أو بالبطاقة. لا مفاجآت عند الحدود أو الوصول.",
  },
];

const requirements = [
  "جواز سفر ساري المفعول (لا يقل عن 6 أشهر)",
  "تأشيرة سعودية سارية — إلكترونية أو عمرة أو زيارة (مواطنو دول الخليج: البطاقة المدنية فقط)",
  "لرحلة العودة إلى الكويت: تأشيرة أو إقامة كويتية سارية",
  "يجب أن يحمل الأطفال وثائق سفرهم الخاصة",
];

export function BorderProcessAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="كيف تتم الرحلة" title="عبور الحدود بكل بساطة" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl bg-brand-green-light/50 p-6 shadow-sm ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-brand-green" />
            <h3 className="text-lg font-semibold text-zinc-900">
              الأوراق المطلوبة للسفر
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            متطلبات التأشيرة والدخول تحددها الجهات الرسمية وقد تتغير — يرجى
            التأكد من اكتمال أوراقك قبل السفر. سنذكّرك بقائمة المستندات عند
            الحجز.
          </p>
        </div>
      </Container>
    </section>
  );
}

const faqs = [
  {
    question: "هل أغيّر المركبة عند حدود الكويت والسعودية؟",
    answer:
      "لا. تبقى في نفس المركبة مع نفس السائق طوال الرحلة، في الاتجاهين. الجوازات فقط تتطلب النزول لدقائق قليلة.",
  },
  {
    question: "ما منفذ الحدود الذي تستخدمونه؟",
    answer:
      "نعبر من منفذ النويصيب (الخفجي) على الطريق الساحلي — المعبر الرئيسي بين الكويت والمنطقة الشرقية بالسعودية. للرياض والقصيم نسلك أسرع طريق سريع من هناك.",
  },
  {
    question: "هل توفرون رحلات للعمرة من الكويت؟",
    answer:
      "نعم — رحلات مكة والمدينة من أكثر الوجهات السعودية طلبًا لدينا. نجدول توقفات الصلاة والراحة، وتتوفر فانات للعائلات والمجموعات.",
  },
  {
    question: "ما المستندات المطلوبة؟",
    answer:
      "جواز سفر ساري لا يقل عن 6 أشهر، وتأشيرة سعودية سارية (إلكترونية أو عمرة أو زيارة). مواطنو دول الخليج يمكنهم العبور بالبطاقة المدنية. لدخول الكويت تحتاج تأشيرة أو إقامة سارية.",
  },
  {
    question: "هل يمكنكم الاستلام من مطار سعودي والتوصيل إلى الكويت؟",
    answer:
      "نعم — نخدم مطارات الدمام والرياض وجدة والمدينة في الاتجاهين، مع تتبع الرحلة والاستقبال داخل الصالة.",
  },
  {
    question: "كيف تُحسب أجرة الرحلات عبر الحدود؟",
    answer:
      "كل رحلة لها سعر ثابت وشامل لكل مركبة — يشمل الوقود والسائق ورسوم الحدود. السعر الذي نعرضه قبل الحجز هو ما تدفعه بالضبط، بالدينار أو الريال.",
  },
  {
    question: "هل يمكنني حجز رحلة ذهاب وعودة مع إقامة في السعودية؟",
    answer:
      "نعم. للرحلات متعددة الأيام (مثل العمرة مع إقامة 3 ليالٍ)، تواصل معنا لعرض سعر خاص — أوفر من حجز رحلتين منفصلتين.",
  },
];

export function SaudiFaqAr() {
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
          eyebrow="أسئلة شائعة عن عبور الحدود"
          title="الكويت ⇄ السعودية — الأسئلة المتكررة"
          description="كل ما تحتاج معرفته قبل حجز رحلة عبر الحدود."
        />
        <div className="flex w-full max-w-2xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-zinc-200 bg-white px-5 py-4 open:bg-brand-green-light/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-zinc-900">
                {question}
                <span className="shrink-0 text-brand-green transition-transform group-open:rotate-180">
                  ⌄
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function GccBannerAr() {
  return (
    <section className="bg-brand-black py-12">
      <Container className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white sm:flex">
            <MapPin className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1 text-center lg:text-start">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              مسافر إلى أبعد من السعودية؟
            </h2>
            <p className="text-sm text-zinc-400">
              ننظم أيضًا رحلات برية من الباب إلى الباب من الكويت إلى الإمارات
              (دبي وأبوظبي) والبحرين — بنفس المركبة طوال الطريق، مع التعامل
              مع جميع إجراءات الحدود. اطلب عرض سعر خاص.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/96597896907?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%84%D8%A5%D9%85%D8%A7%D8%B1%D8%A7%D8%AA%2F%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A%D9%86"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          اطلب عرض سعر
          <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </a>
      </Container>
    </section>
  );
}
