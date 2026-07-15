import { Quote, Star } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    name: "Verified Rider",
    location: "Salmiya",
    quote:
      "Arrived punctually and was very professional. An excellent, patient driver — I wouldn't hesitate to use this service again.",
  },
  {
    name: "Verified Rider",
    location: "Kuwait City",
    quote:
      "Fixed price, no surprises, and the car was spotless. Made my early morning flight without any stress.",
  },
  {
    name: "Corporate Client",
    location: "Hawalli",
    quote:
      "We use Kuwait Taxi Service for all our staff airport transfers. Always on time and easy to book online.",
  },
  {
    name: "Verified Rider",
    location: "Fahaheel",
    quote:
      "Booked last minute for a family trip and they still had a van ready with a child seat installed.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-green-dark py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading eyebrow="Testimonials" title="Client Experiences That Speak" dark />

        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {testimonials.map(({ name, location, quote }) => (
            <div
              key={`${name}-${location}`}
              className="flex w-80 shrink-0 snap-start flex-col gap-4 rounded-3xl bg-brand-green p-6"
            >
              <Quote className="h-7 w-7 text-emerald-300" />
              <p className="text-sm leading-6 text-emerald-50">{quote}</p>
              <div className="mt-auto flex items-center justify-between border-t border-white/15 pt-4">
                <div>
                  <div className="font-semibold text-white">{name}</div>
                  <div className="text-xs text-emerald-200">{location}</div>
                </div>
                <div className="flex gap-0.5 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
