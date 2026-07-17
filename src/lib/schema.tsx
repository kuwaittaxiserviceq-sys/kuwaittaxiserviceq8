export const SITE_URL = "https://kuwaittaxiserviceq8.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;

// Al-Manqaf office — same coordinates embedded in the hero image EXIF
export const OFFICE_GEO = {
  "@type": "GeoCoordinates",
  latitude: 29.0961,
  longitude: 48.1301,
};

export const OFFICE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=29.0961,48.1301";

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

type Offer = {
  name: string;
  price: number;
};

export function serviceSchema({
  name,
  description,
  path,
  inLanguage = "en",
  offers,
  aggregateOffer,
}: {
  name: string;
  description: string;
  path: string;
  inLanguage?: string;
  offers?: Offer[];
  aggregateOffer?: { lowPrice: number; highPrice: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Kuwait" },
    ...(offers && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} — Fixed Fares`,
        itemListElement: offers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price,
          priceCurrency: "KWD",
        })),
      },
    }),
    ...(aggregateOffer && {
      offers: {
        "@type": "AggregateOffer",
        lowPrice: aggregateOffer.lowPrice,
        highPrice: aggregateOffer.highPrice,
        priceCurrency: "KWD",
      },
    }),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
