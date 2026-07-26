import {
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  Building2,
  CarFront,
  Clock3,
  PlaneTakeoff,
} from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: PlaneTakeoff,
    title: "Airport Transfer Service",
    description:
      "Door-to-door transfers to and from Kuwait International Airport, with live flight tracking included.",
    href: "/airport-taxi",
    cta: "Airport Taxi Fares",
  },
  {
    icon: ArrowLeftRight,
    title: "Kuwait ⇄ Saudi Border Crossing",
    description:
      "Direct rides to Khafji, Dammam, Riyadh, Makkah, Madinah & Jeddah — same vehicle across the border, both directions.",
    href: "/saudi-transfers",
    cta: "View Routes & Fares",
  },
  {
    icon: Clock3,
    title: "Hourly Taxi Service",
    description:
      "Keep a chauffeur and vehicle on standby for multi-stop errands, events, or a full day out.",
    href: "#reservation",
  },
  {
    icon: Building2,
    title: "Corporate Service",
    description:
      "Reliable, invoiced transport for business travelers, roadshows, and executive meetings.",
    href: "#reservation",
  },
  {
    icon: Briefcase,
    title: "Private City Rides",
    description:
      "On-demand, point-to-point rides across Kuwait City, Salmiya, Hawalli, and Fahaheel.",
    href: "#reservation",
  },
  {
    icon: CarFront,
    title: "Long-Distance Trips",
    description:
      "Comfortable, fixed-fare rides for out-of-city trips, with a rested and briefed driver.",
    href: "#reservation",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading eyebrow="What We Offer" title="Our Services" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, href, cta }, i) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 -top-5 text-6xl font-black text-brand-green-light select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg shadow-brand-green/30 transition-transform duration-300 group-hover:-rotate-6">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <div className="relative flex flex-1 flex-col gap-2">
                <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{description}</p>
              </div>
              <a
                href={href}
                className="relative mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-green"
              >
                {cta ?? "Book This Service"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
