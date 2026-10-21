import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { LeadTracker } from "@/components/leads/LeadTracker";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function AccessDenied() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5">
      <Logo />
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">Access denied</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#666]">
        This Google account is not on the Sending lead admin list. Leads stay
        private.
      </p>
      <Link href="/" className="mt-6 text-sm font-medium text-[var(--sending-orange)]">
        Back to Sending
      </Link>
    </main>
  );
}

function ConfigError({ detail }: { detail?: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5">
      <Logo />
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">Leads are not configured</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#666]">
        Set NEXT_PUBLIC_SUPABASE_URL and the anon key, enable the Google
        provider, and allow https://sending.church/auth/callback as a redirect
        URL. Add your user id to public.sending_lead_admins from the Supabase
        SQL editor. People cannot add themselves.
      </p>
      {detail ? (
        <p className="mt-4 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm text-[#9a3412]">
          {detail}
        </p>
      ) : null}
    </main>
  );
}

async function loadAdmin(user: User) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sending_lead_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { data, error };
}

export default async function LeadsPage() {
  if (!isSupabaseConfigured()) return <ConfigError />;

  const supabase = await createClient();
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) {
    redirect("/login?next=/dashboard/leads");
  }

  const { data, error } = await loadAdmin(auth.user);
  if (error) {
    const denied =
      error.code === "42501" || /permission denied|row-level security/i.test(error.message);
    if (denied) return <AccessDenied />;
    const missing =
      error.code === "42P01" ||
      error.code === "PGRST205" ||
      /sending_lead_admins/i.test(error.message);
    return (
      <ConfigError
        detail={
          missing
            ? "The sending_lead_admins table is missing. Run the supplied SQL in the Supabase SQL editor, then add your user id. The site cannot add you."
            : "Could not verify lead access. Confirm Row Level Security lets an admin read their own sending_lead_admins row."
        }
      />
    );
  }

  if (!data) return <AccessDenied />;

  return <LeadTracker email={auth.user.email ?? ""} userId={auth.user.id} />;
}
