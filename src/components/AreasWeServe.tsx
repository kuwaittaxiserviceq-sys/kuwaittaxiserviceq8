import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Landmark,
  PlaneLanding,
  Sun,
  Waves,
} from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { slugifyArea } from "@/lib/areas";
import { ratesData } from "./ratesData";

const areas = [
  "Kuwait City",
  "Salmiya",
  "Hawalli",
  "Fahaheel",
  "Farwaniya",
  "Jahra",
  "Ahmadi",
  "Mangaf",
  "Jabriya",
  "Mahboula",
];

const governorateStyle: Record<string, { gradient: string; icon: typeof Landmark }> = {
  "Al Asimah": { gradient: "from-brand-green-dark to-brand-green", icon: Landmark },
  Hawalli: { gradient: "from-emerald-700 to-emerald-500", icon: Building2 },
  Farwaniya: { gradient: "from-teal-700 to-teal-500", icon: PlaneLanding },
  Ahmadi: { gradient: "from-cyan-700 to-cyan-600", icon: Waves },
  Jahra: { gradient: "from-amber-700 to-amber-600", icon: Sun },
  "Mubarak Al-Kabeer": { gradient: "from-emerald-800 to-teal-600", icon: Building2 },
};

function areaMeta(area: string) {
  const row = ratesData.find((r) => r.area === area);
  const style = row ? governorateStyle[row.governorate] : undefined;
  const nearby = row
    ? ratesData
        .filter((r) => r.governorate === row.governorate && r.area !== area)
        .slice(0, 2)
        .map((r) => r.area)
        .join(", ")
    : null;

  return { style: style ?? governorateStyle["Al Asimah"], nearby };
}

export default function AreasWeServe() {
  return (
    <section id="areas" className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Coverage"
          title="Areas We Serve"
          description="Our taxi and airport transfer service covers every governorate across Kuwait."
        />

        <div className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {areas.map((area) => {
            const { style, nearby } = areaMeta(area);
            const Icon = style.icon;

            return (
              <Link
                key={area}
                href={`/areas/${slugifyArea(area)}`}
                className={`group relative flex h-44 w-56 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-4 ring-1 ring-black/5 transition-shadow hover:shadow-xl ${style.gradient}`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <Icon
                  className="absolute -right-3 -top-3 h-24 w-24 text-white/10 transition-transform group-hover:scale-110"
                  strokeWidth={1}
                />
                <div className="relative flex flex-col gap-0.5">
                  <h3 className="font-bold text-white">{area}</h3>
                  <span className="text-xs text-white/70">
                    {nearby || "Daily transfers & city rides"}
                  </span>
                </div>
              </Link>
            );
          })}

          <Link
            href="/areas"
            className="flex h-44 w-56 shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-green/40 text-brand-green transition-colors hover:bg-brand-green-light/60"
          >
            <ArrowRight className="h-6 w-6" />
            <span className="font-semibold">View All Areas</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
