import {
  Baby,
  CalendarX,
  Clock3,
  PlaneLanding,
  UserCheck,
  Wallet,
} from "lucide-react";
import Container from "./Container";

const inclusions = [
  { icon: UserCheck, label: "Meet & greet with a name sign in arrivals" },
  { icon: Clock3, label: "60 minutes free airport waiting time" },
  { icon: PlaneLanding, label: "Live flight tracking — no delay surcharges" },
  { icon: Baby, label: "Child seats free on request" },
  { icon: CalendarX, label: "Free cancellation up to 24 hours before pickup" },
  { icon: Wallet, label: "Fixed fare — no hidden costs, ever" },
];

export default function RideInclusions() {
  return (
    <section className="bg-brand-green">
      <Container className="py-10">
        <h2 className="mb-6 text-center text-lg font-bold text-white">
          Every Ride Includes
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {inclusions.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-emerald-50">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-4.5 w-4.5 text-white" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
