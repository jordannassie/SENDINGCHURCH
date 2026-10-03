"use client";

import { useState } from "react";
import { FRISCO_LOCATION } from "@/lib/locations";
import { rsvpConfirmationText } from "@/lib/rsvp/messages";
import { saveSundayRsvp } from "@/lib/rsvp/save";

export function SundayRsvp() {
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [savedName, setSavedName] = useState("");
  const [error, setError] = useState("");

  return (
    <section id="sunday" className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          This Sunday
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Come This Sunday
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#666]">
          Your first step is simple. Just show up.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-[#ffd8c2] bg-white px-6 py-7 sm:px-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--sending-orange)]">
              Sending Church — Frisco
            </p>
            <p className="mt-4 text-sm font-medium text-[#111]">Sunday</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              9:00–10:00 AM
            </p>
            <p className="mt-4 text-base font-semibold tracking-tight text-[#111]">
              {FRISCO_LOCATION.venue_name}
            </p>
            <p className="mt-1 text-sm text-[#666]">{FRISCO_LOCATION.address}</p>
            <div className="mt-6 space-y-2 text-sm leading-relaxed text-[#666]">
              <p>Come as you are.</p>
              <p>No church experience required.</p>
              <p>No pressure.</p>
              <p>Bring your questions.</p>
              <p>We’d love to meet you.</p>
            </div>
          </div>

          <div id="sunday-rsvp" className="rounded-[28px] border border-[#eee] bg-white px-6 py-7 sm:px-8">
            {savedName ? (
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  You’re in.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#666]">
                  We’ll text you the location details and a reminder before
                  Sunday.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-[#777]">
                  {rsvpConfirmationText(savedName)}
                </p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!firstName.trim() || !mobile.trim()) {
                    setError("First name and mobile number are needed.");
                    return;
                  }
                  saveSundayRsvp({
                    first_name: firstName,
                    mobile,
                    email,
                  });
                  setSavedName(firstName.trim());
                  setError("");
                }}
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  I’m Coming Sunday
                </h3>
                <label className="block">
                  <span className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
                    First Name
                  </span>
                  <input
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="mt-2 h-12 w-full rounded-full border border-[#eee] px-5 text-sm outline-none focus:border-[#d4d4d4]"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
                    Mobile Number
                  </span>
                  <input
                    required
                    type="tel"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    className="mt-2 h-12 w-full rounded-full border border-[#eee] px-5 text-sm outline-none focus:border-[#d4d4d4]"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium tracking-[0.16em] uppercase text-[#999]">
                    Email optional
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 h-12 w-full rounded-full border border-[#eee] px-5 text-sm outline-none focus:border-[#d4d4d4]"
                  />
                </label>
                {error ? <p className="text-sm text-[#c2410c]">{error}</p> : null}
                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--sending-orange)] px-5 text-sm font-medium text-white hover:bg-[var(--sending-orange-hover)]"
                >
                  Save My Spot
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
