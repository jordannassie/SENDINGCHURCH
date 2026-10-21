"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ActionButton } from "@/components/leads/ActionButton";
import { CsvImport } from "@/components/leads/CsvImport";
import { firstName, pageRange } from "@/lib/leads/csv";
import { PAGE_SIZE, type SendingLead } from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/client";

export function LeadTracker({ signedIn, isAdmin }: { signedIn: boolean; isAdmin: boolean }) {
  const [leads, setLeads] = useState<SendingLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    const supabase = createClient();
    const { from, to } = pageRange(page, PAGE_SIZE);
    const { data, error: readError, count } = await supabase
      .from("sending_leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (readError) {
      const missing = /schema cache|could not find the table/i.test(readError.message);
      setError(
        missing
          ? "The sending_leads table is not in this Supabase project yet."
          : readError.message,
      );
      setLeads([]);
      setLoading(false);
      return;
    }
    setLeads((data ?? []) as SendingLead[]);
    setTotal(count ?? 0);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  async function persist(lead: SendingLead, patch: Partial<SendingLead>) {
    setSavingId(lead.id);
    setError("");
    setLeads((current) => current.map((item) => (item.id === lead.id ? { ...item, ...patch } : item)));
    const supabase = createClient();
    const { error: writeError } = await supabase.from("sending_leads").update(patch).eq("id", lead.id);
    setSavingId(null);
    if (writeError) {
      setLeads((current) => current.map((item) => (item.id === lead.id ? lead : item)));
      setError(writeError.message);
    }
  }

  function toggleDone(lead: SendingLead, checked: boolean) {
    if (checked) {
      void persist(lead, {
        status: "contacted",
        contacted_at: lead.contacted_at ?? new Date().toISOString(),
      });
      return;
    }
    void persist(lead, { status: "new", contacted_at: null });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Frisco Bible Group Leads.</h1>
      <div className="mt-6">
        <CsvImport signedIn={signedIn} isAdmin={isAdmin} onImported={() => void load()} />
      </div>
      {error ? (
        <p className="mt-4 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm text-[#9a3412]" role="alert">
          {error}
        </p>
      ) : null}
      {loading ? <p className="mt-6 text-sm text-[#666]">Loading leads…</p> : null}
      {!loading && leads.length === 0 ? (
        <p className="mt-6 text-sm text-[#666]">No leads yet.</p>
      ) : null}
      {leads.length > 0 ? (
        <ul className="mt-4 divide-y divide-black/5 rounded-3xl border border-black/10 bg-white">
          {leads.map((lead) => (
            <li key={lead.id}>
              <LeadRow
                lead={lead}
                saving={savingId === lead.id}
                onDone={(checked) => toggleDone(lead, checked)}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {total > PAGE_SIZE ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <ActionButton tone="secondary" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>
            Previous
          </ActionButton>
          <span>
            Page {page + 1} of {pageCount}
          </span>
          <ActionButton
            tone="secondary"
            disabled={page + 1 >= pageCount}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </ActionButton>
        </div>
      ) : null}
    </div>
  );
}

function LeadRow({
  lead,
  saving,
  onDone,
}: {
  lead: SendingLead;
  saving: boolean;
  onDone: (checked: boolean) => void;
}) {
  const name = firstName(lead.full_name);
  const phone = lead.phone_normalized || lead.phone;

  return (
    <div className="flex items-center gap-3 px-4 py-3 sm:gap-6">
      <label className="flex h-11 w-11 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          className="h-6 w-6"
          checked={lead.status !== "new"}
          disabled={saving}
          aria-label={`Done with ${name}`}
          onChange={(event) => onDone(event.target.checked)}
        />
      </label>
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <span className="truncate text-base font-medium">{name}</span>
          <CopyButton value={name} label={`Copy first name ${name}`} />
        </div>
        <div className="flex items-center gap-1 sm:w-44">
          <span className="tabular-nums">{phone}</span>
          <CopyButton value={phone} label={`Copy phone number ${phone}`} />
        </div>
      </div>
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--sending-orange)]"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        });
      }}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
    </button>
  );
}
