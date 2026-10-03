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
      <p className="mt-2 text-sm font-medium text-[#111]">
        Come as you are. Come and grow.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#666]">
        Learn about Jesus and the Bible, ask questions, receive prayer, build
        friendships, and grow in faith together.
      </p>
      <p className="mt-4 text-base font-semibold tracking-tight text-[#111]">
        Free — Everyone is welcome. Just show up.
      </p>
      <p className="mt-1 text-sm text-[#777]">
        No experience required. No registration required.
      </p>
    </div>
  );
}
