"use client";

import { categories } from "@/lib/content";
import { track } from "@/lib/track";
import { usePreferences } from "./usePreferences";

export function CategoryPicker() {
  const { selected, toggle, isSelected } = usePreferences();

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => {
          const active = isSelected(cat.id);
          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => {
                  if (!active) track("kategoria_be", cat.name);
                  toggle(cat.id);
                }}
                aria-pressed={active}
                title={cat.blurb}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-night-800 text-cream ring-2 ring-gold"
                    : "bg-white text-ink ring-1 ring-cream-300 hover:ring-night-600/30"
                }`}
              >
                <span aria-hidden>{cat.emoji}</span>
                {cat.name}
                {active && (
                  <svg viewBox="0 0 24 24" className="size-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="mt-6 text-center text-sm text-ink-soft">
        {selected.length === 0
          ? "Válasszatok párat, ebből állítom össze a napi hármast."
          : `${selected.length} kategóriát jelöltetek be. Megjegyeztem, a regisztrációnál már ezekkel indultok.`}
      </p>
    </div>
  );
}
