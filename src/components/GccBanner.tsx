import { Globe2, MoveRight } from "lucide-react";
import Container from "./Container";

export default function GccBanner() {
  return (
    <section className="bg-brand-black py-12">
      <Container className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white sm:flex">
            <Globe2 className="h-7 w-7" />
          </span>
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Traveling Beyond Saudi Arabia?
            </h2>
            <p className="text-sm text-zinc-400">
              We also run door-to-door road trips from Kuwait to the
              UAE (Dubai &amp; Abu Dhabi) and Bahrain — same vehicle the
              whole way, with all border crossings handled. Ask for a
              custom quote.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/96555205485?text=Hi%2C%20I%20want%20a%20quote%20for%20Kuwait%20to%20UAE%2FBahrain"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          Get a UAE / Bahrain Quote
          <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Container>
    </section>
  );
}
