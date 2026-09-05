import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A repó a felhasználói mappán belül van, ahol van egy idegen package-lock.json;
  // enélkül a Turbopack rossz gyökeret találna.
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
