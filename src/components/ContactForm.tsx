"use client";

import { FormEvent } from "react";
import { Mail, MessageSquareText, Phone, Send, User } from "lucide-react";
import Container from "./Container";

export default function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const val = (k: string) => (d.get(k) || "").toString().trim();
    const lines = [
      "New Inquiry (Contact Form)",
      `Name: ${val("name")}`,
      `Phone: ${val("phone")}`,
      val("email") && `Email: ${val("email")}`,
      `Subject: ${val("subject")}`,
      `Message: ${val("message")}`,
    ].filter(Boolean);
    const url = `https://wa.me/96555205485?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const box =
    "flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 focus-within:border-brand-green";
  const input =
    "w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400";

  return (
    <section id="inquiry-form" className="bg-white py-16 sm:py-20">
      <Container className="mx-auto flex max-w-2xl flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold tracking-wide text-brand-red uppercase">
            Send a Message
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Tell Us What You Need
          </h2>
          <p className="text-zinc-600">
            Fill in the form and we&apos;ll get back to you within 24
            hours — usually much faster.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={box}>
              <User className="h-4 w-4 shrink-0 text-zinc-400" />
              <input type="text" name="name" required placeholder="Full name" className={input} />
            </label>
            <label className={box}>
              <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
              <input type="tel" name="phone" required placeholder="Phone number" className={input} />
            </label>
          </div>

          <label className={box}>
            <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
            <input type="email" name="email" placeholder="Email (optional)" className={input} />
          </label>

          <label className={box}>
            <MessageSquareText className="h-4 w-4 shrink-0 text-zinc-400" />
            <select name="subject" required defaultValue="" className={`${input} bg-transparent`}>
              <option value="" disabled>
                What is this about?
              </option>
              <option>Booking question</option>
              <option>Corporate account / partnership</option>
              <option>Saudi Arabia transfer</option>
              <option>Feedback or complaint</option>
              <option>Lost item</option>
              <option>Other</option>
            </select>
          </label>

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message..."
            className="resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-brand-green"
          />

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green text-base font-semibold text-white transition-colors hover:bg-brand-green-dark sm:w-56"
          >
            <Send className="h-4 w-4" />
            Send via WhatsApp
          </button>
          <p className="text-xs text-zinc-400">
            Opens WhatsApp with your message — or email us directly at{" "}
            <a href="mailto:info@kuwaittaxiservice.com" className="font-medium text-brand-green">
              info@kuwaittaxiservice.com
            </a>
            .
          </p>
        </form>
      </Container>
    </section>
  );
}
