import {
  ArrowLeft,
  ArrowLeftRight,
  Briefcase,
  Building2,
  Car,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Crown,
  MapPin,
  MapPinned,
  PlaneTakeoff,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import Container from "../Container";
import { SectionHeadingAr } from "./HomeSectionsAr";

const services = [
  {
    icon: PlaneTakeoff,
    title: "توصيل المطار",
    description: "توصيل من الباب إلى الباب من وإلى مطار الكويت الدولي، مع تتبع مباشر للرحلات.",
  },
  {
    icon: ArrowLeftRight,
    title: "الكويت ⇄ السعودية عبر الحدود",
    description:
      "رحلات مباشرة إلى الخفجي والدمام والرياض ومكة والمدينة وجدة — بنفس المركبة عبر الحدود، في الاتجاهين.",
  },
  {
    icon: Clock3,
    title: "تاكسي بالساعة",
    description: "سائق ومركبة تحت تصرفك للمشاوير المتعددة أو المناسبات أو يوم كامل.",
  },
  {
    icon: Building2,
    title: "خدمة الشركات",
    description: "نقل موثوق بفواتير رسمية لرجال الأعمال والاجتماعات التنفيذية.",
  },
  {
    icon: Briefcase,
    title: "مشاوير داخل المدينة",
    description: "رحلات مباشرة عند الطلب في مدينة الكويت والسالمية وحولي والفحيحيل.",
  },
  {
    icon: CarFront,
    title: "رحلات المسافات الطويلة",
    description: "رحلات مريحة بأجرة ثابتة خارج المدينة مع سائق مستعد ومطّلع على وجهتك.",
  },
];

export function ServicesAr() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="ما نقدمه" title="خدماتنا" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5">
              <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-brand-green to-emerald-700">
                <Icon className="h-12 w-12 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{description}</p>
                <a
                  href="#reservation"
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  احجز هذه الخدمة
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SaudiCtaBannerAr() {
  return (
    <section className="bg-brand-black py-12">
      <Container className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white sm:flex">
            <ArrowLeftRight className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1 text-center lg:text-start">
            <h2 className="text-xl font-bold text-white sm:text-2xl">مسافر إلى السعودية؟</h2>
            <p className="text-sm text-zinc-400">
              توصيل من الباب إلى الباب إلى الدمام والرياض ومكة والمدينة وجميع
              المدن السعودية — بنفس السيارة طوال الطريق، بأجرة ثابتة، في الاتجاهين.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/96597896907?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%B1%D8%AD%D9%84%D8%A9%20%D9%85%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9"
          className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          اسأل عن الأسعار
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </a>
      </Container>
    </section>
  );
}

const rates = [
  { icon: MapPin, title: "مشوار داخل المدينة", price: "من 3 د.ك", description: "رحلات مباشرة داخل مدينة الكويت والمناطق المجاورة." },
  { icon: PlaneTakeoff, title: "توصيل المطار", price: "من 7 د.ك", description: "أجرة ثابتة من وإلى مطار الكويت الدولي." },
  { icon: Clock3, title: "بالساعة", price: "من 8 د.ك / ساعة", description: "سائق تحت تصرفك للمشاوير المتعددة." },
  { icon: Building2, title: "مسافات طويلة", price: "من 15 د.ك", description: "رحلات خارج المدينة بأجرة ثابتة واحدة." },
];

export function RatesAr() {
  return (
    <section id="rates" className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr
          eyebrow="أسعار شفافة"
          title="أسعارنا"
          description="أسعار استرشادية — سعرك الثابت النهائي يُؤكد دائمًا قبل الحجز."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rates.map(({ icon: Icon, title, price, description }) => (
            <div key={title} className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <div className="text-xl font-bold text-brand-green">{price}</div>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const rideTypes = [
  "توصيل المطار",
  "نقل الشركات",
  "حفلات الزفاف والمناسبات",
  "مشاوير خاصة داخل المدينة",
  "خدمة بالساعة",
  "رحلات المسافات الطويلة",
  "رحلات عائلية مع مقاعد أطفال",
  "نقل المجموعات بالفانات",
];

const commitments = [
  "سائقون مدربون باحترافية",
  "سلامة الركاب أولويتنا الأولى",
  "دعم ومساعدة على مدار الساعة",
  "تتبع مباشر لكل رحلة",
  "أفضل سعر مع أجرة ثابتة مضمونة",
  "مقاعد مريحة ومعقمة",
];

export function ReserveCtaAr() {
  return (
    <section className="bg-brand-green-dark py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <div className="flex max-w-xl flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold text-red-400">جاهزون في أي وقت</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">احجز تاكسيك الآن!</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">رحلة لكل مناسبة في الكويت</h3>
            <ul className="flex flex-col gap-3">
              {rideTypes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-emerald-100">
                  <Check className="h-5 w-5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">ملتزمون بإيصالك بأمان</h3>
            <ul className="flex flex-col gap-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-center gap-3 text-emerald-100">
                  <Check className="h-5 w-5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#reservation"
          className="flex h-12 items-center justify-center rounded-full bg-brand-red px-10 text-base font-semibold text-white transition-colors hover:bg-red-700"
        >
          احجز الآن
        </a>
      </Container>
    </section>
  );
}

const areas = [
  "مدينة الكويت",
  "السالمية",
  "حولي",
  "الفحيحيل",
  "الفروانية",
  "الجهراء",
  "الأحمدي",
  "المنقف",
  "الجابرية",
  "المهبولة",
];

export function AreasWeServeAr() {
  return (
    <section id="areas" className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr
          eyebrow="التغطية"
          title="المناطق التي نخدمها"
          description="خدمتنا تغطي جميع محافظات الكويت الست — من العاصمة إلى الجهراء."
        />
        <div className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {areas.map((area) => (
            <div key={area} className="flex w-56 shrink-0 snap-start flex-col overflow-hidden rounded-2xl ring-1 ring-black/5">
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green">
                <MapPin className="h-10 w-10 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-col gap-1 bg-white p-4">
                <h3 className="font-semibold text-zinc-900">{area}</h3>
                <span className="text-xs text-zinc-500">توصيل يومي ومشاوير داخل المدينة</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const aboutPoints = [
  { icon: ShieldCheck, title: "مشغّل مرخص", description: "مرخصون ومؤمّنون بالكامل وفق أنظمة النقل التجاري الكويتية." },
  { icon: MapPinned, title: "خبرة محلية", description: "سائقون يعرفون طرق الكويت وأحياءها واختصاراتها عن ظهر قلب." },
  { icon: CarFront, title: "أسطول بحالة ممتازة", description: "كل مركبة تُفحص وتُنظف ويُصان تكييفها قبل كل وردية." },
];

export function AboutAr() {
  return (
    <section id="about" className="bg-brand-green-light/40 py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 grid h-80 grid-cols-2 gap-4 lg:order-1">
          <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-brand-green-light text-brand-green">
            <CarFront className="h-14 w-14" strokeWidth={1.25} />
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green text-white">
            <MapPinned className="h-14 w-14" strokeWidth={1.25} />
          </div>
        </div>

        <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
          <span className="text-sm font-bold text-brand-red">عن تاكسي الكويت</span>
          <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            تاكسي الكويت — لرحلات يومية موثوقة
          </h2>
          <p className="text-zinc-600">
            أسسنا تاكسي الكويت لحل أكبر شكويين لدى المسافرين: الأسعار غير
            المتوقعة والمواعيد غير الموثوقة. كل رحلة نقوم بها بأجرة ثابتة،
            متتبعة، وبقيادة سائق مرخص وموثوق.
          </p>
          <div className="flex flex-col gap-5">
            {aboutPoints.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{title}</h3>
                  <p className="text-sm text-zinc-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const faqs = [
  {
    question: "هل تقدمون أسعارًا ثابتة لتوصيل المطار؟",
    answer:
      "نعم. كل توصيلة مطار بسعر ثابت وشامل يُؤكد قبل إتمام الحجز — لا عدادات ولا زيادات مفاجئة.",
  },
  {
    question: "ما المناطق التي تغطونها في الكويت؟",
    answer:
      "نغطي جميع المحافظات: مدينة الكويت، حولي، السالمية، الفحيحيل، الفروانية، الجهراء، والأحمدي.",
  },
  {
    question: "هل تتتبعون رحلتي الجوية عند التأخير؟",
    answer:
      "نعم. نراقب رحلتك لحظة بلحظة ونعدّل موعد الاستقبال تلقائيًا، مع 60 دقيقة انتظار مجاني من لحظة الهبوط الفعلي.",
  },
  {
    question: "هل يمكنني طلب مقعد أطفال؟",
    answer: "نعم، مقاعد الأطفال المعتمدة متوفرة عند الطلب دون أي رسوم إضافية — فقط أخبرنا عند الحجز.",
  },
  {
    question: "ما طرق الدفع المتاحة؟",
    answer: "نقبل الدفع نقدًا، عبر كي-نت، بالبطاقات البنكية، أو الدفع الإلكتروني عند الحجز.",
  },
  {
    question: "هل تتوفرون على رحلات إلى السعودية؟",
    answer:
      "نعم — رحلات مباشرة من الباب إلى الباب إلى الخفجي والدمام والرياض ومكة والمدينة وجدة، بنفس السيارة عبر الحدود وفي الاتجاهين.",
  },
];

export function FaqAr() {
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
    <section id="faq" className="bg-white py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="flex flex-col items-center gap-10">
        <SectionHeadingAr
          eyebrow="الأسئلة الشائعة"
          title="أسئلة يكثر طرحها"
          description="إجابات سريعة على أكثر الأسئلة شيوعًا حول الحجز معنا."
        />
        <div className="flex w-full max-w-2xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-zinc-200 px-5 py-4 open:bg-brand-green-light/40"
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

const fleet = [
  { icon: Car, name: "سيدان", pax: 3, bags: 3, description: "مثالية للمشاوير داخل المدينة وتوصيل المطار." },
  { icon: CarFront, name: "دفع رباعي (SUV)", pax: 6, bags: 6, description: "الخيار الأمثل للعائلات والمجموعات مع الأمتعة." },
  { icon: Users, name: "فان", pax: 10, bags: 10, description: "مصمم لنقل المجموعات والمناسبات." },
  { icon: Crown, name: "سيدان فاخرة", pax: 3, bags: 2, description: "راحة فائقة لرجال الأعمال ونقل كبار الشخصيات." },
];

export function FleetAr() {
  return (
    <section id="fleet" className="bg-brand-black py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="أسطولنا" title="أسطول بمواصفات تنفيذية" dark />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map(({ icon: Icon, name, pax, bags, description }) => (
            <div key={name} className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green">
                <Icon className="h-12 w-12 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <h3 className="font-semibold text-white">{name}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-emerald-400" />
                    {pax} ركاب
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-emerald-400" />
                    {bags} حقائب
                  </span>
                </div>
                <p className="text-sm leading-6 text-zinc-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const checklistItems = [
  "تتبع مباشر للرحلات في كل استقبال من المطار",
  "60 دقيقة انتظار مجاني من لحظة الهبوط الفعلي",
  "أجرة ثابتة وشاملة متفق عليها قبل انطلاق الرحلة",
  "سائقون بلباس رسمي يتحدثون العربية والإنجليزية",
  "استقبال وترحيب داخل صالة الوصول",
  "دعم وخدمة عملاء على مدار الساعة",
  "مركبات نظيفة ومكيفة لكل رحلة",
  "مقاعد أطفال معتمدة عند الطلب مجانًا",
  "الدفع نقدًا أو بالبطاقة أو كي-نت",
  "تغطية جميع محافظات الكويت",
];

export function FeaturesChecklistAr() {
  return (
    <section className="relative overflow-hidden bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="relative flex flex-col items-center gap-12">
        <SectionHeadingAr eyebrow="الفرق معنا" title="ما الذي يميز خدمة توصيل المطار لدينا؟" />
        <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {checklistItems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <span className="text-zinc-700">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
