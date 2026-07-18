import Link from "next/link";
import { CarFront, Mail, MapPin, Phone } from "lucide-react";
import Container from "../Container";

const quickLinks = [
  { href: "/ar", label: "الرئيسية" },
  { href: "/ar/airport-taxi", label: "تاكسي المطار" },
  { href: "/ar#services", label: "خدماتنا" },
  { href: "/ar#rates", label: "أسعارنا" },
  { href: "/ar#areas", label: "المناطق" },
  { href: "/ar#about", label: "من نحن" },
  { href: "/ar#fleet", label: "أسطولنا" },
];

const services = [
  "توصيل المطار",
  "تاكسي بالساعة",
  "خدمة الشركات",
  "مشاوير داخل المدينة",
  "رحلات المسافات الطويلة",
  "الكويت ⇄ السعودية",
];

export default function FooterAr() {
  return (
    <footer className="bg-brand-black">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/ar" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold text-white">تاكسي الكويت</span>
          </Link>
          <p className="text-sm leading-6 text-zinc-400">
            خدمة تاكسي وتوصيل مطار موثوقة بأسعار ثابتة في جميع أنحاء
            الكويت، على مدار الساعة.
          </p>
          <Link
            href="/"
            className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            English Version
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">روابط سريعة</h3>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">خدماتنا</h3>
          {services.map((service) => (
            <span key={service} className="text-sm text-zinc-400">
              {service}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white">اتصل بنا</h3>
          <a href="tel:+96597896907" className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span dir="ltr">9789 6907</span>
          </a>
          <a href="mailto:kuwaittaxiserviceq@gmail.com" className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            kuwaittaxiserviceq@gmail.com
          </a>
          <div className="flex items-start gap-3 text-sm text-zinc-400">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            مدينة الكويت، الكويت
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-zinc-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} خدمة تاكسي الكويت. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-2" aria-label="طرق الدفع المقبولة">
            {["كي-نت", "Visa", "Mastercard", "Apple Pay", "نقدًا"].map((method) => (
              <span
                key={method}
                className="rounded border border-white/15 px-2 py-1 text-[10px] font-semibold text-zinc-400"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              شروط الخدمة
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
