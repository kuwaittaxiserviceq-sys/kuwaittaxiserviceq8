export function slugifyArea(area: string) {
  return area
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const governorateIntros: Record<string, string> = {
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
