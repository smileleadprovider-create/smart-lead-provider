import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smile Lead Provider | Pay per qualified dental patient enquiry",
  description:
    "We fund and run the ad campaigns for your dental clinic. You pay only for qualified, exclusive patient enquiries. From AED 29 per lead, no lock-in.",
  openGraph: {
    title: "Smile Lead Provider | Pay for patient enquiries, not ad spend",
    description:
      "Exclusive, qualified patient enquiries for implants, veneers, Invisalign, braces and All-on-4/6. No upfront ad spend.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C2340",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
