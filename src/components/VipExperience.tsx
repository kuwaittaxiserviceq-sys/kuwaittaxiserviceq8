import { CalendarCheck, CarFront, CheckCircle2, Handshake, PlaneLanding } from "lucide-react";
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
        <div className="order-2 flex items-center justify-center lg:order-1">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl shadow-black/50 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white">
                  <CarFront className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-zinc-900">Kuwait Taxi</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Confirmed
              </span>
            </div>

            <div className="mt-7 flex items-center gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  From
                </span>
                <span className="text-sm font-semibold text-zinc-900">
                  Kuwait Int&apos;l Airport
                </span>
              </div>
              <div className="flex flex-1 items-center gap-1.5 px-1">
                <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
                <CarFront className="h-4 w-4 shrink-0 text-brand-green" />
                <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
              </div>
              <div className="flex flex-1 flex-col items-end gap-1 text-right">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  To
                </span>
                <span className="text-sm font-semibold text-zinc-900">
                  Your Address
                </span>
              </div>
            </div>

            <div className="relative my-7 -mx-6 sm:-mx-7">
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-brand-black" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-brand-black" />
              <div className="mx-6 border-t-2 border-dashed border-zinc-200 sm:mx-7" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-400">Chauffeur</span>
                <span className="text-sm font-semibold text-zinc-900">Licensed &amp; Vetted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-400">Vehicle</span>
                <span className="text-sm font-semibold text-zinc-900">Sedan &middot; A/C</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-400">Wait Time</span>
                <span className="text-sm font-semibold text-zinc-900">Free 60 min</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-400">Fare</span>
                <span className="text-sm font-semibold text-brand-green">Fixed, No Surge</span>
              </div>
            </div>
          </div>
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
