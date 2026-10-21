import Image from "next/image";

const PROFILE_URL = "https://www.instagram.com/sending_churches/";

const REELS = [
  "DN0pV9F3Nvy",
  "DN0ooUFXL7B",
  "DN0oNKD3Ef_",
  "DFeMYngvw3j",
  "C2OO1rNvN4X",
] as const;

export function InstagramReels() {
  return (
    <section aria-labelledby="reels-heading" className="bg-[#f7f6f4]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src="/sending-logo.png"
                alt=""
                width={2001}
                height={447}
                className="absolute top-1/2 left-0 h-11 w-auto max-w-none -translate-y-1/2"
              />
            </span>
            <h2 id="reels-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Reels
            </h2>
          </div>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[var(--sending-orange)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--sending-orange-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sending-orange)]"
          >
            Follow
          </a>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {REELS.map((code, index) => (
            <div
              key={code}
              className="h-[481px] w-[385px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-black"
            >
              <iframe
                src={`https://www.instagram.com/reel/${code}/embed`}
                title={`Sending Churches reel ${index + 1}`}
                loading="lazy"
                scrolling="no"
                className="h-[700px] w-[385px] max-w-none border-0"
                style={{ marginTop: -54 }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
