import Link from "next/link";
import { PASTORS } from "@/lib/demo/data";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/brand/SocialLinks";
import { AccountLink } from "@/components/layout/AccountLink";

const NAV = [
  { href: "/#sunday", label: "Sundays" },
  { href: "/#foundations", label: "Foundations" },
  { href: "/#learn", label: "Learn to lead" },
  { href: "/#beliefs", label: "Our Beliefs" },
  { href: PASTORS.phoneHref, label: "Contact" },
  { href: "/csv", label: "CSV" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--sending-orange)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <Logo invert href="/" imageClassName="h-7" />
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
          {NAV.map((item) =>
            item.href.startsWith("tel:") ? (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
          <AccountLink />
        </nav>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <SocialLinks size={22} className="text-white" />
          <p className="text-sm text-white/95">Save the lost. Train the saved. Send the trained.</p>
        </div>
      </div>
    </footer>
  );
}
