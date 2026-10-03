import type { SendingLocation } from "@/lib/locations";
import { ChurchBlock } from "./ChurchBlock";
import { TrainingBlock } from "./TrainingBlock";

type LocationCardProps = {
  location: SendingLocation;
  nearestFallback?: boolean;
};

export function LocationCard({
  location,
  nearestFallback = false,
}: LocationCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#ffd8c2] bg-white">
      <div className="border-b border-[#f3f3f3] px-6 py-6 sm:px-8">
        {nearestFallback ? (
          <p className="mb-2 text-xs font-medium tracking-[0.16em] uppercase text-[var(--sending-orange)]">
            Nearest available Sending Church
          </p>
        ) : null}
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          {location.church_day}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {location.location_name}
        </h3>
        <p className="mt-2 text-sm text-[#666]">{location.venue_name}</p>
      </div>

      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-[#eee]">
        <div className="border-b border-[#eee] lg:border-b-0">
          <TrainingBlock location={location} />
        </div>
        <ChurchBlock location={location} />
      </div>
    </article>
  );
}
