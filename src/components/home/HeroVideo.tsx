"use client";

import { useRef, useState } from "react";
import { HERO_VIDEO } from "@/lib/demo/data";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [buffering, setBuffering] = useState(true);

  function playWhenReady() {
    const video = videoRef.current;
    if (!video) return;
    setReady(true);
    setBuffering(false);
    void video.play();
  }

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
        <div className="relative overflow-hidden rounded-[28px] bg-black aspect-video">
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={playWhenReady}
            onCanPlay={playWhenReady}
            onPlaying={() => setBuffering(false)}
            onWaiting={() => setBuffering(true)}
            onStalled={() => setBuffering(true)}
            onMouseEnter={() => setMuted(false)}
            onMouseLeave={() => setMuted(true)}
            aria-label="Sending Church video"
          />

          {(!ready || buffering) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/70">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[var(--sending-orange)]" />
              <p className="text-sm text-white/70">Loading video…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
