import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LeadTracker } from "@/components/leads/LeadTracker";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function ConfigError() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-5">
      <h1 className="text-3xl font-semibold tracking-tight">Leads are not configured</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#666]">
        Set NEXT_PUBLIC_SUPABASE_URL and the anon key so this page can reach
        the leads table.
      </p>
    </main>
  );
}

export default async function CsvPage() {
  let signedIn = false;
  let isAdmin = false;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getUser();
    signedIn = Boolean(auth.user);
    if (auth.user) {
      const { data: admin } = await supabase
        .from("sending_lead_admins")
        .select("user_id")
        .eq("user_id", auth.user.id)
        .maybeSingle();
      isAdmin = Boolean(admin);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--sending-bg)] px-5 py-8">
        {isSupabaseConfigured() ? (
          <LeadTracker signedIn={signedIn} isAdmin={isAdmin} />
        ) : (
          <ConfigError />
        )}
      </main>
      <SiteFooter />
    </>
  );
}
