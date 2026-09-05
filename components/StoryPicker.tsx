"use client";

import { useState } from "react";
import { demoStories } from "@/lib/content";

export function StoryPicker() {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {demoStories.map((story, i) => {
          const active = picked === i;
          return (
            <button
              key={story.title}
              type="button"
              onClick={() => setPicked(active ? null : i)}
              aria-pressed={active}
              className={`group flex h-full flex-col rounded-3xl p-6 text-left transition duration-200 ${
                active
                  ? "-translate-y-1 bg-white ring-2 ring-gold card-glow"
                  : "bg-white/70 ring-1 ring-cream-300 hover:-translate-y-1 hover:bg-white hover:ring-cream-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden className="text-3xl">
                  {story.emoji}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                    active ? "bg-gold text-night-900" : "bg-cream-200 text-ink-soft"
                  }`}
                >
                  {active ? "Ez lesz ma" : story.category}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold leading-snug">
                {story.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {story.teaser}
              </p>

              <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" />
                  </svg>
                  {story.minutes} perc felolvasás
                </span>
                <span>{story.age}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="mt-6 text-center text-sm text-ink-soft"
      >
        {picked === null
          ? "Kattints arra, amelyiket felolvasnád. Nálatok ezt a gyerek dönti el."
          : `Akkor ma ez lesz: „${demoStories[picked].title}”. Holnap jön a következő három.`}
      </p>
    </div>
  );
}
