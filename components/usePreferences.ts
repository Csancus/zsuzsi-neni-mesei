"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "znm.prefs.categories";
const EMPTY: string[] = [];

// Külső (localStorage) tároló React-barát olvasása: a getSnapshot csak akkor ad
// új referenciát, ha tényleg változott a nyers érték.
let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = raw ? (JSON.parse(raw) as unknown) : null;
      cachedValue = Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : EMPTY;
    } catch {
      cachedValue = EMPTY;
    }
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(next: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // a böngésző letilthatja a tárolást – ilyenkor csak nem emlékszünk rá
  }
  for (const listener of listeners) listener();
}

export function usePreferences() {
  const selected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = getSnapshot();
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);

  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  return { selected, toggle, isSelected };
}
