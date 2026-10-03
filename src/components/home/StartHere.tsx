import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StartHere() {
  return (
    <section id="start-here" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          Start Here
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          You Don’t Have to Start a Church to Come to Sending.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666]">
          If you’re looking for a church, community, prayer, or a place to grow
          in your faith, start with the free Sunday gathering.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#666]">
          If later you feel called to lead, make disciples, or start a church,
          we’ll help train and equip you.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[28px] border border-[#ffd8c2] bg-white px-6 py-7 sm:px-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--sending-orange)]">
              I Want to Come to Church
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Free Sunday Gathering
            </h3>
            <p className="mt-1 text-sm font-medium text-[#111]">9:00–10:00 AM</p>
            <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-[#666]">
              <li>Learn.</li>
              <li>Ask questions.</li>
              <li>Receive prayer.</li>
              <li>Build friendships.</li>
              <li>Grow.</li>
            </ul>
            <div className="mt-6">
              <Button href="/#sunday" className="w-full sm:w-auto">
                Come This Sunday
                <ArrowRight size={15} />
              </Button>
            </div>
          </article>

          <article className="rounded-[28px] border border-[#eee] bg-white px-6 py-7 sm:px-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
              I Want to Be Trained and Sent
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              12-Week Sending Training
            </h3>
            <p className="mt-1 text-sm font-medium text-[#111]">8:00–9:00 AM</p>
            <p className="mt-5 text-sm leading-relaxed text-[#666]">
              Learn how to make disciples, lead people, and start a simple
              Sending Church.
            </p>
            <div className="mt-6">
              <Button
                href="/#12-weeks"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore the Training
                <ArrowRight size={15} />
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
