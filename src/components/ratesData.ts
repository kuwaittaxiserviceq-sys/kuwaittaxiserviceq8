export type RateRow = {
  area: string;
  governorate: string;
  sedan: number;
  suv: number;
  van8: number;
  van14: number;
};

export const ratesData: RateRow[] = [
  // Al Asimah (Kuwait City)
  { area: "Kuwait City", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 21 },
  { area: "Sharq", governorate: "Al Asimah", sedan: 8, suv: 11, van8: 15, van14: 20 },
  { area: "Mirqab", governorate: "Al Asimah", sedan: 8, suv: 11, van8: 15, van14: 20 },
  { area: "Qibla", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 21 },
  { area: "Dasman", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 21 },
  { area: "Bneid Al Gar", governorate: "Al Asimah", sedan: 7, suv: 11, van8: 15, van14: 20 },
  { area: "Shuwaikh", governorate: "Al Asimah", sedan: 7, suv: 10, van8: 14, van14: 19 },
  { area: "Qadsiya", governorate: "Al Asimah", sedan: 7, suv: 11, van8: 15, van14: 20 },
  { area: "Kaifan", governorate: "Al Asimah", sedan: 7, suv: 10, van8: 14, van14: 19 },
  { area: "Nuzha", governorate: "Al Asimah", sedan: 8, suv: 11, van8: 15, van14: 20 },
  { area: "Adailiya", governorate: "Al Asimah", sedan: 7, suv: 11, van8: 15, van14: 20 },
  { area: "Shamiya", governorate: "Al Asimah", sedan: 7, suv: 10, van8: 14, van14: 19 },
  { area: "Faiha", governorate: "Al Asimah", sedan: 8, suv: 11, van8: 15, van14: 20 },
  { area: "Qurtuba", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 21 },
  { area: "Yarmouk", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 22 },
  { area: "Surra", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 22 },
  { area: "Rawda", governorate: "Al Asimah", sedan: 8, suv: 11, van8: 15, van14: 20 },
  { area: "Khaldiya", governorate: "Al Asimah", sedan: 7, suv: 11, van8: 15, van14: 20 },
  { area: "Daiya", governorate: "Al Asimah", sedan: 8, suv: 12, van8: 16, van14: 21 },
  { area: "Shuwaikh Industrial", governorate: "Al Asimah", sedan: 7, suv: 10, van8: 14, van14: 19 },

  // Hawalli
  { area: "Hawalli", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Salmiya", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Jabriya", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 19 },
  { area: "Bayan", governorate: "Hawalli", sedan: 7, suv: 11, van8: 15, van14: 19 },
  { area: "Mishref", governorate: "Hawalli", sedan: 7, suv: 11, van8: 15, van14: 19 },
  { area: "Salwa", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Rumaithiya", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Shaab", governorate: "Hawalli", sedan: 6, suv: 9, van8: 13, van14: 17 },
  { area: "Salam", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Zahra", governorate: "Hawalli", sedan: 7, suv: 10, van8: 14, van14: 18 },

  // Farwaniya
  { area: "Farwaniya", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },
  { area: "Khaitan", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },
  { area: "Jleeb Al-Shuyoukh", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },
  { area: "Andalous", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 13, van14: 17 },
  { area: "Ardiya", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },
  { area: "Rai", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 13, van14: 17 },
  { area: "Rabiya", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 13, van14: 17 },
  { area: "Omariya", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },
  { area: "Abraq Khaitan", governorate: "Farwaniya", sedan: 6, suv: 8, van8: 12, van14: 15 },
  { area: "Ferdous", governorate: "Farwaniya", sedan: 6, suv: 9, van8: 12, van14: 16 },

  // Ahmadi
  { area: "Ahmadi", governorate: "Ahmadi", sedan: 5, suv: 8, van8: 10, van14: 14 },
  { area: "Fahaheel", governorate: "Ahmadi", sedan: 5, suv: 7, van8: 10, van14: 13 },
  { area: "Mangaf", governorate: "Ahmadi", sedan: 5, suv: 7, van8: 10, van14: 13 },
  { area: "Mahboula", governorate: "Ahmadi", sedan: 4, suv: 7, van8: 9, van14: 12 },
  { area: "Abu Halifa", governorate: "Ahmadi", sedan: 5, suv: 7, van8: 10, van14: 13 },
  { area: "Fintas", governorate: "Ahmadi", sedan: 5, suv: 7, van8: 10, van14: 13 },
  { area: "Sabahiya", governorate: "Ahmadi", sedan: 5, suv: 8, van8: 10, van14: 14 },
  { area: "Riqqa", governorate: "Ahmadi", sedan: 5, suv: 8, van8: 11, van14: 14 },
  { area: "Egaila", governorate: "Ahmadi", sedan: 4, suv: 7, van8: 9, van14: 12 },
  { area: "Wafra", governorate: "Ahmadi", sedan: 12, suv: 17, van8: 22, van14: 28 },
  { area: "Zour", governorate: "Ahmadi", sedan: 10, suv: 15, van8: 19, van14: 25 },

  // Jahra
  { area: "Jahra", governorate: "Jahra", sedan: 10, suv: 14, van8: 18, van14: 23 },
  { area: "Sulaibiya", governorate: "Jahra", sedan: 9, suv: 13, van8: 17, van14: 22 },
  { area: "Naeem", governorate: "Jahra", sedan: 10, suv: 14, van8: 18, van14: 23 },
  { area: "Waha", governorate: "Jahra", sedan: 10, suv: 14, van8: 18, van14: 23 },
  { area: "Qasr", governorate: "Jahra", sedan: 10, suv: 14, van8: 18, van14: 23 },
  { area: "Taima", governorate: "Jahra", sedan: 10, suv: 15, van8: 19, van14: 24 },
  { area: "Oyoun", governorate: "Jahra", sedan: 11, suv: 16, van8: 20, van14: 26 },

  // Mubarak Al-Kabeer
  { area: "Mubarak Al-Kabeer", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Qurain", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Adan", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Qusour", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 11, van8: 15, van14: 19 },
  { area: "Sabah Al-Salem", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 11, van8: 15, van14: 19 },
  { area: "Messila", governorate: "Mubarak Al-Kabeer", sedan: 7, suv: 10, van8: 14, van14: 18 },
  { area: "Fnaitees", governorate: "Mubarak Al-Kabeer", sedan: 8, suv: 11, van8: 15, van14: 19 },
];
