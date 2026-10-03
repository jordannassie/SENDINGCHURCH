const PATH = [
  "Know Jesus",
  "Belong",
  "Grow",
  "Serve",
  "Train",
  "Send",
  "Multiply",
];

export function WhyWeExist() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          Why We Exist
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          We Help People Know Jesus, Grow Stronger, and Live on Mission.
        </h2>
        <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-[#666]">
          <p>Some people come to Sending because they need a church.</p>
          <p>Some need prayer.</p>
          <p>Some want to understand the Bible.</p>
          <p>Some are looking for community.</p>
          <p>
            Others feel called to lead, make disciples, or start churches.
          </p>
          <p>Sending creates a simple path for all of them.</p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {PATH.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-[#eee] bg-white px-4 py-2 text-sm font-semibold tracking-tight">
                {step}
              </span>
              {index < PATH.length - 1 ? (
                <span className="text-[#bbb] sm:inline">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl space-y-1 text-base font-medium tracking-tight text-[#111]">
          <p>Everyone can belong.</p>
          <p>Everyone can grow.</p>
          <p>And those who are ready can be trained and sent.</p>
        </div>
      </div>
    </section>
  );
}
