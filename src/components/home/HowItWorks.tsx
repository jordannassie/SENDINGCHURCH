import Image from "next/image";
import { BookOpen, Users } from "lucide-react";
import { HOW_IMAGE, TWELVE_WEEKS } from "@/lib/demo/data";

const PHASE_STYLES = {
  save: {
    wrap: "border-l-2 border-[var(--sending-orange)]",
    title: "text-[var(--sending-orange)]",
    badge: "bg-[var(--sending-orange)] text-white",
  },
  train: {
    wrap: "border-l-2 border-[#111]",
    title: "text-[#111]",
    badge: "bg-[#111] text-white",
  },
  send: {
    wrap: "border-l-2 border-[var(--sending-orange)] bg-[#f5f5f5] rounded-r-2xl py-4 pr-5",
    title: "text-[#111]",
    badge: "bg-[#fff4ec] text-[var(--sending-orange)]",
  },
} as const;

const SUNDAY_PARTS = [
  {
    label: "Part 1",
    title: "1 Hour Training",
    time: "8:00–9:00 AM",
    body: "Practice the week’s skill and prepare people to live it out.",
    icon: Users,
  },
  {
    label: "Part 2",
    title: "1 Hour Church",
    time: "9:00–10:00 AM",
    body: "Gather as church to share, learn, obey, pray, and send.",
    icon: BookOpen,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1220px] px-5 py-20 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          A simple model
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          How It Works
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#666]">
          A simple, repeatable path to reach people, make disciples, and
          multiply churches everywhere.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SUNDAY_PARTS.map((part) => {
          const Icon = part.icon;
          return (
            <div
              key={part.label}
              className="rounded-[28px] border border-[#eee] bg-white px-7 py-8"
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
                {part.label}
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff4ec] text-[var(--sending-orange)]">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
                    {part.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--sending-orange)]">
                    {part.time}
                  </p>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-[#666]">
                    {part.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        id="12-weeks"
        className="mt-16 grid items-center gap-12 lg:grid-cols-[48%_52%] lg:gap-14"
      >
        <div className="flex justify-center lg:justify-start">
          <Image
            src={HOW_IMAGE}
            alt="Save, Train, Send, Multiply"
            width={1200}
            height={1200}
            className="h-auto w-full max-w-[560px] lg:max-w-[520px]"
          />
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
            The path
          </p>
          <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-[44px] sm:leading-[1.05]">
            12 Weeks to Multiply
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            One simple skill each week, practiced in training and lived out in
            church.
          </p>

          <div className="mt-10 space-y-8">
            {TWELVE_WEEKS.map((group, groupIndex) => {
              const style = PHASE_STYLES[group.accent];
              return (
                <div key={group.title} className={`pl-5 ${style.wrap}`}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className={`text-lg font-semibold tracking-wide ${style.title}`}>
                      {group.title}
                    </p>
                    <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
                      {group.weeks}
                    </p>
                  </div>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.steps.map((step, stepIndex) => {
                      const number = String(groupIndex * 4 + stepIndex + 1).padStart(
                        2,
                        "0",
                      );
                      return (
                        <li key={step} className="flex items-center gap-3">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${style.badge}`}
                          >
                            {number}
                          </span>
                          <span className="text-lg font-medium tracking-tight text-[#111]">
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-base font-medium tracking-tight text-[#111]">
            Learn it → Live it → Lead it →{" "}
            <span className="text-[var(--sending-orange)]">Multiply it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
