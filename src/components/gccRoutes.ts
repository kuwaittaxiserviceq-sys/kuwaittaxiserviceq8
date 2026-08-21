export type GccRoute = {
  city: string;
  country: string;
  distanceKm: number;
  duration: string;
  sedan: number;
  suv: number;
  van: number;
  transitNote: string;
};

// Indicative one-way fares in KD — Kuwait City to destination (same fare vice versa).
// Routes to the UAE transit through Saudi Arabia; Bahrain via the King Fahd Causeway.
export const gccRoutes: GccRoute[] = [
  {
    city: "Manama",
    country: "Bahrain",
    distanceKm: 560,
    duration: "~6.5 hrs",
    sedan: 90,
    suv: 115,
    van: 145,
    transitNote:
      "Via Saudi Arabia's Eastern Province and the King Fahd Causeway (Saudi–Bahrain toll bridge). A causeway crossing permit is arranged as part of the trip.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    distanceKm: 1140,
    duration: "~11.5 hrs",
    sedan: 165,
    suv: 205,
    van: 265,
    transitNote:
      "Via Saudi Arabia on Highway 95, crossing into the UAE at the Al Batha–Al Sila border. A valid multi-entry or transit visa for Saudi Arabia is required.",
  },
  {
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    distanceKm: 1250,
    duration: "~12.5 hrs",
    sedan: 175,
    suv: 220,
    van: 280,
    transitNote:
      "Same route as Dubai via Saudi Arabia, continuing on to Abu Dhabi. A valid multi-entry or transit visa for Saudi Arabia is required.",
  },
];
