import Link from "next/link";
import { MapPin } from "lucide-react";
import { ratesData } from "./ratesData";
import Container from "./Container";
import { slugifyArea, governorateIntros } from "@/lib/areas";

const governorates = Array.from(new Set(ratesData.map((row) => row.governorate)));

export default function AreasGrid() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-16">
        {governorates.map((governorate) => (
          <div key={governorate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-zinc-900">
                {governorate} Governorate
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-zinc-600">
                {governorateIntros[governorate]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {ratesData
                .filter((row) => row.governorate === governorate)
                .map((row) => (
                  <Link
                    key={row.area}
                    href={`/areas/${slugifyArea(row.area)}`}
                    className="group flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5 transition-shadow hover:shadow-lg"
                  >
                    <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green transition-transform group-hover:scale-105">
                      <MapPin className="h-8 w-8 text-white/90" strokeWidth={1.25} />
                    </div>
                    <div className="bg-white p-3">
                      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-brand-green">
                        {row.area}
                      </h3>
                      <span className="text-xs text-zinc-500">Taxi &amp; transfer service</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
