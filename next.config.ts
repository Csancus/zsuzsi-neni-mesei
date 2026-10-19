import path from "node:path";
import type { NextConfig } from "next";

/** A mesetár (belépés, fiók, mesék) a platformon fut; a landing címére gépelt app-útvonalak oda mennek. */
const PLATFORM_URL = "https://zsuzsi-platform.vercel.app";
const APP_PATHS = [
  "/belepes",
  "/login",
  "/bejelentkezes",
  "/fiokom/:path*",
  "/mesetar/:path*",
  "/mese/:path*",
  "/kezdolap",
  "/elofizetes",
  "/kedvencek",
  "/mesefigurak/:path*",
  "/mesevilagok/:path*",
  "/mesefuzetek/:path*",
  "/kozossegek/:path*",
  "/ujdonsagok",
];

const nextConfig: NextConfig = {
  // A repó a felhasználói mappán belül van, ahol van egy idegen package-lock.json;
  // enélkül a Turbopack rossz gyökeret találna.
  turbopack: { root: path.resolve(".") },
  async redirects() {
    return APP_PATHS.map((source) => ({
      source,
      destination: `${PLATFORM_URL}${source.replace(/\/:path\*$/, "/:path*")}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
