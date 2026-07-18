import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a6b3d",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kuwaittaxiserviceq8.com"),
  verification: {
    google: "vZmHqKfj3W9Nz4YZkeLD1E55PfqdCm-mj032ewR0Puk",
    other: {
      "msvalidate.01": "343E55ACBE14E8129BE01E642041A013",
      "p:domain_verify": "3cee16a8ba4a5c6d4ff484242cdaf88b",
    },
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" },
  },
  title: "Kuwait Taxi Service | Airport Taxi & Transfers in Kuwait — 24/7 Fixed Fares",
  description:
    "Book a taxi in Kuwait — airport taxi to Kuwait International Airport, city rides, and Kuwait-to-Saudi transfers. Fixed fares, licensed drivers, 24/7 in all governorates. Call 9789 6907.",
  openGraph: {
    type: "website",
    siteName: "Kuwait Taxi Service",
    title: "Kuwait Taxi Service | Airport Taxi & Transfers in Kuwait — 24/7",
    description:
      "Airport taxi, city rides, and Kuwait-to-Saudi transfers at fixed fares — 24/7 with licensed drivers in every governorate.",
    locale: "en_KW",
  },
  twitter: {
    card: "summary",
    title: "Kuwait Taxi Service | Airport Taxi & Transfers in Kuwait — 24/7",
    description:
      "Airport taxi, city rides, and Kuwait-to-Saudi transfers at fixed fares — 24/7 across Kuwait.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TaxiService",
      name: "Kuwait Taxi Service",
      url: "https://kuwaittaxiserviceq8.com",
      telephone: "+96597896907",
      email: "kuwaittaxiserviceq@gmail.com",
      areaServed: [
        "Al Asimah",
        "Hawalli",
        "Farwaniya",
        "Ahmadi",
        "Jahra",
        "Mubarak Al-Kabeer",
      ],
      availableLanguage: ["English", "Arabic"],
      provider: { "@id": "https://kuwaittaxiserviceq8.com/#business" },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://kuwaittaxiserviceq8.com/#business",
      name: "Kuwait Taxi Service",
      url: "https://kuwaittaxiserviceq8.com",
      telephone: "+96597896907",
      email: "kuwaittaxiserviceq@gmail.com",
      image: "https://kuwaittaxiserviceq8.com/images/kuwait-taxi-service-hero.webp",
      logo: "https://kuwaittaxiserviceq8.com/icon.svg",
      priceRange: "KD 5 – KD 120",
      currenciesAccepted: "KWD",
      paymentAccepted: "Cash, KNET, Credit Card, Apple Pay",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Al-Manqaf Commercial Center, Mezzanine Floor, Office 34, Block 4, Street 14",
        addressLocality: "Al-Manqaf",
        addressRegion: "Ahmadi",
        addressCountry: "KW",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.0961,
        longitude: 48.1301,
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=29.0961,48.1301",
      sameAs: [
        "https://www.linkedin.com/company/kuwait-taxi-service-q-8/",
        "https://www.facebook.com/profile.php?id=61591620856337",
        "https://www.pinterest.com/kuwaittaxiserviceq8/",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@type": "WebSite",
      name: "Kuwait Taxi Service",
      url: "https://kuwaittaxiserviceq8.com",
      inLanguage: ["en", "ar"],
      publisher: { "@id": "https://kuwaittaxiserviceq8.com/#business" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FloatingWhatsApp />
        <ScrollToTop />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="TpGfysm6rbHuALJ8ytj7RA"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RMFMBTV6C4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RMFMBTV6C4');`}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xnqnk79l3s");`}
        </Script>
      </body>
    </html>
  );
}
