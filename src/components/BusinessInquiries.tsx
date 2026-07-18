import Link from "next/link";
import { Megaphone } from "lucide-react";
import Container from "./Container";

export default function BusinessInquiries() {
  return (
    <section className="bg-brand-green-light">
      <Container className="grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-zinc-900">
            Business Inquiries
          </h2>
          <p className="text-zinc-700">
            For corporate rates, business opportunities & partnerships,
            please use the form below and we&apos;ll get in touch with you
            within 24 hrs, or email us at{" "}
            <a
              href="mailto:kuwaittaxiserviceq@gmail.com"
              className="font-semibold text-brand-green underline underline-offset-2"
            >
              kuwaittaxiserviceq@gmail.com
            </a>
            . Alternatively, call us on{" "}
            <a href="tel:+96597896907" className="font-semibold text-brand-green">
              +965 9789 6907
            </a>
            . Looking for our rates? Visit our{" "}
            <Link href="/#rates" className="font-semibold text-brand-green underline underline-offset-2">
              rate inquiry section
            </Link>
            .
          </p>
        </div>

        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
          <Megaphone className="h-9 w-9" />
        </span>
      </Container>
    </section>
  );
}
