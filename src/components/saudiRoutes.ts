export type SaudiRoute = {
  city: string;
  region: string;
  distanceKm: number;
  duration: string;
  sedan: number;
  suv: number;
  van: number;
  airport?: string;
};

// Indicative one-way fares in KD — Kuwait City to destination (same fare vice versa).
export const saudiRoutes: SaudiRoute[] = [
  { city: "Khafji", region: "Eastern Province", distanceKm: 120, duration: "~2 hrs", sedan: 35, suv: 45, van: 60 },
  { city: "Jubail", region: "Eastern Province", distanceKm: 280, duration: "~3.5 hrs", sedan: 55, suv: 70, van: 90 },
  { city: "Dammam", region: "Eastern Province", distanceKm: 340, duration: "~4 hrs", sedan: 65, suv: 80, van: 105, airport: "DMM — King Fahd International" },
  { city: "Khobar", region: "Eastern Province", distanceKm: 350, duration: "~4 hrs", sedan: 65, suv: 80, van: 105 },
  { city: "Dhahran", region: "Eastern Province", distanceKm: 345, duration: "~4 hrs", sedan: 65, suv: 80, van: 105 },
  { city: "Hafr Al-Batin", region: "Eastern Province", distanceKm: 270, duration: "~3.5 hrs", sedan: 55, suv: 70, van: 90 },
  { city: "Riyadh", region: "Central", distanceKm: 590, duration: "~6.5 hrs", sedan: 95, suv: 120, van: 155, airport: "RUH — King Khalid International" },
  { city: "Buraidah", region: "Central", distanceKm: 640, duration: "~7 hrs", sedan: 105, suv: 130, van: 165 },
  { city: "Madinah", region: "Western", distanceKm: 1150, duration: "~11.5 hrs", sedan: 170, suv: 210, van: 270, airport: "MED — Prince Mohammad Bin Abdulaziz" },
  { city: "Makkah", region: "Western", distanceKm: 1310, duration: "~13 hrs", sedan: 185, suv: 230, van: 295 },
  { city: "Jeddah", region: "Western", distanceKm: 1390, duration: "~13.5 hrs", sedan: 195, suv: 240, van: 310, airport: "JED — King Abdulaziz International" },
];
