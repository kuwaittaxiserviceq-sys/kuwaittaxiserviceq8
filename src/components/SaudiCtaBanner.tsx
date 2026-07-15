import Link from "next/link";
import { ArrowLeftRight, MoveRight } from "lucide-react";
import Container from "./Container";

export default function SaudiCtaBanner() {
  return (
    <section className="bg-brand-black py-12">
      <Container className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white sm:flex">
            <ArrowLeftRight className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Traveling to Saudi Arabia?
            </h2>
            <p className="text-sm text-zinc-400">
              Door-to-door border crossing to Dammam, Riyadh, Makkah,
              Madinah &amp; every major Saudi city — same car the whole
              way, fixed fare, both directions.
            </p>
          </div>
        </div>
        <Link
          href="/saudi-transfers"
          className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          Saudi Routes &amp; Fares
          <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
