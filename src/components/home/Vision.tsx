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
          A Church Where You Can Belong, Grow, and Be Sent.
        </h2>
        <div className="mt-5 max-w-2xl space-y-2 text-base leading-relaxed text-white/90">
          <p>Come as you are.</p>
          <p>Learn about Jesus and the Bible.</p>
          <p>Ask questions.</p>
          <p>Receive prayer.</p>
          <p>Build real friendships.</p>
          <p>Grow in your faith.</p>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90">
          And when you’re ready for more, we’ll help equip you to make
          disciples, lead others, and start a simple Sending Church.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["Belong", "Grow", "Train", "Send", "Multiply"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#111]">
                {step}
              </span>
              {index < 4 ? (
                <span className="text-white/70">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 text-base font-medium tracking-tight text-white">
          Save the Lost. Train the Saved. Send the Trained.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#sunday" variant="white" className="w-full sm:w-auto">
            Come This Sunday
            <ArrowRight size={15} />
          </Button>
          <Button
            href="/#how-it-works"
            variant="outline"
            className="w-full sm:w-auto"
          >
            See How Sending Works
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
              You Belong Here
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/90">
              Come grow in your faith, find community, and learn about Jesus.
              And when you’re ready, we’ll help you live on mission and help
              others do the same.
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
