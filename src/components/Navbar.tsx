"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarFront, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/#fleet", label: "Our Fleet" },
  { href: "/areas", label: "Areas We Serve" },
  { href: "/#services", label: "Our Services" },
  { href: "/saudi-transfers", label: "Saudi Transfers" },
  { href: "/rates", label: "Our Rates" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="sticky top-0 z-30">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <div className="hidden bg-brand-black text-zinc-300 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a
              href="mailto:kuwaittaxiserviceq@gmail.com"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-red" />
              kuwaittaxiserviceq@gmail.com
            </a>
            <a href="tel:+96597896907" className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand-red" />
              9789 6907
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open 24/7 &middot; Available Now
          </div>
        </div>
      </div>

      <header className="border-b border-zinc-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight text-zinc-900">
              Kuwait Taxi
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-brand-green ${
                  isActive(link.href)
                    ? "font-semibold text-brand-green"
                    : "text-zinc-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/ar"
              className="flex h-10 shrink-0 items-center rounded-full bg-zinc-100 px-4 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-200"
              aria-label="النسخة العربية"
            >
              العربية
            </Link>
            <a
              href="https://wa.me/96597896907"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 sm:flex"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Link
              href="/reservation"
              className="hidden h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark sm:flex"
            >
              Book a Ride
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
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
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`border-b border-zinc-50 py-3 text-sm font-medium last:border-0 hover:text-brand-green ${
                    isActive(link.href) ? "font-semibold text-brand-green" : "text-zinc-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+96597896907"
                className="flex items-center gap-2 py-3 text-sm font-semibold text-brand-green"
              >
                <Phone className="h-4 w-4" />
                Call 9789 6907
              </a>
              <Link
                href="/reservation"
                onClick={() => setOpen(false)}
                className="mt-1 mb-2 flex h-11 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Book a Ride
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
