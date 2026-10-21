import { NextResponse } from "next/server";
import { importLeads } from "@/lib/leads/import";
import { parseEmail, normalizeUsPhone } from "@/lib/leads/phone";
import { UPSERT_OPTIONS, type ParsedLead } from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/server";

type IncomingLead = {
  fullName?: string;
  phone?: string;
  email?: string | null;
  metaLeadId?: string | null;
  leadCreatedAt?: string | null;
  rowNumber?: number;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) {
    return NextResponse.json({ error: "Sign in to import" }, { status: 401 });
  }

  const { data: admin, error: adminError } = await supabase
    .from("sending_lead_admins")
    .select("user_id")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (adminError) {
    return NextResponse.json({ error: adminError.message }, { status: 403 });
  }
  if (!admin) {
    return NextResponse.json({ error: "This account cannot import leads." }, { status: 403 });
  }

  const body = (await request.json()) as { fileName?: string; leads?: IncomingLead[] };
  const fileName = body.fileName?.trim() || "leads.csv";
  const incoming = Array.isArray(body.leads) ? body.leads : [];
  const leads: ParsedLead[] = [];
  const rejected: string[] = [];

  incoming.forEach((lead, index) => {
    const fullName = lead.fullName?.trim() ?? "";
    const phone = normalizeUsPhone(lead.phone ?? "");
    if (!fullName || !phone.ok) {
      rejected.push(`Row ${lead.rowNumber ?? index + 2} could not be saved.`);
      return;
    }
    const email = parseEmail(lead.email ?? "");
    leads.push({
      rowNumber: lead.rowNumber ?? index + 2,
      fullName,
      phone: phone.digits,
      email: email.email,
      emailWarning: email.warning,
      metaLeadId: lead.metaLeadId?.trim() || null,
      leadCreatedAt: lead.leadCreatedAt ?? null,
    });
  });

  const summary = await importLeads(
    {
      upsertLeads: async (rows) => {
        const { data, error } = await supabase
          .from("sending_leads")
          .upsert(rows, UPSERT_OPTIONS)
          .select("id");
        return { data, error: error ? { message: error.message } : null };
      },
    },
    leads,
    fileName,
    auth.user.id,
    0,
    rejected.length,
  );

  return NextResponse.json({ ...summary, rejected });
}
