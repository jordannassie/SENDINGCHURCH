import Image from "next/image";
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
      <div className="border-b border-[#f3f3f3] px-6 py-5 sm:px-8">
        {nearestFallback ? (
          <p className="mb-2 text-xs font-medium tracking-[0.16em] uppercase text-[var(--sending-orange)]">
            Nearest available Sending Church
          </p>
        ) : null}
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          {location.church_day}
        </p>
        <h3 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {location.location_name}
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
              Venue
            </p>
            <p className="mt-1 text-base font-semibold tracking-tight text-[#111]">
              {location.venue_name}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
              Address
            </p>
            <p className="mt-1 text-base font-semibold tracking-tight text-[#111]">
              {location.address}
            </p>
            <a
              href={location.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center text-sm font-medium text-[var(--sending-orange)] hover:text-[var(--sending-orange-hover)]"
            >
              Get Directions →
            </a>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#fff4ec]">
            {location.leader_photo_url ? (
              <Image
                src={location.leader_photo_url}
                alt={location.leader_name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--sending-orange)]">
                {location.leader_name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-[#111]">
              {location.leader_name}
            </p>
            <p className="text-xs text-[#777]">{location.leader_title}</p>
          </div>
        </div>
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
