import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

const siteUrl = "https://www.smileleadprovider.com";
const siteName = "Smile Lead Provider";
const title = "Smile Lead Provider | Pay per qualified dental patient enquiry";
const description =
  "We fund and run the ad campaigns for your dental clinic. You pay only for qualified, exclusive patient enquiries. From AED 29 per lead, no lock-in.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Smile Lead Provider | Pay for patient enquiries, not ad spend",
    description:
      "Exclusive, qualified patient enquiries for implants, veneers, Invisalign, braces and All-on-4/6. No upfront ad spend.",
    url: siteUrl,
    siteName,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1600,
        height: 1600,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smile Lead Provider | Pay for patient enquiries, not ad spend",
    description:
      "Exclusive, qualified patient enquiries for implants, veneers, Invisalign, braces and All-on-4/6. No upfront ad spend.",
    images: ["/logo.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C2340",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  description,
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "City", name: "Sharjah" },
    { "@type": "City", name: "Ajman" },
    { "@type": "City", name: "Al Ain" },
    { "@type": "City", name: "Ras Al Khaimah" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'What counts as a "qualified" lead?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Someone who has actively enquired about a specific treatment you offer, in a location you serve. Not a random click or a bot form fill.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay anything upfront?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We fund the advertising campaigns. You pay only for the qualified leads you receive.",
      },
    },
    {
      "@type": "Question",
      name: "Are leads shared with other clinics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Leads are generated for your clinic and are never resold to competing clinics.",
      },
    },
    {
      "@type": "Question",
      name: "Which treatments can I run campaigns for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dental implants, veneers, Invisalign, braces, and All-on-4 or All-on-6.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a contract or minimum commitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No lock-in contract and no minimum spend. You can pause your campaigns whenever you need to.",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={schibstedGrotesk.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
