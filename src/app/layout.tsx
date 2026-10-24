import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArtisanConnect — Handmade · People · Purpose",
    template: "%s | ArtisanConnect",
  },
  description:
    "Discover the beauty of handmade. Shop unique, handcrafted treasures from independent artisans across India.",
  keywords: [
    "handmade",
    "artisan",
    "handcrafted",
    "marketplace",
    "India",
    "pottery",
    "jewelry",
    "textiles",
  ],
  openGraph: {
    type: "website",
    siteName: "ArtisanConnect",
    title: "ArtisanConnect — Handmade · People · Purpose",
    description:
      "Discover the beauty of handmade. Shop unique, handcrafted treasures from independent artisans across India.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#ffffff",
                border: "1px solid #dcc8b8",
                color: "#4a2418",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
