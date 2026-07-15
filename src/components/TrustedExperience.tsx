import Container from "./Container";

export default function TrustedExperience() {
  return (
    <section className="bg-brand-green-light/40 py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Our Experience as a Trusted Taxi Service Across Kuwait
        </h2>
        <p className="max-w-3xl text-zinc-600">
          With years of hands-on experience in airport transfer and
          chauffeur services, Kuwait Taxi Service has built a reputation
          as a trusted taxi service across every governorate. Our
          experienced chauffeur service has handled thousands of airport
          transfers for families, business travelers, and tourists
          travelling to and from Kuwait International Airport and other
          major locations. We also specialize in{" "}
          <span className="font-semibold text-zinc-900">
            corporate and wedding transport
          </span>
          . From early morning departures to late-night arrivals, we
          understand real travel challenges and deliver smooth,
          stress-free rides every time.
        </p>
      </Container>
    </section>
  );
}
