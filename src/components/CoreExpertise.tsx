import { CarFront, Compass, Plane, ShieldCheck } from "lucide-react";
import Container from "./Container";

const points = [
  {
    icon: Plane,
    title: "Flight Tracking",
    description:
      "At Kuwait Taxi Service, we specialize in real-time flight tracking to ensure on-time airport pickups across Kuwait International Airport. Our system monitors departures and arrivals so your chauffeur is dispatched at exactly the right time, even when flights land early or are delayed.",
  },
  {
    icon: Compass,
    title: "Route Planning",
    description:
      "Our team excels in smart route planning, monitoring Gulf Road, the Fahaheel Expressway, and the Sixth Ring Road live. We account for traffic, roadworks, and peak-hour delays to guarantee on-time pickups and drop-offs, turning every trip into a smooth, stress-free experience.",
  },
  {
    icon: ShieldCheck,
    title: "Local Road & Rules Knowledge",
    description:
      "Our chauffeurs are fully trained in safe and compliant transfer protocols across every governorate. We navigate checkpoints, drop-off zones, and airport traffic management efficiently, with attention to detail and a focus on safety that clients trust for a professional, worry-free ride.",
  },
  {
    icon: CarFront,
    title: "Vehicle Handling & Comfort",
    description:
      "Kuwait Taxi Service takes pride in comfortable, well-maintained fleet handling across sedans, SUVs, and vans. Each vehicle is inspected, sanitized, and A/C-serviced to provide a premium experience for every traveler, so every ride feels valued, secure, and worry-free.",
  },
];

export default function CoreExpertise() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
        {points.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-start gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
            <p className="text-sm leading-6 text-zinc-600">{description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
