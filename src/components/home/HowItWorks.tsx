import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    title: "Sending Church",
    time: "9:00–10:00 AM",
    points: [
      "Come as you are.",
      "Grow in faith.",
      "Meet people.",
      "Ask questions.",
    ],
    status: "Free • Everyone welcome",
    price: "",
    cta: "Come This Sunday",
    href: "/#sunday",
    accent: "church",
  },
  {
    label: "Part 2",
    title: "12-Week Sending Training",
    time: "8:00–9:00 AM",
    points: [
      "For people ready to go deeper.",
      "Learn to make disciples, lead others, and start a Sending Church.",
    ],
    status: "",
    price: "$497",
    cta: "View Training",
    href: "/#12-weeks",
    accent: "training",
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
        {SUNDAY_PARTS.map((part) => (
            <div
              key={part.label}
              className={`rounded-[28px] border bg-white px-7 py-8 ${
                part.accent === "church" ? "border-[#ffd8c2]" : "border-[#eee]"
              }`}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
                {part.label}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[28px]">
                {part.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#111]">{part.time}</p>
              <ul className="mt-5 max-w-md space-y-1 text-base leading-relaxed text-[#666]">
                {part.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {part.status ? (
                <p className="mt-5 text-sm font-medium text-[#111]">{part.status}</p>
              ) : null}
              {part.price ? (
                <p className="mt-5 text-lg font-semibold tracking-tight">{part.price}</p>
              ) : null}
              <div className="mt-6">
                <Button
                  href={part.href}
                  variant={part.accent === "church" ? "primary" : "secondary"}
                  className="w-full sm:w-auto"
                >
                  {part.cta}
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
        ))}
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
            This 12-week path is for people ready to be trained and sent.
            Sunday church is open to everyone.
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
