"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Church,
  FileText,
  Home,
  LogOut,
  Menu,
  Rocket,
  User,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useDemoAuth } from "@/lib/demo/auth";

const NAV = [
  { href: "/dashboard", label: "Home", icon: Home, match: "/dashboard" },
  { href: "/dashboard#next-step", label: "My Next Step", icon: CheckSquare },
  { href: "/events", label: "Events", icon: Calendar, match: "/events" },
  { href: "/training", label: "Training", icon: BookOpen, match: "/training" },
  { href: "/start-a-church", label: "Get Involved", icon: Users },
  { href: "/my-church", label: "My Church", icon: Church, match: "/my-church" },
  { href: "/start-a-church", label: "Start a Church", icon: Rocket, match: "/start-a-church" },
  { href: "/training", label: "Resources", icon: FileText },
  { href: "/profile", label: "Profile", icon: User, match: "/profile" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useDemoAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--sending-bg)] text-sm text-[#777]">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--sending-bg)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[220px] flex-col border-r border-[#eee] bg-white px-4 py-5 md:flex">
        <Logo href="/dashboard" />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.match === pathname;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                  active
                    ? "bg-[var(--sending-orange)] text-white"
                    : "text-[#666] hover:bg-[#f7f7f7]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm text-[#666] hover:bg-[#f7f7f7]"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </aside>

      <div className="md:pl-[220px]">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <div className="md:hidden">
            <Logo href="/dashboard" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" className="rounded-full p-2 text-[#888]" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <img
              src={user.avatar}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <button
              type="button"
              className="rounded-full p-2 text-[#111] md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Open menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="space-y-1 border-y border-[#eee] bg-white px-4 py-3 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm text-[#333]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}

        <main className="px-5 pb-10 md:px-8 md:pb-12">{children}</main>
      </div>
    </div>
  );
}
