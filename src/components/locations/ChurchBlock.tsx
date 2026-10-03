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
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-[#666]">
        <p>Come and grow in faith.</p>
        <p>
          Learn about Jesus and the Bible, ask honest questions, receive
          prayer, and grow together in a simple church gathering.
        </p>
      </div>
      <p className="mt-4 text-base font-semibold tracking-tight text-[#111]">
        Free — Just show up.
      </p>
    </div>
  );
}
