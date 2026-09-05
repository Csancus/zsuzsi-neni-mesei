export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/40"
      >
        <svg viewBox="0 0 24 24" className="size-5 text-gold" fill="currentColor">
          <path d="M15.8 3.2a9 9 0 1 0 5 11.2 7.2 7.2 0 0 1-5-11.2Z" />
          <circle cx="18.6" cy="5.4" r="1.1" opacity="0.8" />
          <circle cx="21" cy="9.4" r="0.7" opacity="0.6" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Zsuzsi néni meséi
      </span>
    </span>
  );
}
