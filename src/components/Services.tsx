import {
  ArrowLeftRight,
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
    href: "#reservation",
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
          {services.map(({ icon: Icon, title, description, href, cta }) => (
            <div
              key={title}
              className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5"
            >
              <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-brand-green to-emerald-700">
                <Icon className="h-12 w-12 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{description}</p>
                <a
                  href={href}
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  {cta ?? "Book This Service"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
