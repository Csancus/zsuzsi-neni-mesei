"use client";

import { faq } from "@/lib/content";
import { track } from "@/lib/track";

export function FaqList() {
  return (
    <div className="space-y-3">
      {faq.map((item) => (
        <details
          key={item.q}
          onToggle={(e) => {
            if (e.currentTarget.open) track("gyik_nyitas", item.q);
          }}
          className="group rounded-2xl bg-white px-6 py-5 ring-1 ring-cream-300 open:ring-night-600/25"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
            {item.q}
            <svg
              viewBox="0 0 24 24"
              className="size-5 shrink-0 text-ink-soft transition group-open:rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
