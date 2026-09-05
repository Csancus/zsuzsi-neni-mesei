import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://zsuzsineni-mesei.hu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zsuzsi néni meséi – naponta 3 esti mese, ti választotok",
    template: "%s | Zsuzsi néni meséi",
  },
  description:
    "Minden nap három friss esti mese e-mailben. A gyerek választ egyet, te felolvasod. 10 nap ingyen, utána 5 000 Ft / hó, bármikor lemondható.",
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
    title: "Zsuzsi néni meséi – naponta 3 esti mese, ti választotok",
    description:
      "Minden nap három friss esti mese e-mailben. A gyerek választ egyet, te felolvasod. 10 nap ingyen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zsuzsi néni meséi",
    description: "Naponta 3 esti mese – a gyerek választ, te felolvasod.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060A1A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
