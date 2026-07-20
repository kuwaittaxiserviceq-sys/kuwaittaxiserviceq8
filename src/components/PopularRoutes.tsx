import Link from "next/link";
import { ArrowRight, Clock3, MoveRight } from "lucide-react";
import Container from "./Container";
import { saudiRoutes } from "./saudiRoutes";

const popularCities = ["Dammam", "Khobar", "Riyadh", "Makkah", "Madinah", "Jeddah"];

const popularRoutes = popularCities
  .map((city) => saudiRoutes.find((r) => r.city === city))
  .filter((r): r is NonNullable<typeof r> => Boolean(r));

export default function PopularRoutes() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-red">
              Popular Routes
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Kuwait&apos;s Most Booked Saudi Transfers
            </h2>
            <p className="max-w-xl text-zinc-600">
              Fixed one-way fares, same vehicle across the border, both
              directions.
            </p>
          </div>
          <Link
            href="/saudi-transfers"
            className="group flex shrink-0 items-center gap-1 font-semibold text-brand-green hover:underline"
          >
            All routes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route) => (
            <div
              key={route.city}
              className="flex flex-col gap-5 rounded-2xl bg-white p-5 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <Clock3 className="h-3.5 w-3.5" />
                {route.duration}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                  <span className="rounded bg-brand-green-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-brand-green">
                    KW
                  </span>
                  Kuwait
                </span>
                <span className="flex flex-1 items-center gap-1.5 px-1">
                  <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                    <MoveRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="h-px flex-1 border-t-2 border-dashed border-zinc-200" />
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                  {route.city}
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-zinc-500">
                    SA
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="text-sm">
                  <span className="text-zinc-500">From </span>
                  <span className="font-bold text-brand-green">KD {route.sedan}</span>
                </div>
                <a
                  href={`https://wa.me/96597896907?text=${encodeURIComponent(
                    `Hi, I want a quote for Kuwait to ${route.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-green px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  Get Quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
