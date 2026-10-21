"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, MapPin, Phone, User } from "lucide-react";
import { formatTimeRange, getLocations } from "@/lib/locations";
import type { SendingLocation } from "@/lib/locations/types";
import { rsvpConfirmationText } from "@/lib/rsvp/messages";
import { saveSundayRsvp } from "@/lib/rsvp/save";

function isValidMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function sundayTime(location: SendingLocation) {
  return formatTimeRange(
    location.church_start_time,
    location.church_end_time,
  ).replace("–", " – ");
}

export function SundayRsvp() {
  const locations = getLocations();
  const [locationId, setLocationId] = useState(locations[0]?.location_id ?? "");
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [savedName, setSavedName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const location =
    locations.find((item) => item.location_id === locationId) ?? locations[0];

  if (!location) return null;

  function resetSubmission() {
    submittingRef.current = false;
    setSubmitting(false);
    setSavedName("");
    setError("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const name = firstName.trim();
    const phone = mobile.trim();

    if (!name || !phone) {
      setError("First name and mobile number are needed.");
      return;
    }

    if (!isValidMobile(phone)) {
      setError("Enter a valid mobile number.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    try {
      saveSundayRsvp({
        first_name: name,
        mobile: phone,
        location_id: location.location_id,
      });
      setSavedName(name);
    } catch {
      submittingRef.current = false;
      setSubmitting(false);
      setError("Something went wrong. Please try again.");
    }
  }

  const fieldClass =
    "h-[52px] w-full rounded-2xl border border-[#e6e6e6] bg-white pr-4 pl-11 text-sm text-[#111] outline-none placeholder:text-[#b0b0b0] focus:border-[#ffbfa0] focus:ring-2 focus:ring-[#ff6a00]/20";

  return (
    <section
      id="sunday"
      aria-labelledby="sunday-heading"
      className="scroll-mt-20 bg-black text-white"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <h2
          id="sunday-heading"
          className="max-w-xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl sm:leading-[0.92]"
        >
          Start with a Sunday.
        </h2>

        <div
          id="sunday-rsvp"
          className="rounded-[28px] border border-white/12 bg-[#141414] p-6 sm:p-8"
        >
          {locations.length > 1 ? (
            <label className="mb-5 block">
              <span className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
                Select Location
              </span>
              <select
                value={location.location_id}
                onChange={(event) => {
                  setLocationId(event.target.value);
                  resetSubmission();
                }}
                className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#111] px-4 text-sm text-white outline-none focus:border-[var(--sending-orange)]"
              >
                {locations.map((item) => (
                  <option key={item.location_id} value={item.location_id}>
                    {item.location_name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <p className="text-sm font-medium text-white">
            Sending · {location.city}
          </p>
          <p className="mt-3 text-lg font-semibold tracking-tight">
            {location.church_day} · {sundayTime(location)}
          </p>
          <a
            href={location.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-start gap-2 rounded-sm text-sm text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sending-orange)]"
          >
            <MapPin aria-hidden size={16} className="mt-0.5 shrink-0 text-[var(--sending-orange)]" />
            <span>
              {location.venue_name}
              <span className="mt-0.5 block">{location.address}</span>
            </span>
          </a>
          {location.leader_name ? (
            <p className="mt-3 text-sm text-white/55">
              {location.leader_name}
              {location.leader_title ? ` · ${location.leader_title}` : ""}
            </p>
          ) : null}

          <div className="my-6 h-px bg-white/10" />

          {savedName ? (
            <div role="status">
              <h3 className="text-2xl font-semibold tracking-tight">You’re in.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                We’ll text you the location details and a reminder before Sunday.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {rsvpConfirmationText(savedName)}
              </p>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={onSubmit} noValidate>
              <h3 className="pb-1 text-xl font-semibold tracking-tight">I’m Coming Sunday</h3>
              <label className="block">
                <span className="sr-only">First Name</span>
                <span className="relative block">
                  <User
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#b5b5b5]"
                  />
                  <input
                    required
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    aria-invalid={error ? true : undefined}
                    className={fieldClass}
                  />
                </span>
              </label>
              <label className="block">
                <span className="sr-only">Mobile Number</span>
                <span className="relative block">
                  <Phone
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#b5b5b5]"
                  />
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    name="mobile"
                    autoComplete="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "sunday-rsvp-error" : "sunday-rsvp-note"}
                    className={fieldClass}
                  />
                </span>
              </label>
              {error ? (
                <p id="sunday-rsvp-error" role="alert" className="text-sm text-[#ffb089]">
                  {error}
                </p>
              ) : (
                <p id="sunday-rsvp-note" className="text-sm leading-relaxed text-white/55">
                  We’ll text you the location details and a reminder before Sunday.
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--sending-orange)] text-[15px] font-semibold text-white transition-colors hover:bg-[var(--sending-orange-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending…" : "I’m Coming Sunday"}
                {submitting ? null : <ArrowRight aria-hidden size={16} />}
              </button>
            </form>
          )}
          <p className="mt-5 text-sm text-white/55">Come as you are. We’d love to meet you.</p>
        </div>
      </div>
    </section>
  );
}
