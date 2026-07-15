import { HeartHandshake, ShieldCheck, Wallet } from "lucide-react";
import Container from "./Container";

const stats = [
  { icon: Wallet, value: "Fixed Fares", label: "Affordable, agreed upfront" },
  { icon: ShieldCheck, value: "Vetted Drivers", label: "Reliable chauffeurs" },
  { icon: HeartHandshake, value: "24/7", label: "Always-on support" },
];

export default function StatsBar() {
  return (
    <section className="bg-brand-green">
      <Container className="grid grid-cols-1 divide-y divide-white/15 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={value}
            className={`flex flex-col items-center gap-2 py-6 text-center sm:py-0 ${
              i === 0 ? "" : "sm:pl-6"
            } ${i === stats.length - 1 ? "" : "sm:pr-6"}`}
          >
            <Icon className="h-7 w-7 text-white" />
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-sm text-emerald-100">{label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
