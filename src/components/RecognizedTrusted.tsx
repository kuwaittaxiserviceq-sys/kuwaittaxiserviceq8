import { Award } from "lucide-react";
import Container from "./Container";

export default function RecognizedTrusted() {
  return (
    <section className="bg-brand-green-light/40 py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Recognized &amp; Trusted Taxi Service in Kuwait
          </h2>
          <p className="text-zinc-600">
            Kuwait Taxi Service is a recognized and licensed taxi
            operator, serving Kuwait City, Hawalli, Farwaniya, Ahmadi,
            Jahra, and Mubarak Al-Kabeer with our fleet of sedans,
            premium SUVs, and vans. Businesses, families, and frequent
            travelers rely on our transparent fares for punctual and
            professional service. Our reputation is built on
            consistently successful rides for every airport pickup and
            drop-off — repeat clients trust our experienced drivers and
            feedback for building long-term relationships with corporate
            and leisure travelers.
          </p>
        </div>

        <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-dark to-brand-green sm:h-96">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <Award className="relative h-24 w-24 text-white/90" strokeWidth={1.25} />
        </div>
      </Container>
    </section>
  );
}
