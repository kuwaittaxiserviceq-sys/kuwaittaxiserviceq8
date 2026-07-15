import Link from "next/link";
import { Users } from "lucide-react";
import Container from "./Container";

export default function ExpertChauffeurs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green sm:h-96">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <Users className="relative h-24 w-24 text-white/90" strokeWidth={1.25} />
        </div>

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Expert Drivers For Safe Airport Transfers
          </h2>
          <p className="text-zinc-600">
            Our drivers and support staff are qualified, well-mannered,
            and carefully vetted before they ever get behind the wheel.
            We run a strict selection procedure to ensure that only the
            best drivers and representatives are permitted to serve
            clients. Every driver is assessed day by day for their
            professionalism, driving abilities, and communication with
            clients — it causes us to see how we can enhance the manner
            in which we treat our clients.
          </p>
          <Link
            href="/#services"
            className="font-semibold text-brand-green hover:underline"
          >
            Enjoy our executive taxi service for a better experience
          </Link>
        </div>
      </Container>
    </section>
  );
}
