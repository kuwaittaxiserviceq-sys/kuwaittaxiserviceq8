import { ExternalLink } from "lucide-react";
import Container from "./Container";

export default function LocationMap() {
  return (
    <section className="bg-brand-green-light/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-4">
        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-zinc-200">
          <iframe
            src="https://www.google.com/maps?q=29.0961,48.1301&output=embed"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kuwait Taxi Service coverage map"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=29.0961,48.1301"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 self-center text-sm font-semibold text-brand-green hover:underline"
        >
          Open in Google Maps
          <ExternalLink className="h-4 w-4" />
        </a>
      </Container>
    </section>
  );
}
