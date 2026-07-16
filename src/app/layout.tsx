import type { Metadata, Viewport } from "next";
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
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar" },
  },
  title: "Kuwait Taxi Service | Airport Taxi & Transfers in Kuwait — 24/7 Fixed Fares",
  description:
    "Book a taxi in Kuwait — airport taxi to Kuwait International Airport, city rides, and Kuwait-to-Saudi transfers. Fixed fares, licensed drivers, 24/7 in all governorates. Call 5520 5485.",
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
  "@type": "TaxiService",
  name: "Kuwait Taxi Service",
  url: "https://kuwaittaxiserviceq8.com",
  telephone: "+96555205485",
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
  provider: {
    "@type": "LocalBusiness",
    name: "Kuwait Taxi Service",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuwait City",
      addressCountry: "KW",
    },
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
      </body>
    </html>
  );
}
