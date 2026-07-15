import { ChevronDown } from "lucide-react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type FaqItem = { question: string; answer: string };

const defaultFaqs: FaqItem[] = [
  {
    question: "Do you offer fixed pricing for airport transfers?",
    answer:
      "Yes. Every airport transfer is quoted as a fixed, all-in fare before you confirm the booking — no meters and no surge pricing.",
  },
  {
    question: "What areas in Kuwait do you cover?",
    answer:
      "We cover every governorate, including Kuwait City, Hawalli, Salmiya, Fahaheel, Farwaniya, Jahra, and Ahmadi.",
  },
  {
    question: "Do you track my flight for delays?",
    answer:
      "Yes. We monitor your flight in real time and adjust your pickup automatically, with 60 minutes of free waiting time counted from the actual landing.",
  },
  {
    question: "Can I book a child safety seat?",
    answer:
      "Yes, certified child seats are available on request at no extra charge — just let us know when booking.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, card payments, and online payment at the time of booking.",
  },
  {
    question: "Is the service available 24/7?",
    answer: "Yes, our dispatch and chauffeurs operate around the clock, every day of the year.",
  },
];

export default function Faq({
  eyebrow = "FAQs",
  title = "Kuwait Taxi Service FAQs",
  description = "Quick answers to the most common questions about booking with us.",
  faqs = defaultFaqs,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs?: FaqItem[];
} = {}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="flex w-full max-w-2xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-zinc-200 px-5 py-4 open:bg-brand-green-light/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-zinc-900">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-green transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
