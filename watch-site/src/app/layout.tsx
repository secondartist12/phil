import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { RevealController } from "@/components/Reveal";
import { displayBrand, site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${displayBrand()} — Inspired by Speed`,
    template: `%s · ${displayBrand()}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: displayBrand(),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "휠 다이얼 시계" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: site.indexable, follow: site.indexable },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <RevealController />
          <Header />
          <CartDrawer />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
