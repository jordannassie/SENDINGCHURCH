import { NextResponse } from "next/server";
import { importLeads } from "@/lib/leads/import";
import { splitLeadName, withoutCategoryColumns, withoutLeadNameColumns, missingCategoryColumn } from "@/lib/leads/csv";
import { parseEmail, cleanLeadPhone } from "@/lib/leads/phone";
import { LEGACY_UPSERT_OPTIONS, UPSERT_OPTIONS, leadCategory, type LeadCategory, type ParsedLead } from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/server";

type IncomingLead = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string | null;
  email?: string | null;
  metaLeadId?: string | null;
  leadCreatedAt?: string | null;
  rowNumber?: number;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = (await request.json()) as { fileName?: string; category?: string; leads?: IncomingLead[] };
  const fileName = body.fileName?.trim() || "leads.csv";
  const category: LeadCategory = leadCategory(body.category);
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
      location: lead.location?.trim() ? lead.location.trim().slice(0, 300) : null,
      email: email.email,
      emailWarning: email.warning,
      metaLeadId: lead.metaLeadId?.trim() || null,
      leadCreatedAt: lead.leadCreatedAt ?? null,
    });
  });

  const summary = await importLeads(
    {
      upsertLeads: async (rows) => {
        const write = async (
          payload: Record<string, unknown>[],
          options: typeof UPSERT_OPTIONS | typeof LEGACY_UPSERT_OPTIONS,
        ) => {
          const { data, error } = await supabase.from("sending_leads").upsert(payload, options).select("id");
          return { data, error };
        };
        let payload: Record<string, unknown>[] = rows;
        let options: typeof UPSERT_OPTIONS | typeof LEGACY_UPSERT_OPTIONS = UPSERT_OPTIONS;
        let result = await write(payload, options);
        if (result.error && category === "join" && missingCategoryColumn(result.error.message)) {
          payload = payload.map((row) => withoutCategoryColumns(row));
          options = LEGACY_UPSERT_OPTIONS;
          result = await write(payload, options);
        }
        if (result.error && /first_name|last_name/i.test(result.error.message)) {
          payload = payload.map((row) => withoutLeadNameColumns(row));
          result = await write(payload, options);
        }
        return { data: result.data, error: result.error ? { message: result.error.message } : null };
      },
    },
    leads,
    fileName,
    0,
    rejected.length,
    category,
  );

  return NextResponse.json({ ...summary, rejected });
}
