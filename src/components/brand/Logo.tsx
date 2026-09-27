import Link from "next/link";

type LogoProps = {
  href?: string;
  invert?: boolean;
  className?: string;
};

export function Logo({ href = "/", invert = false, className = "" }: LogoProps) {
  const mark = invert ? "bg-white" : "bg-[var(--sending-orange)]";
  const hole = invert ? "bg-[var(--sending-orange)]" : "bg-white";
  const word = invert ? "text-white" : "text-[var(--sending-orange)]";

  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative block h-8 w-8 shrink-0">
        <span className={`absolute inset-0 rounded-full ${mark}`} />
        <span className={`absolute inset-[8px] rounded-full ${hole}`} />
      </span>
      <span className={`text-[22px] font-semibold tracking-tight ${word}`}>
        Sending
      </span>
    </Link>
  );
}
