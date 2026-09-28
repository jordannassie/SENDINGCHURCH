import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--sending-orange)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <Logo invert href="/" />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
          <Link href="/#vision">Vision</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#pastors">Pastors</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/#stories">Stories</Link>
        </nav>
        <p className="text-sm text-white/90">
          Save the Lost. Send the Saved.
        </p>
      </div>
    </footer>
  );
}
