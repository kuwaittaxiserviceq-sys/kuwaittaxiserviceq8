import { Mail, MessageCircle, Phone } from "lucide-react";
import Container from "./Container";

const methods = [
  {
    icon: MessageCircle,
    label: "Message Us",
    value: "+965 5520 5485",
    href: "https://wa.me/96555205485",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "5520 5485",
    href: "tel:+96555205485",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "kuwaittaxiserviceq@gmail.com",
    href: "mailto:kuwaittaxiserviceq@gmail.com",
  },
];

export default function ContactMethods() {
  return (
    <section className="bg-white py-16">
      <Container className="grid grid-cols-1 divide-y divide-zinc-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {methods.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col items-center gap-3 py-8 text-center sm:py-0"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-light text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
              <Icon className="h-7 w-7" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">
              {label}
            </span>
            <span className="font-medium text-brand-green">{value}</span>
          </a>
        ))}
      </Container>
    </section>
  );
}
