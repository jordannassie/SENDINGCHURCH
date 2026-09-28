"use client";

import { useRef } from "react";
import { HERO_VIDEO } from "@/lib/demo/data";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function setMuted(muted: boolean) {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    if (!muted) {
      void video.play();
    }
  }

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          className="block w-full rounded-[28px] bg-black"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onMouseEnter={() => setMuted(false)}
          onMouseLeave={() => setMuted(true)}
          aria-label="Sending Church video"
        />
      </div>
    </section>
  );
}
