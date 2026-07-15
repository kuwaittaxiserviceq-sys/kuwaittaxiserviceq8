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
  title: "Kuwait Taxi Service | Reliable Rides Across Kuwait, 24/7",
  description:
    "Book a safe, reliable taxi anywhere in Kuwait. Airport transfers, city rides, and long-distance trips with professional licensed drivers, available 24/7 at fixed fares.",
  openGraph: {
    type: "website",
    siteName: "Kuwait Taxi Service",
    title: "Kuwait Taxi Service | Reliable Rides Across Kuwait, 24/7",
    description:
      "Fixed-fare taxi and airport transfers across every governorate in Kuwait — available 24/7 with licensed, professional drivers.",
    locale: "en_KW",
  },
  twitter: {
    card: "summary",
    title: "Kuwait Taxi Service | Reliable Rides Across Kuwait, 24/7",
    description:
      "Fixed-fare taxi and airport transfers across every governorate in Kuwait — available 24/7.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Kuwait Taxi Service",
  url: "https://kuwaittaxiserviceq8.com",
  telephone: "+96555205485",
  email: "info@kuwaittaxiservice.com",
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
