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
    },
  },
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
      streetAddress:
        "Al-Manqaf Commercial Center, Mezzanine Floor, Office 34, Block 4, Street 14",
      addressLocality: "Al-Manqaf",
      addressRegion: "Ahmadi",
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
