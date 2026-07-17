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
        <div className="relative order-2 h-80 overflow-hidden rounded-3xl shadow-xl shadow-zinc-900/10 sm:h-96 lg:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kuwait-taxi-service-hero.webp"
            alt="Kuwait Taxi chauffeur and vehicle on Gulf Road with the city skyline"
            className="h-full w-full object-cover object-[80%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/10 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
              <CarFront className="h-5 w-5" />
            </span>
            <div className="text-sm">
              <div className="font-bold text-zinc-900">500+ Rides Completed</div>
              <div className="text-zinc-500">Trusted across Kuwait City</div>
            </div>
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
