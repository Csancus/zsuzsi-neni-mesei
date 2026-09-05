"use client";

import { useEffect, useRef } from "react";

import type { DemoStory } from "@/lib/content";

export function StoryModal({
  story,
  onClose,
}: {
  story: DemoStory;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-night-900/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream text-ink shadow-2xl sm:max-h-[86dvh] sm:max-w-2xl sm:rounded-3xl"
      >
        <header className="flex items-start gap-4 border-b border-cream-300 bg-cream px-5 py-4 sm:px-8 sm:py-5">
          <span aria-hidden className="mt-0.5 text-2xl">
            {story.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="story-modal-title"
              className="font-display text-xl font-bold leading-tight sm:text-2xl"
            >
              {story.title}
            </h2>
            <p className="mt-1 text-xs text-ink-soft">
              {story.category} · {story.minutes} perc felolvasás · {story.age}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Mese bezárása"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-200 text-ink-soft transition hover:bg-cream-300 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="story-prose flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          {story.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p className="story-end">Vége</p>
        </div>

        <footer className="border-t border-cream-300 bg-cream-200/60 px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-ink-soft">
              Előfizetőként minden nap három ilyen mese közül választhattok.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full bg-night-900 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-night-800"
            >
              Bezárom
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
