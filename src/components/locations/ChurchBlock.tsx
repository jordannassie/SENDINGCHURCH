import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatTimeRange, type SendingLocation } from "@/lib/locations";

export function ChurchBlock({ location }: { location: SendingLocation }) {
  return (
    <div className="flex h-full flex-col px-6 py-5 sm:px-8">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#111]">
        Church
      </p>
      <p className="mt-2 text-sm font-medium text-[#111]">
        {formatTimeRange(location.church_start_time, location.church_end_time)}
      </p>
      <h4 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
        Sending Church
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-[#666]">
        Read through the Bible chapter by chapter in a simple, repeatable
        gathering anyone can lead.
      </p>
      <p className="mt-3 text-lg font-semibold tracking-tight text-[#111]">
        Free
      </p>
      <div className="mt-4">
        <Button
          href={location.attend_church_url}
          variant="dark"
          className="w-full sm:w-auto"
        >
          Attend Church
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
