"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ActionButton } from "@/components/leads/ActionButton";
import { CsvImport } from "@/components/leads/CsvImport";
import { leadNameFields, pageRange, sortLeadsForList, storedLeadName, withoutLeadNameColumns } from "@/lib/leads/csv";
import { PAGE_SIZE, type SendingLead } from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/client";

export function LeadTracker() {
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
    setLeads(sortLeadsForList((data ?? []) as SendingLead[]));
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
    setLeads((current) =>
      sortLeadsForList(current.map((item) => (item.id === lead.id ? { ...item, ...patch } : item))),
    );
    const supabase = createClient();
    const write = (body: Partial<SendingLead>) =>
      supabase.from("sending_leads").update(body).eq("id", lead.id);
    let { error: writeError } = await write(patch);
    if (writeError && /first_name|last_name/i.test(writeError.message)) {
      ({ error: writeError } = await write(withoutLeadNameColumns(patch)));
    }
    setSavingId(null);
    if (writeError) {
      setLeads((current) => sortLeadsForList(current.map((item) => (item.id === lead.id ? lead : item))));
      setError(writeError.message);
    }
  }

  function saveNames(lead: SendingLead, firstName: string, lastName: string) {
    const current = leadNameFields(lead);
    if (firstName === current.firstName && lastName === current.lastName) return;
    void persist(lead, {
      full_name: storedLeadName(firstName, lastName),
      first_name: firstName,
      last_name: lastName,
    });
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
        <CsvImport onImported={() => void load()} />
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
        <div className="mt-4 overflow-x-auto rounded-3xl border border-black/10 bg-white">
          <div className="grid grid-cols-[3.5rem_1fr_1fr] gap-2 border-b border-black/5 px-3 py-2 text-xs font-medium uppercase tracking-wide text-[#666]">
            <span>Done</span>
            <span>First name</span>
            <span>Phone</span>
          </div>
          <ul className="divide-y divide-black/5">
            {leads.map((lead) => (
              <li key={lead.id}>
                <LeadRow
                  key={leadNameFields(lead).firstName}
                  lead={lead}
                  saving={savingId === lead.id}
                  onDone={(checked) => toggleDone(lead, checked)}
                  onSaveName={(firstName) => saveNames(lead, firstName, leadNameFields(lead).lastName)}
                />
              </li>
            ))}
          </ul>
        </div>
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
  onSaveName,
}: {
  lead: SendingLead;
  saving: boolean;
  onDone: (checked: boolean) => void;
  onSaveName: (firstName: string) => void;
}) {
  const savedName = leadNameFields(lead).firstName;
  const [firstName, setFirstName] = useState(savedName);
  const phone = lead.phone;

  return (
    <div className="grid grid-cols-[3.5rem_1fr_1fr] items-center gap-2 px-3 py-2">
      <label className="flex h-11 w-11 items-center justify-center">
        <input
          type="checkbox"
          className="h-6 w-6"
          checked={lead.status !== "new"}
          disabled={saving}
          aria-label={`Done with ${firstName || "lead"}`}
          onChange={(event) => onDone(event.target.checked)}
        />
      </label>
      <Field
        value={firstName}
        label="First name"
        onChange={setFirstName}
        onCommit={() => onSaveName(firstName.trim())}
        disabled={saving}
      />
      <div className="flex min-w-0 items-center gap-1">
        <span className="min-w-0 flex-1 tabular-nums">{phone}</span>
        <CopyButton value={phone} label={`Copy phone ${phone}`} />
      </div>
    </div>
  );
}

function Field({
  value,
  label,
  onChange,
  onCommit,
  disabled,
}: {
  value: string;
  label: string;
  onChange: (value: string) => void;
  onCommit: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <input
        value={value}
        aria-label={label}
        disabled={disabled}
        className="min-w-0 flex-1 rounded-xl bg-transparent px-2 py-2 text-base outline-none focus:bg-black/[0.03]"
        onChange={(event) => onChange(event.target.value)}
        onBlur={onCommit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
      />
      <CopyButton value={value} label={`Copy ${label.toLowerCase()} ${value}`} />
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
