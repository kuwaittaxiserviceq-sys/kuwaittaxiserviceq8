import { MapPin } from "lucide-react";
import { ratesData } from "./ratesData";
import Container from "./Container";

const governorates = Array.from(new Set(ratesData.map((row) => row.governorate)));

const governorateIntros: Record<string, string> = {
  "Al Asimah":
    "The capital governorate — home to Kuwait City's business district, ministries, hospitals, and the corniche. We run daily airport transfers and corporate rides across every block of the capital.",
  Hawalli:
    "Kuwait's busiest residential hub, covering Salmiya's seafront, Hawalli's shopping streets, and Jabriya's hospitals. Quick pickups at any hour, every day.",
  Farwaniya:
    "The most populous governorate and closest to Kuwait International Airport — ideal for fast, low-fare airport pickups from Khaitan, Jleeb, and surrounding areas.",
  Ahmadi:
    "From Fahaheel's waterfront to the oil-sector residential areas of Mangaf, Mahboula, and Abu Halifa — fixed-fare rides for commuters and families alike.",
  Jahra:
    "Serving Kuwait's largest governorate by area, including Jahra city, Sulaibiya, and the northern farms — reliable long-distance and airport rides on time.",
  "Mubarak Al-Kabeer":
    "Covering Sabah Al-Salem, Qurain, Adan, and the coastal Messila district with punctual daily transfers and school-run friendly drivers.",
};

export default function AreasGrid() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-16">
        {governorates.map((governorate) => (
          <div key={governorate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-zinc-900">
                {governorate} Governorate
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-zinc-600">
                {governorateIntros[governorate]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {ratesData
                .filter((row) => row.governorate === governorate)
                .map((row) => (
                  <div
                    key={row.area}
                    className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/5"
                  >
                    <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-brand-green-dark to-brand-green">
                      <MapPin className="h-8 w-8 text-white/90" strokeWidth={1.25} />
                    </div>
                    <div className="bg-white p-3">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {row.area}
                      </h3>
                      <span className="text-xs text-zinc-500">Taxi &amp; transfer service</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
