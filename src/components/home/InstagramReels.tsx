const REELS_URL = "https://www.instagram.com/sending_churches/reels/";

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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#9a9a9a]">INSTAGRAM</p>
            <h2 id="reels-heading" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Reels
            </h2>
          </div>
          <a
            href={REELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-sm font-medium text-[var(--sending-orange)] hover:text-[var(--sending-orange-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sending-orange)]"
          >
            See all reels
          </a>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {REELS.map((code, index) => (
            <iframe
              key={code}
              src={`https://www.instagram.com/reel/${code}/embed`}
              title={`Sending Churches reel ${index + 1}`}
              loading="lazy"
              scrolling="no"
              className="h-[540px] w-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-white"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
