"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WHY_SENDING } from "@/lib/demo/data";

export function WhySending() {
  return <Vision />;
}

export function Vision() {
  const [open, setOpen] = useState<"here" | "why" | "faith" | null>(null);

  return (
    <section id="vision" className="bg-[var(--sending-orange)]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
          Vision
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          You Were Made for More Than Just Sitting in Church.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90">
          Sending helps ordinary believers get trained, live on mission, and
          start simple, reproducible churches anywhere.
        </p>
        <p className="mt-4 text-base font-medium tracking-tight text-white">
          Save the Lost. Train the Saved. Send the Trained.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/login" variant="white">
            Join the Team
            <ArrowRight size={15} />
          </Button>
          <Button href="/#how-it-works" variant="outline">
            See How It Works
            <ArrowRight size={15} />
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            aria-expanded={open === "here"}
            aria-controls="why-you-are-here"
            onClick={() => setOpen((value) => (value === "here" ? null : "here"))}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
          >
            Why You Are Here
            <ChevronDown
              size={16}
              className={`transition-transform ${open === "here" ? "rotate-180" : ""}`}
            />
          </button>
          <button
            type="button"
            aria-expanded={open === "why"}
            aria-controls="why-sending"
            onClick={() => setOpen((value) => (value === "why" ? null : "why"))}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
          >
            Our Uniqueness
            <ChevronDown
              size={16}
              className={`transition-transform ${open === "why" ? "rotate-180" : ""}`}
            />
          </button>
          <button
            type="button"
            aria-expanded={open === "faith"}
            aria-controls="statement-of-faith"
            onClick={() => setOpen((value) => (value === "faith" ? null : "faith"))}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
          >
            Statement of Faith
            <ChevronDown
              size={16}
              className={`transition-transform ${open === "faith" ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {open === "here" ? (
          <div id="why-you-are-here" className="mt-10 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              Why You Are Here
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              You Were Made to Go
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              God never made you to sit in a church building, but to go into
              all the world and share the Gospel. We are a church equipping
              you to do that.
            </p>
          </div>
        ) : null}

        {open === "faith" ? (
          <div id="statement-of-faith" className="mt-10 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              Statement of Faith
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What We Believe
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              We believe the Bible is the Word of God. We believe Jesus Christ
              is the Son of God, that He died for our sins and rose again, and
              that salvation is by grace through faith in Him alone. We believe
              the Church is sent to make disciples of all nations.
            </p>
          </div>
        ) : null}

        {open === "why" ? (
          <div id="why-sending" className="mt-10">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              Our Uniqueness
            </p>
            <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What Makes Sending Churches Unique
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
              Simple enough to remember. Practical enough to do. Healthy enough
              to last. Powerful enough to reproduce.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_SENDING.map((item) => (
                <article
                  key={item.number}
                  className="rounded-[24px] bg-white px-5 py-5"
                >
                  <p className="text-sm font-semibold text-[var(--sending-orange)]">
                    {item.number}
                  </p>
                  <h4 className="mt-2 text-sm font-semibold tracking-[0.08em] uppercase">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#666]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-semibold tracking-tight text-white">
                One movement. Many groups. One mission.
              </p>
              <p className="mt-2 text-sm text-white/75">
                Save the Lost. Train the Saved. Send the Trained.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
