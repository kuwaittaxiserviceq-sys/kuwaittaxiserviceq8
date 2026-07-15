import Link from "next/link";
import { CarFront } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-brand-black to-brand-green-dark px-6 py-32 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white">
            <CarFront className="h-10 w-10" strokeWidth={1.5} />
          </span>
          <h1 className="text-5xl font-bold text-white">404</h1>
          <p className="max-w-md text-zinc-300">
            Looks like this page took a wrong turn. Let&apos;s get you back
            on the road.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex h-12 items-center justify-center rounded-full bg-brand-green px-7 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Back to Home
            </Link>
            <Link
              href="/reservation"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book a Ride
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
