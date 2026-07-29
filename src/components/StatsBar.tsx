import { ShieldCheck, Star, Timer, Users } from "lucide-react";
import Container from "./Container";

const stats = [
  { icon: Users, value: "500+", label: "Happy riders" },
  { icon: Star, value: "4.9/5", label: "Average rating" },
  { icon: ShieldCheck, value: "100%", label: "Licensed & insured" },
  { icon: Timer, value: "24/7", label: "Availability" },
];

export default function StatsBar() {
  return (
    <section className="bg-brand-black">
      <Container className="grid grid-cols-2 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={value}
            className="flex items-center justify-center gap-3 py-8 lg:py-10"
          >
            <Icon className="h-7 w-7 shrink-0 text-emerald-400" strokeWidth={1.5} />
            <div className="flex flex-col">
              <div className="text-xl font-bold text-white sm:text-2xl">{value}</div>
              <div className="text-xs text-zinc-400 sm:text-sm">{label}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
