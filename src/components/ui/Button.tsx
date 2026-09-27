import Link from "next/link";

const variants = {
  primary:
    "bg-[var(--sending-orange)] text-white hover:bg-[var(--sending-orange-hover)]",
  secondary:
    "bg-white text-[#111] border border-[#e8e8e8] hover:border-[#d4d4d4]",
  white: "bg-white text-[#111] hover:bg-white/90",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
