import {
  BadgeCheck,
  Clock3,
  Compass,
  Plane,
  Snowflake,
  Wallet,
} from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: Compass,
    title: "Traffic-Aware Routing",
    description:
      "Live routing around Gulf Road and Fahaheel Expressway congestion keeps you on time, every time.",
  },
  {
    icon: Plane,
    title: "Flight-Synchronized Pickups",
    description:
      "We track your flight into Kuwait International Airport and adjust pickup time automatically.",
  },
  {
    icon: Wallet,
    title: "Competitive Flat Rates",
    description:
      "Your fare is agreed before the ride starts — no meters, no surge pricing, no surprises.",
  },
  {
    icon: Snowflake,
    title: "Desert-Ready Premium Fleet",
    description:
      "Every vehicle is serviced and A/C-certified to handle Kuwait's summer heat without a hitch.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Vetted Chauffeurs",
    description:
      "Commercially licensed drivers, background-checked and trained in professional etiquette.",
  },
  {
    icon: Clock3,
    title: "24/7 Commercial Service",
    description:
      "From dawn airport runs to late-night city rides, our dispatch never closes.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose Best Taxi Service Kuwait?"
        />

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
