"use client";

import { useEffect, useRef, useState } from "react";

import type { DemoStory } from "@/lib/content";

export function StoryModal({
  story,
  onClose,
}: {
  story: DemoStory;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    // a háttér ne görgessen, amíg a mese nyitva van
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // a fókusz maradjon a párbeszédpanelen belül
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 1);
  }

  function goToSignup() {
    onClose();
    requestAnimationFrame(() => {
      document.getElementById("regisztracio")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-night-900/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="story-panel flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] sm:max-h-[88dvh] sm:max-w-[46rem] sm:rounded-[2rem]"
      >
        {/* ---- Fejléc: éjszakai égbolt, mint a hero ---- */}
        <header className="starfield relative shrink-0 px-5 pb-5 pt-4 text-cream sm:px-9 sm:pb-7 sm:pt-6">
          <span
            aria-hidden
            className="mx-auto mb-3 block h-1 w-10 rounded-full bg-cream/25 sm:hidden"
          />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Mese bezárása"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-cream/80 ring-1 ring-white/20 transition hover:bg-white/20 hover:text-cream sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-start gap-4 pr-12">
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-full bg-white/10 text-3xl ring-1 ring-gold/40 sm:size-16 sm:text-4xl"
            >
              {story.emoji}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="font-hand text-lg text-gold-soft">Esti mese</p>
              <h2
                id="story-modal-title"
                className="mt-0.5 font-display text-2xl font-bold leading-tight sm:text-3xl"
              >
                {story.title}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                <Chip>{story.category}</Chip>
                <Chip>{story.minutes} perc felolvasás</Chip>
                <Chip>{story.age}</Chip>
              </ul>
            </div>
          </div>

          {/* olvasási haladás */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </header>

        {/* ---- A mese ---- */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="story-scroll story-paper flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:px-12 sm:py-11"
        >
          <div className="story-prose mx-auto max-w-[34rem]">
            {story.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <p aria-hidden className="story-ornament">
              ✦ &nbsp;✦&nbsp; ✦
            </p>
            <p className="story-end">Vége</p>
          </div>
        </div>

        {/* ---- Lábléc ---- */}
        <footer className="shrink-0 border-t border-cream-300/70 bg-cream-200/70 px-5 py-3.5 sm:px-9 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="hidden text-xs leading-snug text-ink-soft sm:block">
              Minden este három ilyen mese közül választhattok.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                Bezárom
              </button>
              <button
                type="button"
                onClick={goToSignup}
                className="rounded-full bg-night-900 px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-night-800"
              >
                Kérem a napi hármast
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full bg-white/10 px-2.5 py-1 text-cream/80 ring-1 ring-white/15">
      {children}
    </li>
  );
}
