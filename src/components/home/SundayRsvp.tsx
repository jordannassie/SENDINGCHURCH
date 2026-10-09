"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  CircleHelp,
  Heart,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { formatTimeRange, getLocations } from "@/lib/locations";
import type { SendingLocation } from "@/lib/locations/types";
import { rsvpConfirmationText } from "@/lib/rsvp/messages";
import { saveSundayRsvp } from "@/lib/rsvp/save";

const SUNDAY_HERO_IMAGE =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/8299d76d-4aff-4190-8b61-f21b24a8d5fc.png";

const INVITES = [
  { icon: BookOpen, label: "No church experience required." },
  { icon: Users, label: "No pressure." },
  { icon: CircleHelp, label: "Bring your questions." },
  { icon: Heart, label: "We’d love to meet you." },
] as const;

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

  return (
    <section
      id="sunday"
      aria-labelledby="sunday-heading"
      className="relative isolate scroll-mt-[73px] min-h-[calc(100svh-73px)] overflow-hidden bg-[#f6f3f0]"
    >
      <Image
        src={SUNDAY_HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.88) 24%, rgba(255,255,255,0.5) 48%, rgba(255,255,255,0.16) 72%, rgba(255,255,255,0.05) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block lg:hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.94) 36%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0.12) 66%, rgba(255,255,255,0) 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.94) 18%, rgba(255,255,255,0.62) 34%, rgba(255,255,255,0.16) 48%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-73px)] w-full max-w-6xl items-center px-5 py-12 sm:py-16 lg:py-10">
        <div className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,1fr)_340px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_468px] xl:gap-16">
          <div className="min-w-0 max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#9a9a9a] uppercase sm:text-xs">
              You’re invited
            </p>
            <h1
              id="sunday-heading"
              className="mt-4 text-[2.7rem] font-black leading-[0.9] tracking-[-0.045em] text-[#111] sm:text-[3.4rem] md:text-[3.15rem] lg:text-[4.5rem] xl:text-[5.15rem]"
            >
              <span className="block">Come This</span>
              <span className="block text-[var(--sending-orange)]">Sunday</span>
            </h1>
            <p className="mt-5 max-w-[420px] text-[15px] leading-relaxed text-[#5e5e5e] sm:text-base md:max-w-[340px] lg:max-w-[420px]">
              Bring your Bible, grab coffee, meet friends, and find a community
              to belong. Come as you are.
            </p>
            <ul className="mt-8 max-w-[340px] space-y-4 lg:max-w-[380px] lg:space-y-5">
              {INVITES.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-3.5 text-[15px] leading-snug text-[#3d3d3d]"
                >
                  <item.icon
                    aria-hidden
                    size={20}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-[var(--sending-orange)]"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="sunday-rsvp"
            className="w-full justify-self-start rounded-[24px] border border-black/[0.04] bg-white/[0.97] px-6 py-6 shadow-[0_22px_60px_rgba(17,17,17,0.12)] sm:px-7 sm:py-7 md:justify-self-end md:px-6 md:py-6 lg:px-8 lg:py-8"
          >
            {locations.length > 1 ? (
              <label className="mb-5 block">
                <span className="text-[11px] font-medium tracking-[0.16em] text-[#999] uppercase">
                  Select Location
                </span>
                <select
                  value={location.location_id}
                  onChange={(event) => {
                    setLocationId(event.target.value);
                    resetSubmission();
                  }}
                  className="mt-2 h-12 w-full rounded-2xl border border-[#e7e7e7] bg-white px-4 text-sm text-[#111] outline-none focus:border-[#ffbfa0]"
                >
                  {locations.map((item) => (
                    <option key={item.location_id} value={item.location_id}>
                      {item.location_name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f4] text-[var(--sending-orange)]">
                <Calendar aria-hidden size={18} strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#9a9a9a] uppercase">
                  {location.church_day}
                </p>
                <p className="text-[1.35rem] font-bold tracking-tight text-[#111] lg:text-[1.55rem]">
                  {sundayTime(location)}
                </p>
              </div>
            </div>

            <a
              href={location.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-3.5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--sending-orange)]"
              aria-label={`Directions to ${location.venue_name}, ${location.address}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f4] text-[var(--sending-orange)]">
                <MapPin aria-hidden size={18} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold tracking-tight text-[#111]">
                  {location.venue_name}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-[#8a8a8a]">
                  {location.address}
                </span>
              </span>
              <ChevronRight
                aria-hidden
                size={18}
                className="shrink-0 text-[#c8c8c8]"
              />
            </a>

            <div className="my-5 h-px bg-[#ececec] lg:my-6" />

            {location.leader_name ? (
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#f4f4f4]">
                  {location.leader_photo_url ? (
                    <Image
                      src={location.leader_photo_url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-[#111]">
                    {location.leader_name}
                  </p>
                  {location.leader_title ? (
                    <p className="text-[13px] text-[#8a8a8a]">
                      {location.leader_title}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="my-5 h-px bg-[#ececec] lg:my-6" />

            {savedName ? (
              <div role="status">
                <h3 className="text-[1.35rem] font-bold tracking-tight text-[#111]">
                  You’re in.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666]">
                  We’ll text you the location details and a reminder before
                  Sunday.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#777]">
                  {rsvpConfirmationText(savedName)}
                </p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={onSubmit} noValidate>
                <h3 className="pb-1 text-[1.35rem] font-bold tracking-tight text-[#111] lg:text-[1.45rem]">
                  I’m Coming Sunday
                </h3>
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
                      className="h-[52px] w-full rounded-2xl border border-[#e6e6e6] bg-white pr-4 pl-11 text-sm text-[#111] outline-none placeholder:text-[#b0b0b0] focus:border-[#ffbfa0] focus:ring-2 focus:ring-[#ff6a00]/15"
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
                      aria-describedby={error ? "sunday-rsvp-error" : undefined}
                      className="h-[52px] w-full rounded-2xl border border-[#e6e6e6] bg-white pr-4 pl-11 text-sm text-[#111] outline-none placeholder:text-[#b0b0b0] focus:border-[#ffbfa0] focus:ring-2 focus:ring-[#ff6a00]/15"
                    />
                  </span>
                </label>
                {error ? (
                  <p id="sunday-rsvp-error" role="alert" className="text-sm text-[#c2410c]">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--sending-orange)] text-[15px] font-semibold text-white transition-colors hover:bg-[var(--sending-orange-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "I’m Coming Sunday"}
                  {submitting ? null : <ArrowRight aria-hidden size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
