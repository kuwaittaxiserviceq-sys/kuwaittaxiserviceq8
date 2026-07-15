"use client";

import { useState } from "react";
import Link from "next/link";
import { CarFront, Globe, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

const links = [
  { href: "/ar", label: "الرئيسية" },
  { href: "/ar#services", label: "خدماتنا" },
  { href: "/ar#rates", label: "أسعارنا" },
  { href: "/ar#areas", label: "المناطق" },
  { href: "/ar#about", label: "من نحن" },
  { href: "/ar#fleet", label: "أسطولنا" },
  { href: "/ar#faq", label: "الأسئلة الشائعة" },
];

export default function NavbarAr() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        تخطَّ إلى المحتوى الرئيسي
      </a>

      <div className="hidden bg-brand-black text-zinc-300 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a
              href="mailto:info@kuwaittaxiservice.com"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-red" />
              info@kuwaittaxiservice.com
            </a>
            <a href="tel:+96518008080" className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand-red" />
              <span dir="ltr">1800 8080</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            متاحون الآن &middot; على مدار الساعة
          </div>
        </div>
      </div>

      <header className="border-b border-zinc-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/ar" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold text-zinc-900">تاكسي الكويت</span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium whitespace-nowrap text-zinc-600 transition-colors hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 items-center gap-1.5 rounded-full bg-zinc-100 px-4 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-200"
              aria-label="Switch to English"
            >
              <Globe className="h-4 w-4" />
              English
            </Link>
            <a
              href="https://wa.me/96518008080?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%AA%D8%A7%D9%83%D8%B3%D9%8A"
              className="hidden h-10 items-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark sm:flex"
            >
              <MessageCircle className="h-4 w-4" />
              احجز الآن
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-zinc-100 bg-white xl:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-zinc-50 py-3 text-sm font-medium text-zinc-700 last:border-0 hover:text-brand-green"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+96518008080"
                className="flex items-center gap-2 py-3 text-sm font-semibold text-brand-green"
              >
                <Phone className="h-4 w-4" />
                اتصل: <span dir="ltr">1800 8080</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
