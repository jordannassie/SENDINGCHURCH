"use client";

import { useMemo, useState } from "react";
import {
  getLocations,
  searchLocations,
  type LocationFilter,
} from "@/lib/locations";
import { EmptyLocationCTA } from "./EmptyLocationCTA";
import { LocationCard } from "./LocationCard";
import { LocationFilters } from "./LocationFilters";
import { LocationSearch } from "./LocationSearch";

export function LocationFinder() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filter, setFilter] = useState<LocationFilter>("nearest");

  const result = useMemo(
    () => searchLocations(getLocations(), submittedQuery, filter),
    [submittedQuery, filter],
  );

  return (
    <section id="find-a-church" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          Find a Sending Church
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Find Training and Church Near You
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666]">
          Enter your city or ZIP code to find the nearest Sending Church,
          upcoming training, and Sunday gathering.
        </p>

        <LocationSearch
          query={query}
          onQueryChange={setQuery}
          onSubmit={(value) => {
            setQuery(value);
            setSubmittedQuery(value);
          }}
        />
        <LocationFilters value={filter} onChange={setFilter} />

        <div className="mt-8 space-y-5">
          {result.locations.map((location) => (
            <LocationCard
              key={location.location_id}
              location={location}
              nearestFallback={result.nearestFallback}
            />
          ))}
        </div>

        <EmptyLocationCTA />
      </div>
    </section>
  );
}
