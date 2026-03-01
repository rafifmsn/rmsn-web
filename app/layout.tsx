import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlobalModals } from "@/components/ui/GlobalModals";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({ 
  weight: ["400"], 
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rafifmsn.com"),
  title: {
    default: "Rafif Muchsin | Market Entry & Viability Intelligence",
    template: "%s | Rafif Muchsin",
  },
  description: "Reduce uncertainty in market entry. Access structured industry models, supply chain bottlenecks, and risk matrices built from primary sources.",
  authors: [{ name: "Rafif Muchsin" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "https://rafifmsn.com/",
    title: "Rafif Muchsin | Market Entry & Viability Intelligence",
    description: "Reduce uncertainty in market entry with structured industry models and decision-ready risk matrices.",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafif Muchsin | Market Entry & Viability Intelligence",
    description: "Reduce uncertainty in market entry with structured industry models and decision-ready risk matrices.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans bg-black text-white selection:bg-white selection:text-black`}>
        <CustomCursor />
        
        <Suspense fallback={null}>
          <GlobalModals />
        </Suspense>

        {children}

        {/* Simple Analytics Script */}
        <Script 
          src="https://scripts.simpleanalyticscdn.com/latest.js" 
          data-collect-dnt="true" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}