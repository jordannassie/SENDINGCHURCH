import { NextResponse } from "next/server";
import { importLeads } from "@/lib/leads/import";
import { splitLeadName, withoutLeadNameColumns } from "@/lib/leads/csv";
import { parseEmail, cleanLeadPhone } from "@/lib/leads/phone";
import { UPSERT_OPTIONS, type ParsedLead } from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/server";

type IncomingLead = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string | null;
  metaLeadId?: string | null;
  leadCreatedAt?: string | null;
  rowNumber?: number;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = (await request.json()) as { fileName?: string; leads?: IncomingLead[] };
  const fileName = body.fileName?.trim() || "leads.csv";
  const incoming = Array.isArray(body.leads) ? body.leads : [];
  const leads: ParsedLead[] = [];
  const rejected: string[] = [];

  incoming.forEach((lead, index) => {
    const provided = lead.firstName != null || lead.lastName != null;
    const name = provided
      ? { firstName: lead.firstName?.trim() ?? "", lastName: lead.lastName?.trim() ?? "" }
      : splitLeadName(lead.fullName ?? "");
    const fullName = [name.firstName, name.lastName].filter(Boolean).join(" ");
    const phone = cleanLeadPhone(lead.phone ?? "");
    if ((!name.firstName && !name.lastName) || !phone.ok) {
      rejected.push(`Row ${lead.rowNumber ?? index + 2} could not be saved.`);
      return;
    }
    const email = parseEmail(lead.email ?? "");
    leads.push({
      rowNumber: lead.rowNumber ?? index + 2,
      fullName,
      firstName: name.firstName,
      lastName: name.lastName,
      phone: phone.phone,
      email: email.email,
      emailWarning: email.warning,
      metaLeadId: lead.metaLeadId?.trim() || null,
      leadCreatedAt: lead.leadCreatedAt ?? null,
    });
  });

  const summary = await importLeads(
    {
      upsertLeads: async (rows) => {
        const write = async (payload: Record<string, unknown>[]) => {
          const { data, error } = await supabase.from("sending_leads").upsert(payload, UPSERT_OPTIONS).select("id");
          return { data, error };
        };
        let result = await write(rows);
        if (result.error && /first_name|last_name/i.test(result.error.message)) {
          result = await write(rows.map((row) => withoutLeadNameColumns(row)));
        }
        return { data: result.data, error: result.error ? { message: result.error.message } : null };
      },
    },
    leads,
    fileName,
    0,
    rejected.length,
  );

  return NextResponse.json({ ...summary, rejected });
}
