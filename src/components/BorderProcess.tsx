import { CheckCircle2, CreditCard, FileCheck, Landmark, MoonStar, Route } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: Route,
    title: "One Vehicle, Door to Door",
    description:
      "No changing cars at the border and no shared shuttles. The same driver and vehicle take you from your doorstep in Kuwait to your exact address in Saudi Arabia — or the other way around.",
  },
  {
    icon: Landmark,
    title: "Border Formalities Handled",
    description:
      "We cross at Al-Nuwaiseeb (Al-Khafji) — the main Kuwait–Saudi crossing. Your driver manages the vehicle paperwork and guides you through passport control, typically 30–60 minutes.",
  },
  {
    icon: MoonStar,
    title: "Umrah & Ziyarah Trips",
    description:
      "Direct rides to Makkah and Madinah for Umrah, with prayer and rest stops on the way. Vans available for families and groups, with luggage space for Zamzam and gifts on the return.",
  },
  {
    icon: CreditCard,
    title: "Fixed Fare, Both Directions",
    description:
      "The fare you're quoted covers the whole trip — fuel, driver, and border fees included. Pay in KD or SAR, by cash, KNET, or card. No surprises at the border or on arrival.",
  },
];

const requirements = [
  "Valid passport (at least 6 months validity)",
  "Valid Saudi visa — eVisa, Umrah visa, or visit visa (GCC nationals: civil ID only)",
  "For the return leg into Kuwait: valid Kuwait visa or residency (iqama)",
  "Children must have their own travel documents",
];

export default function BorderProcess() {
  return (
    <section className="bg-brand-green-light/60 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="How It Works"
          title="Border Crossing, Made Simple"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-brand-green" />
            <h3 className="text-lg font-semibold text-zinc-900">
              What You Need to Travel
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            Visa and entry requirements are set by the authorities and can
            change — please confirm your documents are in order before
            travel. We&apos;ll remind you of the checklist when you book.
          </p>
        </div>
      </Container>
    </section>
  );
}
