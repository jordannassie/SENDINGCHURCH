const STATEMENTS = [
  "Not just believe — obey.",
  "Not just attend — participate.",
  "Not just stay — be sent.",
];

export function WhyWeExist() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">
          Why We Exist
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          We Exist to Move People From Saved to Sent.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#666]">
          Too many believers want more than simply showing up. They want to
          grow, make disciples, live on mission, and help others follow Jesus.
          Sending gives ordinary people a simple path to be trained, equipped,
          and sent.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STATEMENTS.map((line) => (
            <p
              key={line}
              className="text-lg font-semibold tracking-tight text-[#111]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
