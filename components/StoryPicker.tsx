"use client";

import { useState } from "react";

import { demoStories } from "@/lib/content";
import { track } from "@/lib/track";
import { StoryModal } from "./StoryModal";

export function StoryPicker() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [readIndexes, setReadIndexes] = useState<number[]>([]);

  function open(i: number) {
    track("mese_megnyitas", demoStories[i].title);
    setOpenIndex(i);
    setReadIndexes((prev) => (prev.includes(i) ? prev : [...prev, i]));
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {demoStories.map((story, i) => {
          const read = readIndexes.includes(i);
          return (
            <button
              key={story.title}
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className={`group flex h-full cursor-pointer flex-col rounded-3xl p-6 text-left transition duration-200 hover:-translate-y-1 hover:bg-white hover:ring-gold ${
                read
                  ? "bg-white ring-2 ring-gold/60 card-glow"
                  : "bg-white/70 ring-1 ring-cream-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden className="text-3xl">
                  {story.emoji}
                </span>
                <span className="rounded-full bg-cream-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                  {story.category}
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

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-night-600 transition group-hover:gap-2.5">
                {read ? "Újra elolvasom" : "Elolvasom"}
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Kattintsatok bármelyikre, és elolvashatjátok az egészet. Esténként ezt a
        döntést a gyermeked hozza meg.
      </p>

      {openIndex !== null && (
        <StoryModal story={demoStories[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}
