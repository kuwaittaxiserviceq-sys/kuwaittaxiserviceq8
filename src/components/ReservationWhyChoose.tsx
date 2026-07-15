import { Award, Building2, CarFront, Compass } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const points = [
  {
    icon: Compass,
    title: "Why Ride With Us",
    description:
      "Our drivers are experienced, prepared, and treat your safety as the top priority. We work every day of the week, day and night, at flat rates agreed before you ride.",
  },
  {
    icon: CarFront,
    title: "What Makes Us the Best Option?",
    description:
      "Every time you land in Kuwait, you want to get home quickly. We understand and respect your schedule, so our drivers are ready and dressed professionally the moment you land.",
  },
  {
    icon: Award,
    title: "Kuwait's Largest Taxi Fleet",
    description:
      "Our experience and steadfast customer base come from having one of the largest fleets in Kuwait, from everyday sedans to premium SUVs and vans.",
  },
  {
    icon: Building2,
    title: "Reliable, Professional, Trusted",
    description:
      "These three qualities define how we operate and let us offer a genuinely simple airport transport experience to corporate and public clients alike.",
  },
];

export default function ReservationWhyChoose() {
  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading eyebrow="Why Book With Us" title="Why Choose Kuwait Taxi Service" />

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                <Icon className="h-7 w-7" />
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
