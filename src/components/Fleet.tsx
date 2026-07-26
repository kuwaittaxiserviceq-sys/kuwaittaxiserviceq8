import { Briefcase, User } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import VehicleIllustration from "./VehicleIllustration";

const fleet = [
  {
    type: "sedan" as const,
    name: "Sedan",
    pax: 3,
    bags: 3,
    description: "Ideal for city rides & airport pickups.",
  },
  {
    type: "suv" as const,
    name: "SUV",
    pax: 6,
    bags: 6,
    description: "Great for families & groups with luggage.",
  },
  {
    type: "van" as const,
    name: "Van",
    pax: 10,
    bags: 10,
    description: "Built for group transfers & events.",
  },
  {
    type: "luxury" as const,
    name: "Luxury Sedan",
    pax: 3,
    bags: 2,
    description: "Premium comfort for executives & VIP transfers.",
  },
];

export default function Fleet() {
  return (
    <section id="fleet" className="bg-brand-black py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Our Fleet"
          title="Executive Class Fleet"
          dark
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map(({ type, name, pax, bags, description }) => (
            <div
              key={name}
              className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10"
            >
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-green-dark to-brand-green">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <VehicleIllustration type={type} />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <h3 className="font-semibold text-white">{name}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-emerald-400" />
                    {pax} pax
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-emerald-400" />
                    {bags} bags
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
