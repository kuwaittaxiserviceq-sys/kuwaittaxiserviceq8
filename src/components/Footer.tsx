import Link from "next/link";
import { CarFront, Mail, MapPin, Phone } from "lucide-react";
import Container from "./Container";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.8h2.6l.4-3H13.5V8.2c0-.87.24-1.46 1.5-1.46h1.6V4.1C16.3 4.06 15.35 4 14.25 4c-2.3 0-3.87 1.4-3.87 4v2.2H8v3h2.38V21h3.12Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7 8.4L4.4 20H7l5-5.7 4 5.7h4l-7.3-8.8L19.6 4H17l-4.6 5.3L8.4 4H4Z" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.31-.09-.79-.17-2 .04-2.87.18-.78 1.18-4.98 1.18-4.98s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.72-4.08-4.19-4.08-2.85 0-4.53 2.14-4.53 4.35 0 .86.33 1.79.75 2.29.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.04.19-.15.23-.34.14-1.25-.58-2.03-2.41-2.03-3.88 0-3.16 2.3-6.06 6.62-6.06 3.48 0 6.18 2.48 6.18 5.79 0 3.45-2.18 6.23-5.2 6.23-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.98.45 5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.1V20h2.84V8.5ZM5.52 7.27a1.64 1.64 0 1 0 0-3.27 1.64 1.64 0 0 0 0 3.27ZM20 13.4c0-3.06-1.63-4.9-4.1-4.9-1.5 0-2.44.77-2.9 1.5h-.06l-.13-1.5H9.9c.04.94.06 2 .06 3.24V20h2.84v-6.4c0-.3.02-.6.1-.8.24-.6.76-1.2 1.66-1.2 1.17 0 1.6.9 1.6 2.2V20H20v-6.6Z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/#fleet", label: "Our Fleet" },
  { href: "/areas", label: "Areas We Serve" },
  { href: "/#services", label: "Our Services" },
  { href: "/rates", label: "Our Rates" },
  { href: "/reservation", label: "Reservation" },
  { href: "/contact", label: "Contact Us" },
];

const services = [
  "Hourly Taxi Service",
  "Corporate Service",
  "Private City Rides",
  "Long-Distance Trips",
];

const serviceLinks = [
  { href: "/airport-taxi", label: "Kuwait Airport Taxi" },
  { href: "/saudi-transfers", label: "Kuwait ⇄ Saudi Transfers" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold text-white">Kuwait Taxi</span>
          </Link>
          <p className="text-sm leading-6 text-zinc-400">
            Reliable, fixed-fare taxi and airport transfer service across
            Kuwait, available 24 hours a day.
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                Icon: LinkedInIcon,
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/kuwait-taxi-service-q-8/",
              },
              {
                Icon: FacebookIcon,
                label: "Facebook",
                href: "https://www.facebook.com/profile.php?id=61591620856337",
              },
              {
                Icon: PinterestIcon,
                label: "Pinterest",
                href: "https://www.pinterest.com/kuwaittaxiserviceq8/",
              },
              { Icon: InstagramIcon, label: "Instagram", href: "#" },
              { Icon: XIcon, label: "X (Twitter)", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                {...(href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-green"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">Quick Links</h3>
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
          <h3 className="font-semibold text-white">Services</h3>
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {link.label}
            </Link>
          ))}
          {services.map((service) => (
            <span key={service} className="text-sm text-zinc-400">
              {service}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white">Contact Us</h3>
          <a href="tel:+96597896907" className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            9789 6907
          </a>
          <a href="mailto:kuwaittaxiserviceq@gmail.com" className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            kuwaittaxiserviceq@gmail.com
          </a>
          <div className="flex items-start gap-3 text-sm text-zinc-400">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>
              Office 34, Mezzanine Floor, Al-Manqaf Commercial Center,
              <br />
              Block 4, Street 14, Al-Manqaf, Kuwait
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-zinc-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Kuwait Taxi Service. All rights reserved.</span>
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {["KNET", "Visa", "Mastercard", "Apple Pay", "Cash"].map((method) => (
              <span
                key={method}
                className="rounded border border-white/15 px-2 py-1 text-[10px] font-semibold tracking-wide text-zinc-400"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
