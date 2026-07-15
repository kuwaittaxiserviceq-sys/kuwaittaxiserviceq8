import { CalendarCheck, CarFront, Handshake, PlaneLanding } from "lucide-react";
import Container from "./Container";

const steps = [
  { icon: CalendarCheck, title: "Book", description: "Reserve online or by phone in under a minute." },
  { icon: PlaneLanding, title: "We Track", description: "Your flight status is monitored in real time." },
  { icon: Handshake, title: "Meet & Greet", description: "Your chauffeur waits for you inside arrivals." },
  { icon: CarFront, title: "Ride in Comfort", description: "Relax in an A/C, freshly cleaned vehicle." },
];

export default function VipExperience() {
  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark via-brand-green to-emerald-700 sm:h-96 lg:order-1">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <CarFront className="relative h-28 w-28 text-white/90" strokeWidth={1.1} />
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-red">
              The Experience
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The VIP Arrival Experience
            </h2>
            <p className="text-zinc-400">
              Step-by-step, here&apos;s exactly what happens from booking to
              your final drop-off.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
