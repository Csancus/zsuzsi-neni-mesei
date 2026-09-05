"use client";

import Link from "next/link";

import type { EventName } from "@/lib/counters";
import { track } from "@/lib/track";

/**
 * Link, ami kattintáskor jelez a /api/track felé. Külső hivatkozásnál sima
 * <a>-t, belsőnél next/link-et renderel.
 */
export function TrackedLink({
  href,
  event,
  label,
  external = false,
  className,
  children,
}: {
  href: string;
  event: EventName;
  label?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => track(event, label);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
