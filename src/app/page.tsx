import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function getSupabaseStatus() {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "Missing NEXT_PUBLIC_SUPABASE_URL or key" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: "Connected" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not reach Supabase",
    };
  }
}

export default async function HomePage() {
  const supabase = await getSupabaseStatus();

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="sans text-xs tracking-[0.28em] uppercase text-[#d4b56a]">
          Sending Church
        </p>
        <h1 className="mt-5 text-5xl leading-tight">
          Go into all the world
          <br />
          and preach the gospel.
        </h1>
        <p className="sans mt-6 max-w-xl text-base leading-relaxed text-[#9aa3b5]">
          Next.js is running. Supabase env is wired for local development and
          Netlify. This is the starting point for the church site.
        </p>

        <div className="sans mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs tracking-[0.18em] uppercase text-[#9aa3b5]">
            Supabase
          </p>
          <p className="mt-2 text-lg">
            {supabase.ok ? "Connected" : "Not connected"}
          </p>
          <p className="mt-1 text-sm text-[#9aa3b5]">{supabase.message}</p>
        </div>
      </div>
    </main>
  );
}
