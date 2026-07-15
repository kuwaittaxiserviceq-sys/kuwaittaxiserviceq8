import Link from "next/link";
import { CarFront, MapPinned, ShieldCheck } from "lucide-react";
import Container from "./Container";

const points = [
  { icon: ShieldCheck, title: "Licensed operator", description: "Fully licensed and insured under Kuwaiti commercial transport regulations." },
  { icon: MapPinned, title: "Local expertise", description: "Drivers who know Kuwait's roads, shortcuts, and neighborhoods by heart." },
  { icon: CarFront, title: "Well-kept fleet", description: "Every vehicle is inspected, cleaned, and A/C-serviced before each shift." },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 grid h-80 grid-cols-2 gap-4 lg:order-1">
          <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-brand-green-light text-brand-green">
            <CarFront className="h-14 w-14" strokeWidth={1.25} />
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green text-white">
            <MapPinned className="h-14 w-14" strokeWidth={1.25} />
          </div>
        </div>

        <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-red">
            About Kuwait Taxi
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Kuwait Taxi &mdash; Built for Reliable, Everyday Rides
          </h2>
          <p className="text-zinc-600">
            We started Kuwait Taxi to fix the two biggest complaints
            travelers had about local taxis: unpredictable pricing and
            unreliable pickups. Every ride we run is fixed-fare, tracked,
            and driven by a licensed, vetted chauffeur.
          </p>

          <div className="flex flex-col gap-5">
            {points.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{title}</h3>
                  <p className="text-sm text-zinc-600">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-2 flex h-11 w-fit items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Learn More About Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
