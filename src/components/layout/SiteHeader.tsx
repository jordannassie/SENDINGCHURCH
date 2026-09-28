"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useDemoAuth } from "@/lib/demo/auth";

const NAV = [
  { href: "/#vision", label: "Vision" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pastors", label: "Pastors" },
  { href: "/start-a-church", label: "Start a Church" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#stories", label: "Stories" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useDemoAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-[#f0f0f0] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm text-[#6b6b6b] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.label === "Dashboard" && !user ? "/login" : item.href}
              className="transition-colors hover:text-[#111]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden items-center gap-1.5 rounded-full bg-[var(--sending-orange)] px-4 py-2 text-sm font-medium text-white md:inline-flex"
          >
            Join the Team
            <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-[#111] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="space-y-1 border-t border-[#f0f0f0] px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.label === "Dashboard" && !user ? "/login" : item.href}
              className="block py-2 text-sm text-[#333]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--sending-orange)] px-4 py-2 text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Join the Team
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
