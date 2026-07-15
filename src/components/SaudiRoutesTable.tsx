import { Plane } from "lucide-react";
import { saudiRoutes } from "./saudiRoutes";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function SaudiRoutesTable() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Routes & Fares"
          title="Kuwait ⇄ Saudi Arabia Routes"
          description="One-way fares per vehicle (not per passenger), in either direction. Distances measured from Kuwait City; pickup from any area in Kuwait at no extra charge."
        />

        <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Destination</th>
                <th className="px-4 py-3 font-semibold">Distance</th>
                <th className="px-4 py-3 font-semibold">Duration*</th>
                <th className="px-4 py-3 font-semibold">Sedan (3)</th>
                <th className="px-4 py-3 font-semibold">SUV (6)</th>
                <th className="px-4 py-3 font-semibold">Van (10)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {saudiRoutes.map((route) => (
                <tr key={route.city} className="even:bg-zinc-50/60">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-900">{route.city}</div>
                    <div className="text-xs text-zinc-500">{route.region}</div>
                    {route.airport && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-brand-green">
                        <Plane className="h-3 w-3" />
                        {route.airport}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{route.distanceKm} km</td>
                  <td className="px-4 py-3 text-zinc-600">{route.duration}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {route.sedan}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {route.suv}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {route.van}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-500">
          *Durations include typical border processing at Al-Nuwaiseeb.
          Long-haul routes (Riyadh, Jeddah, Makkah, Madinah) include
          scheduled rest stops. Need a city not listed — Taif, Abha,
          Al-Ahsa, Qassim? Call{" "}
          <a href="tel:+96518008080" className="font-semibold text-brand-green">
            +965 1800 8080
          </a>{" "}
          for an instant quote.
        </p>
      </Container>
    </section>
  );
}
