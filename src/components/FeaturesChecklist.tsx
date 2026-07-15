import { CheckCircle2 } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const items = [
  "Real-time flight tracking on every airport pickup",
  "60 minutes free waiting time from actual landing",
  "Fixed, all-in fares agreed before the ride starts",
  "English & Arabic speaking, uniformed chauffeurs",
  "Meet & greet inside the arrivals hall",
  "24/7 dispatch and customer support desk",
  "Clean, A/C-serviced vehicles for every trip",
  "Certified child seats available on request",
  "Cash, card, and online payment options",
  "Coverage across every Kuwait governorate",
];

export default function FeaturesChecklist() {
  return (
    <section className="relative overflow-hidden bg-brand-green-light/60 py-16 sm:py-20">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0a6b3d 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="relative flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="The Difference"
          title="What Makes Our Airport Taxi Service Different?"
        />

        <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <span className="text-zinc-700">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
