import {
  BadgeCheck,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  Clock3,
  Compass,
  Gauge,
  Handshake,
  HeartHandshake,
  Plane,
  PlaneLanding,
  ShieldCheck,
  Snowflake,
  Wallet,
} from "lucide-react";
import Container from "../Container";

export function SectionHeadingAr({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      <span className="text-sm font-bold text-brand-red">{eyebrow}</span>
      <h2 className={`text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-zinc-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={dark ? "text-zinc-300" : "text-zinc-600"}>{description}</p>
      )}
    </div>
  );
}

const trustItems = [
  { icon: Plane, label: "تتبع مباشر للرحلات الجوية حتى لا يفوتنا أي هبوط أو تأخير." },
  { icon: ShieldCheck, label: "سائقون معتمدون برخص تجارية وسجلات موثقة." },
  { icon: Wallet, label: "أسعار شاملة وشفافة — دون رسوم خفية أو زيادات مفاجئة." },
  { icon: Snowflake, label: "أسطول مجهز لحرارة الكويت بتكييف كامل وصيانة دورية." },
];

const checklist = [
  "استقبال وترحيب داخل صالة الوصول في مطار الكويت الدولي",
  "60 دقيقة انتظار مجاني تُحسب من لحظة هبوط الطائرة الفعلي",
  "سائقون بلباس رسمي يتحدثون العربية والإنجليزية",
  "أجرة ثابتة متفق عليها قبل الرحلة — مع تأكيد عبر الرسائل",
];

export function LicensedServiceAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 border-b border-zinc-100 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm leading-6 text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 pt-16 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <span className="text-sm font-bold text-brand-red">مرخصون ومؤمّنون</span>
            <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              خدمة تاكسي المطار المرخصة في الكويت
            </h2>
            <p className="text-zinc-600">
              هكذا تتعامل خدمتنا مع كل استقبال من المطار تلقائيًا — حتى لا
              تقلق أبدًا بشأن التأخير أو الأسعار المتغيرة أو السيارات غير
              المعروفة.
            </p>
            <ul className="flex flex-col gap-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green sm:h-96">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <CarFront className="relative h-24 w-24 text-white/90" strokeWidth={1.25} />
          </div>
        </div>
      </Container>
    </section>
  );
}

const features = [
  {
    icon: Compass,
    title: "مسارات ذكية حسب حركة المرور",
    description:
      "توجيه لحظي يتجنب ازدحام طريق الخليج وطريق الفحيحيل السريع ليوصلك في موعدك، في كل مرة.",
  },
  {
    icon: Plane,
    title: "استقبال متزامن مع رحلتك الجوية",
    description:
      "نتتبع رحلتك إلى مطار الكويت الدولي ونعدّل موعد الاستقبال تلقائيًا عند أي تغيير.",
  },
  {
    icon: Wallet,
    title: "أسعار ثابتة منافسة",
    description:
      "أجرتك متفق عليها قبل انطلاق الرحلة — لا عدادات، لا زيادات، لا مفاجآت.",
  },
  {
    icon: Snowflake,
    title: "أسطول فاخر جاهز لحرارة الصحراء",
    description:
      "كل مركبة تخضع للصيانة وفحص التكييف لتتحمل حرارة صيف الكويت دون أي عناء.",
  },
  {
    icon: BadgeCheck,
    title: "سائقون مرخصون وموثوقون",
    description:
      "سائقون برخص تجارية، تم التحقق من سجلاتهم وتدريبهم على أعلى معايير الاحترافية.",
  },
  {
    icon: Clock3,
    title: "خدمة على مدار الساعة",
    description:
      "من مشاوير الفجر إلى المطار حتى رحلات منتصف الليل — فريقنا لا يتوقف أبدًا.",
  },
];

export function WhyChooseUsAr() {
  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="لماذا نحن" title="لماذا تختار تاكسي الكويت؟" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
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

const stats = [
  { icon: Wallet, value: "أسعار ثابتة", label: "متفق عليها مقدمًا" },
  { icon: ShieldCheck, value: "سائقون موثوقون", label: "مرخصون ومدربون" },
  { icon: HeartHandshake, value: "24/7", label: "دعم دائم دون توقف" },
];

export function StatsBarAr() {
  return (
    <section className="bg-brand-green">
      <Container className="grid grid-cols-1 divide-y divide-white/15 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={value} className="flex flex-col items-center gap-2 py-6 text-center sm:py-0">
            <Icon className="h-7 w-7 text-white" />
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-sm text-emerald-100">{label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}

const trafficCards = [
  {
    icon: Gauge,
    title: "تجاوز الازدحام لحظيًا",
    description:
      "غرفة العمليات تراقب طريق الخليج وطريق الفحيحيل السريع والدائري السادس مباشرة، وتعيد توجيه سائقك فور تشكّل أي ازدحام.",
  },
  {
    icon: PlaneLanding,
    title: "بروتوكول مطار الكويت الدولي",
    description:
      "سائقك يتتبع حالة رحلتك مباشرة وينتظرك داخل صالة الوصول — لا دوران في الخارج ولا مواعيد ضائعة.",
  },
  {
    icon: Wallet,
    title: "لا زيادة في الأسعار أبدًا",
    description:
      "نظام الأجرة الثابتة يعني أن سعرك لا يتغير بسبب الزحام أو وقت اليوم أو الطلب — ما نقوله هو ما تدفعه.",
  },
];

export function TrafficSolutionsAr() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr
          eyebrow="مصمم لطرق الكويت"
          title="كيف نتغلب على زحمة الكويت؟"
          description="كل رحلة مخططة وفق واقع الطرق في الكويت — وليس مجرد خط مستقيم على الخريطة."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {trafficCards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5">
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green">
                <Icon className="relative h-14 w-14 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-col gap-2 bg-white p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const vipSteps = [
  { icon: CalendarCheck, title: "احجز", description: "احجز عبر واتساب أو الهاتف في أقل من دقيقة." },
  { icon: PlaneLanding, title: "نتتبع رحلتك", description: "نراقب حالة رحلتك الجوية لحظة بلحظة." },
  { icon: Handshake, title: "استقبال وترحيب", description: "سائقك بانتظارك داخل صالة الوصول." },
  { icon: CarFront, title: "استرخِ في الطريق", description: "مركبة نظيفة ومكيفة توصلك حتى باب منزلك." },
];

export function VipExperienceAr() {
  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark via-brand-green to-emerald-700 sm:h-96 lg:order-1">
          <CarFront className="relative h-28 w-28 text-white/90" strokeWidth={1.1} />
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-brand-red">التجربة</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">تجربة وصول VIP</h2>
            <p className="text-zinc-400">
              خطوة بخطوة — هذا ما يحدث بالضبط من لحظة الحجز حتى وصولك.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {vipSteps.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
