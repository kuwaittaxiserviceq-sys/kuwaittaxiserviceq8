import { BadgeCheck, Clock3, Lock, ShieldCheck } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const points = [
  {
    icon: ShieldCheck,
    title: "Committed to Your Safety & Peace of Mind",
    description:
      "Every vehicle is sanitized and thoroughly cleaned after each ride. Our drivers follow strict safety protocols to ensure a safe, worry-free trip.",
  },
  {
    icon: Lock,
    title: "Protecting Your Privacy Every Step of the Way",
    description:
      "We handle all customer information with the highest level of security, ensuring your personal details and booking data stay safe and private.",
  },
  {
    icon: Clock3,
    title: "Dependable & On-Time Transfers",
    description:
      "We ensure on-time pickups across every governorate, with real-time flight tracking that guarantees reliable, stress-free airport transfers.",
  },
  {
    icon: BadgeCheck,
    title: "Professional & Licensed Chauffeur Service",
    description:
      "Our drivers are fully licensed, insured, and trained, with every vehicle meticulously maintained for a safe, comfortable transfer experience.",
  },
];

export default function SafetyPriority() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading eyebrow="Your Safety and Privacy" title="Our Priority, Always" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
