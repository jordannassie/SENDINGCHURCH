import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Beliefs } from "@/components/home/Beliefs";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SundayRsvp } from "@/components/home/SundayRsvp";
import { WorldGlobe } from "@/components/home/WorldGlobe";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { GATHERING_IMAGE, HERO_VIDEO, SEE_DO_SEND_IMAGE } from "@/lib/demo/data";
import { formatTimeRange, getLocations } from "@/lib/locations";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sending-orange)]";

const PATHWAY = [
  {
    number: "01",
    title: "Know Jesus",
    body: "Know who Jesus is and what it means to follow Him.",
  },
  {
    number: "02",
    title: "Grow in faith",
    body: "Build healthy habits and a deeper love for God's Word.",
  },
  {
    number: "03",
    title: "Live your faith",
    body: "Put your faith into practice in everyday life.",
  },
  {
    number: "04",
    title: "Help others follow Jesus",
    body: "Share what you're learning and help others take a next step.",
  },
] as const;

export default function HomePage() {
  preload(HERO_VIDEO, { as: "video" });
  const location = getLocations()[0];
  const sundayTime = location
    ? formatTimeRange(location.church_start_time, location.church_end_time)
    : "9:00–10:00 AM";
  const sundayLine = `Sundays · ${sundayTime} · ${location?.city ?? "Frisco"}, TX`;

  return (
    <div className="overflow-x-hidden bg-white text-[#111]">
      <link rel="preload" as="video" href={HERO_VIDEO} type="video/quicktime" />
      <SiteHeader />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div className="min-w-0">
            <h1 className="text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[5.15rem]">
              <span className="block">Come as</span>
              <span className="block">you are.</span>
              <span className="mt-2 block text-[var(--sending-orange)]">Be sent.</span>
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-snug text-[#3a3a3a] sm:text-xl">
              Follow Jesus. Grow together.
              <span className="block">Help others do the same.</span>
            </p>
            <Link
              href="/#sunday"
              className={`mt-8 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[var(--sending-orange)] px-5 py-3.5 text-sm font-medium text-white hover:bg-[var(--sending-orange-hover)] sm:w-auto ${FOCUS}`}
            >
              Come this Sunday
              <ArrowUpRight size={16} aria-hidden />
            </Link>
            <p className="mt-4 text-sm text-[#6b6b6b]">{sundayLine}</p>
          </div>
          <HeroVideo />
        </div>
      </section>

      <section className="bg-[#f7f6f4]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Together on Sunday. Growing all week.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-[28px] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#9a9a9a]">
                SUNDAY MORNINGS
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find your church family.
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[#555]">
                Read a book of the Bible together. Talk honestly. Pray and take a next step.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <Image
                  src={GATHERING_IMAGE}
                  alt="People gathered around a table with an open Bible"
                  width={1200}
                  height={800}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <p className="mt-5 text-sm text-[#666]">One hour. Everyone welcome.</p>
            </article>

            <article className="flex flex-col rounded-[28px] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#9a9a9a]">
                DURING THE WEEK
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Build your Foundations.
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[#555]">
                One lesson a week. With a friend or mentor. Put your faith into practice.
              </p>
              <div className="mt-6 flex aspect-[16/10] flex-col justify-end rounded-2xl bg-[#f3efe9] p-6 sm:p-8">
                <p className="text-sm font-semibold tracking-[0.16em] text-[var(--sending-orange)]">
                  FOUNDATIONS
                </p>
                <p className="mt-3 max-w-xs text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">
                  One lesson a week.
                </p>
              </div>
              <Link
                href="/#foundations"
                className={`mt-5 inline-flex items-center gap-1 self-start rounded-sm text-sm font-medium text-[var(--sending-orange)] hover:text-[var(--sending-orange-hover)] ${FOCUS}`}
              >
                Explore Foundations
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="foundations" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A year of following Jesus.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-[#555]">
            Foundations supports your everyday walk with Jesus.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PATHWAY.map((step) => (
              <div key={step.number}>
                <p className="text-sm font-semibold tracking-[0.12em] text-[var(--sending-orange)]">
                  {step.number}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#666]">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-[#666]">
            Start where you are. Take your next step when you are ready.
          </p>
        </div>
      </section>

      <section id="learn" className="scroll-mt-20 bg-white px-5 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[32px] bg-[#f6f3ef] px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#9a9a9a]">LEARN TO LEAD</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Ready to help others grow?
            </h2>
            <p className="mt-4 max-w-md text-lg text-[#444]">
              See it. Practice it. Help others do the same.
            </p>
          </div>
          <Image
            src={SEE_DO_SEND_IMAGE}
            alt="See, Do, Send, and Multiply. Watch a Bible group, practice leading together, and send with support."
            width={1400}
            height={1400}
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      <WorldGlobe />
      <SundayRsvp />
      <Beliefs />

      <section className="bg-[var(--sending-orange)] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/85">This Sunday</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">Come as you are.</p>
          </div>
          <Button href="/#sunday" variant="white" className={`w-full sm:w-auto ${FOCUS}`}>
            Come this Sunday
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
