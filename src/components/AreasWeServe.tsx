import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

const cardCrops = [
  { position: "50% 35%", scale: 1 },
  { position: "78% 55%", scale: 1.9 },
  { position: "15% 60%", scale: 2.3 },
  { position: "60% 20%", scale: 1.3 },
  { position: "35% 70%", scale: 1.7 },
  { position: "88% 30%", scale: 1.5 },
];

function nearbyAreas(area: string) {
  const row = ratesData.find((r) => r.area === area);
  if (!row) return null;
  return ratesData
    .filter((r) => r.governorate === row.governorate && r.area !== area)
    .slice(0, 2)
    .map((r) => r.area)
    .join(", ");
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
          {areas.map((area, i) => (
            <Link
              key={area}
              href={`/areas/${slugifyArea(area)}`}
              className="group relative h-44 w-56 shrink-0 snap-start overflow-hidden rounded-2xl ring-1 ring-black/5 transition-shadow hover:shadow-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kuwait-taxi-service-hero.webp"
                alt={`Taxi service in ${area}, Kuwait`}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: cardCrops[i % cardCrops.length].position,
                  transform: `scale(${cardCrops[i % cardCrops.length].scale})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-0.5 p-4">
                <h3 className="font-bold text-white">{area}</h3>
                <span className="text-xs text-zinc-200">
                  {nearbyAreas(area) || "Daily transfers & city rides"}
                </span>
              </div>
            </Link>
          ))}

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
