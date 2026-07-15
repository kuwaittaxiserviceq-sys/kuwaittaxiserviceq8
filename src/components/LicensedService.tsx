import { CarFront, CheckCircle2, Plane, ShieldCheck, Snowflake, Wallet } from "lucide-react";
import Container from "./Container";

const trustItems = [
  { icon: Plane, label: "Flight tracking so chauffeurs never miss a landing or delay." },
  { icon: ShieldCheck, label: "Verified chauffeurs with commercial licenses and vetted backgrounds." },
  { icon: Wallet, label: "Transparent, all-in pricing with no hidden fees or surge rates." },
  { icon: Snowflake, label: "Desert-ready fleet — full A/C, always serviced for Kuwait's heat." },
];

const checklist = [
  "Meet & greet inside Kuwait International Airport arrivals",
  "60 minutes of free waiting time from your flight's actual landing",
  "English & Arabic speaking, professionally uniformed chauffeurs",
  "Fixed fares agreed before you ride — confirmed by SMS",
];

export default function LicensedService() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 border-b border-zinc-100 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm leading-6 text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 pt-16 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-red">
              Licensed & Insured
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Kuwait&apos;s Licensed Airport Taxi Service
            </h2>
            <p className="text-zinc-600">
              Here&apos;s how our airport transfer service handles pickups
              automatically, so you never have to worry about delays,
              surge pricing, or unmarked cars.
            </p>
            <ul className="flex flex-col gap-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green sm:h-96">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <CarFront className="relative h-24 w-24 text-white/90" strokeWidth={1.25} />
          </div>
        </div>
      </Container>
    </section>
  );
}
