import Link from "next/link";
import { Building2, Clock3, MapPin, PlaneTakeoff } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const rates = [
  { icon: MapPin, title: "City Ride", price: "From KD 3", description: "Point-to-point rides within Kuwait City & nearby areas." },
  { icon: PlaneTakeoff, title: "Airport Transfer", price: "From KD 7", description: "Fixed fare to or from Kuwait International Airport." },
  { icon: Clock3, title: "Hourly Hire", price: "From KD 8 / hr", description: "Keep a chauffeur on standby for multi-stop trips." },
  { icon: Building2, title: "Long-Distance", price: "From KD 15", description: "Out-of-city trips at one flat, agreed fare." },
];

export default function Rates() {
  return (
    <section id="rates" className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Our Rates"
          description="Indicative starting fares — your exact fixed price is always confirmed before you book."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rates.map(({ icon: Icon, title, price, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <div className="text-xl font-bold text-brand-green">{price}</div>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/rates"
          className="flex h-11 items-center justify-center rounded-full bg-brand-green px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          View Full Rate Card
        </Link>
      </Container>
    </section>
  );
}
