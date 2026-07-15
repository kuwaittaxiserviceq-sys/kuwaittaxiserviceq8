import Link from "next/link";
import { Check } from "lucide-react";
import Container from "./Container";

const rideTypes = [
  "Airport transfer service",
  "Corporate transportation",
  "Wedding & event transport",
  "Private city rides",
  "Hourly hire service",
  "Long-distance trips",
  "Family rides with child seats",
  "Group & van transport",
];

const commitments = [
  "Professionally trained chauffeurs",
  "Passenger safety as the top priority",
  "24/7 help & support desk",
  "Live GPS tracking on every ride",
  "Best price with a guaranteed fixed fare",
  "Comfortable, sanitized seating",
];

export default function ReserveCta() {
  return (
    <section className="bg-brand-green-dark py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <div className="flex max-w-xl flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-red-400">
            Ready When You Are
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Reserve Your Taxi Now!
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">
              A Ride for Every Occasion in Kuwait
            </h3>
            <ul className="flex flex-col gap-3">
              {rideTypes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-emerald-100">
                  <Check className="h-5 w-5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">
              Committed to Getting You There Safely
            </h3>
            <ul className="flex flex-col gap-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-center gap-3 text-emerald-100">
                  <Check className="h-5 w-5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/reservation"
          className="flex h-12 items-center justify-center rounded-full bg-brand-red px-10 text-base font-semibold text-white transition-colors hover:bg-red-700"
        >
          Book Now
        </Link>
      </Container>
    </section>
  );
}
