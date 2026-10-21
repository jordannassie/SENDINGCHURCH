"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useDemoAuth } from "@/lib/demo/auth";

const NAV = [
  { href: "/#sunday", label: "Sundays" },
  { href: "/#foundations", label: "Foundations" },
  { href: "/#learn", label: "Learn to lead" },
];

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sending-orange)]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, ready } = useDemoAuth();
  const account = user
    ? { href: "/dashboard", label: "Dashboard" }
    : { href: "/login", label: "Login" };

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo imageClassName="h-7" />

        <nav className="hidden items-center gap-8 text-sm text-[#444] md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-sm transition-colors hover:text-[#111] ${focus}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#sunday"
            className={`hidden items-center gap-1 rounded-full bg-[var(--sending-orange)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--sending-orange-hover)] md:inline-flex ${focus}`}
          >
            Come this Sunday
            <ArrowUpRight size={15} aria-hidden />
          </Link>
          <button
            type="button"
            className={`rounded-full p-2 text-[#111] md:hidden ${focus}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="space-y-1 border-t border-black/5 px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-sm py-2 text-sm text-[#222] ${focus}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {ready ? (
            <Link
              href={account.href}
              className={`block rounded-sm py-2 text-sm text-[#222] ${focus}`}
              onClick={() => setOpen(false)}
            >
              {account.label}
            </Link>
          ) : null}
          <Link
            href="/#sunday"
            className={`mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[var(--sending-orange)] px-4 py-3 text-sm font-medium text-white ${focus}`}
            onClick={() => setOpen(false)}
          >
            Come this Sunday
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
