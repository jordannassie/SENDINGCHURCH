import Image from "next/image";
import Link from "next/link";
import { ONE_BILLION_LOGO, ONE_BILLION_URL, PASTORS } from "@/lib/demo/data";
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
    <footer className="bg-[var(--sending-blue)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-4">
          <Logo invert href="/" imageClassName="h-7" />
          <a href={ONE_BILLION_URL} className="inline-flex items-center gap-2.5 text-sm text-white">
            <span>A ministry of</span>
            <Image
              src={ONE_BILLION_LOGO}
              alt="1Billion"
              width={200}
              height={72}
              className="h-6 w-auto sm:h-8"
            />
          </a>
        </div>
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
