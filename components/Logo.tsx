import Image from "next/image";

export function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.webp"
        alt=""
        width={size}
        height={size}
        priority
        className="shrink-0 rounded-full"
        style={{ width: size, height: size }}
      />
      <span className="font-display text-lg font-bold leading-tight tracking-tight">
        Zsuzsi néni meséi
      </span>
    </span>
  );
}
