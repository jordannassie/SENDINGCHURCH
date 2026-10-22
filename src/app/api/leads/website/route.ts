import { NextResponse } from "next/server";
import { withoutLeadNameColumns } from "@/lib/leads/csv";
import { UPSERT_OPTIONS } from "@/lib/leads/types";
import { websiteLeadRows, type WebsiteSignup } from "@/lib/leads/website";
import { createClient } from "@/lib/supabase/server";

const MAX_SIGNUPS = 100;

function incomingSignup(value: unknown): WebsiteSignup | null {
  if (!value || typeof value !== "object") return null;
  const record = value as { firstName?: unknown; mobile?: unknown; createdAt?: unknown };
  if (typeof record.firstName !== "string" || typeof record.mobile !== "string") return null;
  return {
    firstName: record.firstName,
    mobile: record.mobile,
    createdAt: typeof record.createdAt === "string" ? record.createdAt : null,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const incoming = (body as { signups?: unknown }).signups;
  if (!Array.isArray(incoming)) return NextResponse.json({ ok: false }, { status: 400 });

  const signups = incoming
    .slice(0, MAX_SIGNUPS)
    .map(incomingSignup)
    .filter((signup): signup is WebsiteSignup => signup !== null);
  const rows = websiteLeadRows(signups);
  if (rows.length === 0) return NextResponse.json({ ok: false }, { status: 400 });

  const supabase = await createClient();
  const write = async (payload: Record<string, unknown>[]) => {
    const { error } = await supabase.from("sending_leads").upsert(payload, UPSERT_OPTIONS);
    return { error };
  };

  let result = await write(rows);
  if (result.error && /first_name|last_name/i.test(result.error.message)) {
    result = await write(rows.map((row) => withoutLeadNameColumns(row)));
  }
  if (result.error) return NextResponse.json({ ok: false }, { status: 500 });

  return NextResponse.json({ ok: true, phones: rows.map((row) => row.phone) });
}
