import Container from "./Container";
import SectionHeading from "./SectionHeading";

const terms = [
  "All fares are quoted in Kuwaiti Dinar (KD) and confirmed in full before your booking is accepted.",
  "Reservations can be paid by cash, KNET, or credit/debit card. Corporate accounts may be invoiced on request.",
  "An extra stop fee applies for any additional stop added to your route beyond the agreed pickup and drop-off.",
  "Airport pickups include 60 minutes of free waiting time counted from your flight's actual landing; additional waiting is charged per our standard hourly rate.",
  "Certified child safety seats are provided on request at no additional charge — please request them at the time of booking.",
  "Maximum luggage capacity is set by the vehicle class selected; oversized loads may require upgrading to a larger vehicle, subject to availability.",
  "Lost or found items left in the vehicle will be held for collection; Kuwait Taxi Service is not responsible for items left behind.",
  "Kuwait law strictly prohibits the possession or consumption of alcohol and other intoxicants. Any passenger found in violation will be asked to leave the vehicle immediately, without refund.",
  "Smoking, vaping, and the consumption of food or beverages inside the vehicle are not permitted without the driver's consent.",
  "Passengers travelling with pets must keep them in an appropriate carrier; a vehicle cleaning fee may apply if this is not observed.",
  "Fares are subject to change without notice due to fuel prices, extreme weather (including sandstorms), or unusual traffic conditions on the day of travel.",
  "In the rare case of a vehicle breakdown, accident, or other event beyond our control, our liability is limited to arranging a replacement vehicle as soon as reasonably possible.",
  "Rude, abusive, or unsafe behaviour towards our chauffeurs will not be tolerated and may result in the immediate termination of service without refund.",
  "Cancellations made more than 24 hours before the scheduled pickup are free of charge; cancellations within 24 hours may be charged 50% of the fare.",
  "Reservations cancelled with less than 2 hours' notice, or unattended pickups (no-show) after 30 minutes of waiting, are charged the full fare.",
  "Please ensure your contact number, pickup address, and flight details (where applicable) are correct at the time of booking to avoid delays.",
];

export default function TermsAndConditions() {
  return (
    <section className="bg-brand-green-light/40 py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Please Read Carefully"
          title="Terms & Conditions of Service"
          description="To confirm and honour every booking fairly, please review the terms below before you reserve a ride with us."
        />

        <ul className="mx-auto flex max-w-3xl list-disc flex-col gap-3 pl-5 text-sm leading-6 text-zinc-700 marker:text-brand-green">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>

        <p className="mx-auto max-w-3xl text-center text-sm font-semibold text-brand-red">
          Please do not leave with any other taxi or limo service once a
          driver has been dispatched to you, as the full fare will still
          apply.
        </p>
      </Container>
    </section>
  );
}
