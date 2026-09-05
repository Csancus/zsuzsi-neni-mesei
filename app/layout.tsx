import type { Metadata, Viewport } from "next";
import { Baloo_2, Caveat, Nunito } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://zsuzsineni-mesei.hu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zsuzsi néni meséi – minden este egy új történet",
    template: "%s | Zsuzsi néni meséi",
  },
  description:
    "Minden nap három friss esti mesét küldök e-mailben. A gyermeked választ egyet, te felolvasod. 10 nap ingyen, utána 5 000 Ft / hó, bármikor lemondható.",
  keywords: [
    "esti mese",
    "mese gyerekeknek",
    "napi mese",
    "lefekvés",
    "mesélés",
    "előfizetés",
  ],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: siteUrl,
    siteName: "Zsuzsi néni meséi",
    title: "Zsuzsi néni meséi – minden este egy új történet",
    description:
      "Minden nap három friss esti mesét küldök e-mailben. A gyermeked választ egyet, te felolvasod. 10 nap ingyen.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Anya és gyerek esti mesét olvasnak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zsuzsi néni meséi",
    description: "Naponta 3 esti mese – a gyermeked választ, te felolvasod.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E2039",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      className={`${display.variable} ${sans.variable} ${hand.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
