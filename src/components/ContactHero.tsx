export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-black to-brand-green-dark py-24 sm:py-28">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-green/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-brand-red/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Contact Kuwait Taxi
        </h1>
        <span className="h-1 w-16 rounded-full bg-brand-red" />
        <p className="text-zinc-300">
          Ready to book or have a question? Get in touch with Kuwait Taxi
          Service — our team is available 24/7 to assist with
          reservations, custom routes, and corporate accounts.
        </p>
      </div>
    </section>
  );
}
