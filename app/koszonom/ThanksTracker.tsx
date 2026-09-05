"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/track";

/**
 * A sikeres feliratkozás számlálása. Ide csak akkor jut el a látogató, ha a
 * Web3Forms elfogadta a küldést, így ez pontos konverziószám.
 */
export function ThanksTracker() {
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    track("feliratkozas_siker");
  }, []);

  return null;
}
