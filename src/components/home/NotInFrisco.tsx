import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PLACES = [
  "Homes",
  "Coffee shops",
  "Campuses",
  "Workplaces",
  "Neighborhoods",
  "Cities",
  "Nations",
];

export function NotInFrisco() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          Everywhere
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Not in Frisco?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666]">
          Sending is designed to work anywhere.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {PLACES.map((place) => (
            <span
              key={place}
              className="rounded-full border border-[#eee] bg-white px-4 py-2 text-sm font-medium"
            >
              {place}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#666]">
          If you feel called to make disciples and start a simple church where
          you live, explore the Sending pathway.
        </p>
        <div className="mt-8">
          <Button href="/login" className="w-full sm:w-auto">
            Start a Sending Church
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </section>
  );
}
