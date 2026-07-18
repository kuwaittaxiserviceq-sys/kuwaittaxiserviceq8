// Default route pricing in KWD. Route keys are the two normalized location
// names sorted alphabetically and joined with "-" (see getPrice below).
// Admin can override these in Supabase via the pricing_rules table.

export const PRICING_RULES: Record<string, Record<string, { price: number }>> = {
  // Kuwait Airport (KWI) transfers
  "airport-kuwait city": { Sedan: { price: 8 }, SUV: { price: 12 }, Van: { price: 16 } },
  "airport-salmiya": { Sedan: { price: 7 }, SUV: { price: 10 }, Van: { price: 14 } },
  "airport-hawally": { Sedan: { price: 7 }, SUV: { price: 10 }, Van: { price: 14 } },
  "airport-farwaniya": { Sedan: { price: 6 }, SUV: { price: 9 }, Van: { price: 12 } },
  "airport-fahaheel": { Sedan: { price: 5 }, SUV: { price: 7 }, Van: { price: 10 } },
  "airport-jahra": { Sedan: { price: 8 }, SUV: { price: 11 }, Van: { price: 15 } },

  // Kuwait → Saudi Arabia long-haul (one-way)
  "khafji-kuwait city": { Sedan: { price: 35 }, SUV: { price: 45 }, Van: { price: 60 } },
  "dammam-kuwait city": { Sedan: { price: 65 }, SUV: { price: 80 }, Van: { price: 105 } },
  "khobar-kuwait city": { Sedan: { price: 65 }, SUV: { price: 80 }, Van: { price: 105 } },
  "jubail-kuwait city": { Sedan: { price: 55 }, SUV: { price: 70 }, Van: { price: 90 } },
  "kuwait city-riyadh": { Sedan: { price: 95 }, SUV: { price: 120 }, Van: { price: 155 } },
  "kuwait city-madinah": { Sedan: { price: 170 }, SUV: { price: 210 }, Van: { price: 270 } },
  "kuwait city-makkah": { Sedan: { price: 185 }, SUV: { price: 230 }, Van: { price: 295 } },
  "jeddah-kuwait city": { Sedan: { price: 195 }, SUV: { price: 240 }, Van: { price: 310 } },
};

// Keywords used to normalize free-text pickup/destination into route keys.
const LOCATIONS = [
  "Kuwait City",
  "Airport",
  "Salmiya",
  "Hawally",
  "Farwaniya",
  "Fahaheel",
  "Jahra",
  "Khafji",
  "Jubail",
  "Dammam",
  "Khobar",
  "Riyadh",
  "Makkah",
  "Madinah",
  "Jeddah",
];

function normalizeLocation(value: string): string | null {
  const lower = value.toLowerCase();
  for (const city of LOCATIONS) {
    if (lower.includes(city.toLowerCase())) return city.toLowerCase();
  }
  return null;
}

export function getPrice(
  from: string,
  to: string,
  vehicle: string,
  isRoundTrip: boolean = false
): number | null {
  const loc1 = normalizeLocation(from || "");
  const loc2 = normalizeLocation(to || "");
  if (!loc1 || !loc2 || !vehicle) return null;

  const routeKey = [loc1, loc2].sort().join("-");
  const rules = PRICING_RULES[routeKey] || PRICING_RULES[`${loc1}-${loc2}`];
  if (!rules) return null;

  const wanted = vehicle.toLowerCase();
  const match = Object.keys(rules).find(
    (key) => key.toLowerCase().includes(wanted) || wanted.includes(key.toLowerCase())
  );
  if (!match) return null;

  const base = rules[match].price;
  return isRoundTrip ? base * 2 : base;
}
