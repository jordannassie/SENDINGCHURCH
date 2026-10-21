import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Beliefs } from "@/components/home/Beliefs";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SundayRsvp } from "@/components/home/SundayRsvp";
import { WorldGlobe } from "@/components/home/WorldGlobe";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { BOOK_IMAGE, GATHERING_IMAGE, HERO_VIDEO, PASTORS, SEE_DO_SEND_IMAGE, STAR_IMAGE } from "@/lib/demo/data";
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

      <section className="relative isolate overflow-hidden bg-white">
        <Image
          src={STAR_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 42%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0.2) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 40%, rgba(255,255,255,0.7) 54%, rgba(255,255,255,0.22) 72%, rgba(255,255,255,0.06) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
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
            <a
              href="#sunday"
              className={`mt-8 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[var(--sending-orange)] px-5 py-3.5 text-sm font-medium text-white hover:bg-[var(--sending-orange-hover)] sm:w-auto ${FOCUS}`}
            >
              Come this Sunday
              <ArrowUpRight size={16} aria-hidden />
            </a>
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
              <div className="mt-6 overflow-hidden rounded-2xl bg-[#f3efe9]">
                <Image
                  src={BOOK_IMAGE}
                  alt="Sending book: Save the Lost. Train the Saved. Send the Trained."
                  width={1400}
                  height={900}
                  className="aspect-[16/10] w-full object-cover object-center"
                />
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

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="flex items-end justify-center lg:justify-start">
            <div className="relative z-10 overflow-hidden rounded-full border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <Image
                src={PASTORS.jordanImage}
                alt="Pastor Jordan"
                width={320}
                height={320}
                className="h-36 w-36 object-cover object-center sm:h-48 sm:w-48"
              />
            </div>
            <div className="relative z-20 -ml-8 overflow-hidden rounded-full border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:-ml-10">
              <Image
                src={PASTORS.susieImage}
                alt="Susie"
                width={320}
                height={320}
                className="h-36 w-36 object-cover object-center sm:h-48 sm:w-48"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#9a9a9a]">WELCOME</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              From Pastor Jordan and Susie
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#555]">
              Jordan and Susie have spent their lives helping people know Jesus,
              start churches, and reach their communities. Together, they have
              helped plant 180 churches across 23 nations and have seen more
              than 2 million people make decisions for Christ. Their passion is
              simple: help everyday Christians share Jesus, make disciples, and
              start simple Bible-centered churches wherever they live.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#444]">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[var(--sending-orange)]" aria-hidden />
                {PASTORS.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--sending-orange)]" aria-hidden />
                <a href={PASTORS.phoneHref} className={`rounded-sm hover:text-[#111] ${FOCUS}`}>
                  {PASTORS.phone}
                </a>
              </p>
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Button href={PASTORS.giveUrl}>Give</Button>
                <img src={PASTORS.tithelyLogo} alt="Tithe.ly" className="h-6 w-auto" />
              </div>
              <p className="mt-3.5 max-w-[420px] text-[13px] leading-relaxed text-[#999]">
                Your gift is tax-deductible and processed through Daily Church, a 501(c)(3)
                nonprofit ministry. EIN: 84-2372867
              </p>
            </div>
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
