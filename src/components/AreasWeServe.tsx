import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { slugifyArea } from "@/lib/areas";

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
          {areas.map((area) => (
            <Link
              key={area}
              href={`/areas/${slugifyArea(area)}`}
              className="group flex w-56 shrink-0 snap-start flex-col overflow-hidden rounded-2xl ring-1 ring-black/5 transition-shadow hover:shadow-lg"
            >
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green transition-transform group-hover:scale-105">
                <MapPin className="h-10 w-10 text-white/90" strokeWidth={1.25} />
              </div>
              <div className="flex flex-col gap-1 bg-white p-4">
                <h3 className="font-semibold text-zinc-900 group-hover:text-brand-green">{area}</h3>
                <span className="text-xs text-zinc-500">Daily transfers &amp; city rides</span>
              </div>
            </Link>
          ))}

          <Link
            href="/areas"
            className="flex w-56 shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-green/40 text-brand-green transition-colors hover:bg-brand-green-light/60"
          >
            <ArrowRight className="h-6 w-6" />
            <span className="font-semibold">View All Areas</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
