import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import {
  ArrowRight,
  Calendar,
  Church,
  Droplets,
  Globe,
  MapPin,
  Phone,
  Radio,
  Users,
} from "lucide-react";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import {
  GATHERING_STEPS,
  HERO_IMAGE,
  HERO_VIDEO,
  IMPACT_STATS,
  PASTORS,
  STAR_IMAGE,
  START_FLOW,
  START_WITH_TWO_IMAGE,
  STORIES,
} from "@/lib/demo/data";

const IMPACT_ICONS = [Church, Globe, Users, Droplets, Radio];

export default function HomePage() {
  preload(HERO_VIDEO, { as: "video" });

  return (
    <div className="bg-white">
      <link rel="preload" as="video" href={HERO_VIDEO} type="video/quicktime" />
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_1.15fr] lg:py-16">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-[#111] sm:text-6xl lg:text-[72px] lg:leading-[0.95]">
            Save the Lost.
            <br />
            Send the Saved.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#6b6b6b]">
            A simple church movement built to save people, train believers, and
            send ordinary people to start churches anywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/login">
              Join the Frisco Team
              <ArrowRight size={15} />
            </Button>
            <Button href="/login" variant="secondary">
              Start a Sending Church
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px]">
          <Image
            src={HERO_IMAGE}
            alt="Sending gathering"
            width={1400}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {IMPACT_STATS.map((stat, index) => {
          const Icon = IMPACT_ICONS[index];
          return (
            <div key={stat.label} className="text-center">
              <Icon className="mx-auto text-[var(--sending-orange)]" size={22} />
              <p className="mt-3 text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-[#777]">{stat.label}</p>
            </div>
          );
        })}
      </section>

      <HeroVideo />

      <section id="vision" className="bg-[var(--sending-orange)]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
            Vision
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Save the Lost. Train the Saved. Send the Trained.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90">
            Start with two. Meet for 60 minutes. Save. Train. Send. Multiply.
            Ordinary people can start a Sending Church anywhere.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
            Church Hour Format
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            One Hour. One Mission. Completely Repeatable.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666]">
            Start with two people. Meet anywhere. Follow the same simple format
            every week.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[#eee] bg-white">
            <div className="hidden grid-cols-[140px_220px_1fr] bg-[#f7f7f7] px-6 py-3 text-xs font-medium tracking-[0.16em] uppercase text-[#888] md:grid">
              <span>Time</span>
              <span>Part</span>
              <span>What Happens</span>
            </div>
            {GATHERING_STEPS.map((row) => (
              <div
                key={row.part}
                className="grid gap-1 border-t border-[#eee] px-6 py-3.5 md:grid-cols-[140px_220px_1fr] md:items-center"
              >
                <p className="text-sm font-medium text-[var(--sending-orange)]">{row.time}</p>
                <p className="text-sm font-semibold tracking-wide">{row.part}</p>
                <p className="text-sm leading-snug text-[#666]">{row.happens}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#666]">
            After 60 minutes: stay for coffee, fellowship, conversation, and prayer.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[28px]">
          <Image
            src={START_WITH_TWO_IMAGE}
            alt="Two people praying together"
            width={1400}
            height={900}
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Start With Two.</h2>
          <p className="mt-5 text-base leading-relaxed text-[#666]">
            You do not need a building, stage, staff, or large crowd. Find one
            other person. Meet in a home, coffee shop, workplace, campus,
            restaurant, or anywhere people can gather. Follow the 60-minute
            Sending Church format. Then multiply.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {START_FLOW.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="rounded-full border border-[#eee] bg-white px-4 py-2 text-sm font-medium">
                  {item}
                </span>
                {index < START_FLOW.length - 1 ? (
                  <ArrowRight size={16} className="text-[var(--sending-orange)]" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/login">
              Start a Sending Church
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      <section id="launch-hub" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[28px]">
          <Image
            src={STAR_IMAGE}
            alt="The Star in Frisco"
            width={1400}
            height={900}
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
            Our launch hub
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Dallas / Frisco, Texas
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#666]">
            Our launch hub meets every Sunday at The Star in Frisco. This is
            where we are building, testing, and multiplying the Sending Church
            model.
          </p>
          <div className="mt-6 space-y-3 text-sm text-[#444]">
            <p className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--sending-orange)]" />
              Sunday Gathering · 9:00 AM – 10:00 AM
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[var(--sending-orange)]" />
              The Star · {PASTORS.address}
            </p>
          </div>
          <div className="mt-8">
            <Button href="/login">
              Join the Frisco Team
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      <section id="pastors" className="bg-[#fafafa] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center">
            <div className="flex items-end">
              <div className="relative z-10 overflow-hidden rounded-full border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src={PASTORS.jordanImage}
                  alt="Pastor Jordan"
                  width={320}
                  height={320}
                  className="h-40 w-40 object-cover object-center sm:h-52 sm:w-52"
                />
              </div>
              <div className="relative z-20 -ml-8 overflow-hidden rounded-full border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:-ml-10">
                <Image
                  src={PASTORS.susieImage}
                  alt="Susie"
                  width={320}
                  height={320}
                  className="h-40 w-40 object-cover object-center sm:h-52 sm:w-52"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Pastor Jordan and Susie
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#666]">
              Jordan and Susie have spent their lives helping people know Jesus,
              start churches, and reach their communities. Together, they have
              helped plant 180 churches across 23 nations and have seen more
              than 2 million people make decisions for Christ. Their passion is
              simple: help everyday Christians share Jesus, make disciples, and
              start simple Bible-centered churches wherever they live.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#444]">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[var(--sending-orange)]" />
                {PASTORS.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--sending-orange)]" />
                <a href={PASTORS.phoneHref} className="hover:text-[#111]">
                  {PASTORS.phone}
                </a>
              </p>
            </div>
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Button href={PASTORS.giveUrl}>Give</Button>
                <img
                  src={PASTORS.tithelyLogo}
                  alt="Tithe.ly"
                  className="h-6 w-auto"
                />
              </div>
              <p className="mt-3.5 max-w-[420px] text-[13px] leading-relaxed text-[#999]">
                Your gift is tax-deductible and processed through Daily Church,
                a 501(c)(3) nonprofit ministry. EIN: 84-2372867
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">Stories</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Ordinary people. New churches.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {STORIES.map((story) => (
              <blockquote
                key={story.name}
                className="rounded-3xl border border-[#eee] bg-white p-7"
              >
                <p className="text-base leading-relaxed text-[#333]">“{story.quote}”</p>
                <footer className="mt-5 text-sm text-[#777]">
                  {story.name} · {story.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--sending-orange)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
              Be part of something bigger
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Join the Sending Team.
            </h2>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#111]"
          >
            Join the Team
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
