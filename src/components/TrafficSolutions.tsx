import { Gauge, PlaneLanding, Wallet } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    icon: Gauge,
    title: "Real-Time Traffic Bypass",
    description:
      "Dispatch monitors Gulf Road, the Fahaheel Expressway, and the Sixth Ring Road live, rerouting your driver the moment congestion builds.",
  },
  {
    icon: PlaneLanding,
    title: "Kuwait Airport Arrival Protocol",
    description:
      "Your chauffeur tracks the live status of your flight and waits inside arrivals — no circling, no missed pickups.",
  },
  {
    icon: Wallet,
    title: "No Surge, Ever",
    description:
      "Our flat-rate pricing model means your fare never changes for traffic, time of day, or demand — what you're quoted is what you pay.",
  },
];

export default function TrafficSolutions() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Built For Kuwait's Roads"
          title="How We Beat Kuwait's Rush-Hour Traffic"
          description="Every ride is planned around the realities of getting around Kuwait — not just a straight line on a map."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5">
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <Icon className="relative h-14 w-14 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-col gap-2 bg-white p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
