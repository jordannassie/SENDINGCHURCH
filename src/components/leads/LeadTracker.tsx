"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ActionButton } from "@/components/leads/ActionButton";
import { CsvImport } from "@/components/leads/CsvImport";
import { invitationText, leadSearchOr, leadsToCsv, pageRange, phonesForBulkCopy } from "@/lib/leads/csv";
import { formatChicago } from "@/lib/leads/dates";
import { formatUsPhone } from "@/lib/leads/phone";
import {
  DEFAULT_INVITATION,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  PAGE_SIZE,
  type LeadStatus,
  type SendingLead,
} from "@/lib/leads/types";
import { createClient } from "@/lib/supabase/client";

const FILTERS = ["new", "all", "contacted", "coming", "attended", "do_not_contact"] as const;
type Filter = (typeof FILTERS)[number];

const TEMPLATE_KEY = "sending-lead-invitation";

function subscribeToTemplate(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readTemplate() {
  return window.localStorage.getItem(TEMPLATE_KEY) || DEFAULT_INVITATION;
}

function checkedStatus(status: LeadStatus) {
  return status !== "new";
}

export function LeadTracker({ email, userId }: { email: string; userId: string }) {
  const [leads, setLeads] = useState<SendingLead[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({ total: 0, new: 0, contacted: 0, coming: 0, attended: 0 });
  const [filter, setFilter] = useState<Filter>("new");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const storedTemplate = useSyncExternalStore(subscribeToTemplate, readTemplate, () => DEFAULT_INVITATION);
  const [templateDraft, setTemplateDraft] = useState<string | null>(null);
  const template = templateDraft ?? storedTemplate;
  const [savingId, setSavingId] = useState<string | null>(null);
  const [resetLead, setResetLead] = useState<SendingLead | null>(null);
  const [notice, setNotice] = useState("");
  const searchTimer = useRef<number | null>(null);

  const load = useCallback(async () => {
    setError("");
    const supabase = createClient();
    const searchOr = leadSearchOr(query);
    let request = supabase.from("sending_leads").select("*", { count: "exact" });
    if (filter !== "all") request = request.eq("status", filter);
    if (searchOr) request = request.or(searchOr);
    const { from, to } = pageRange(page, PAGE_SIZE);
    const [pageResult, totalResult, newResult, contactedResult, comingResult, attendedResult] =
      await Promise.all([
        request.order("created_at", { ascending: false }).range(from, to),
        supabase.from("sending_leads").select("id", { count: "exact", head: true }),
        supabase.from("sending_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase
          .from("sending_leads")
          .select("id", { count: "exact", head: true })
          .eq("status", "contacted"),
        supabase.from("sending_leads").select("id", { count: "exact", head: true }).eq("status", "coming"),
        supabase
          .from("sending_leads")
          .select("id", { count: "exact", head: true })
          .eq("status", "attended"),
      ]);

    if (pageResult.error) {
      setError(pageResult.error.message);
      setLeads([]);
      setLoading(false);
      return;
    }
    setLeads((pageResult.data ?? []) as SendingLead[]);
    setTotal(pageResult.count ?? 0);
    setCounts({
      total: totalResult.count ?? 0,
      new: newResult.count ?? 0,
      contacted: contactedResult.count ?? 0,
      coming: comingResult.count ?? 0,
      attended: attendedResult.count ?? 0,
    });
    setLoading(false);
  }, [filter, page, query]);

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
      current.map((item) => (item.id === lead.id ? { ...item, ...patch } : item)),
    );
    const supabase = createClient();
    const { error: writeError } = await supabase.from("sending_leads").update(patch).eq("id", lead.id);
    setSavingId(null);
    if (writeError) {
      setLeads((current) => current.map((item) => (item.id === lead.id ? lead : item)));
      setError(writeError.message);
      return;
    }
    void load();
  }

  function changeStatus(lead: SendingLead, status: LeadStatus) {
    if (status === "new" && lead.status !== "new") {
      setResetLead(lead);
      return;
    }
    const patch: Partial<SendingLead> = { status };
    if (lead.status === "new" && !lead.contacted_at) {
      patch.contacted_at = new Date().toISOString();
    }
    void persist(lead, patch);
  }

  function toggleDone(lead: SendingLead, checked: boolean) {
    if (!checked) {
      setResetLead(lead);
      return;
    }
    if (lead.status === "new") {
      void persist(lead, {
        status: "contacted",
        contacted_at: new Date().toISOString(),
      });
    }
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    setNotice("Copied.");
  }

  const selectedLeads = useMemo(
    () =>
      leads.map((lead) => ({
        phone: lead.phone_normalized || lead.phone,
        status: lead.status,
        selected: selected.includes(lead.id),
      })),
    [leads, selected],
  );

  const bulkPhones = phonesForBulkCopy(selectedLeads, formatUsPhone);

  async function exportFiltered() {
    const supabase = createClient();
    const rows: SendingLead[] = [];
    let exportPage = 0;
    while (true) {
      let request = supabase.from("sending_leads").select("*");
      if (filter !== "all") request = request.eq("status", filter);
      const searchOr = leadSearchOr(query);
      if (searchOr) request = request.or(searchOr);
      const { from, to } = pageRange(exportPage, 1000);
      const { data, error: exportError } = await request
        .order("created_at", { ascending: false })
        .range(from, to);
      if (exportError) {
        setError(exportError.message);
        return;
      }
      rows.push(...((data ?? []) as SendingLead[]));
      if (!data || data.length < 1000) break;
      exportPage += 1;
    }
    const csv = leadsToCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "frisco-bible-group-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function toggleSelected(id: string, checked: boolean) {
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));
  }

  const rowProps = {
    template,
    savingId,
    selected,
    onSelect: toggleSelected,
    onDone: toggleDone,
    onStatus: changeStatus,
    onNotes: (lead: SendingLead, notes: string) => void persist(lead, { notes: notes || null }),
    onCopy: copyText,
  };

  return (
    <DashboardShell variant="leads" accountEmail={email}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight">Frisco Bible Group Leads.</h1>
        <p className="mt-2 text-sm text-[#666]">Signed in as {email}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(
            [
              ["Total", counts.total],
              ["New", counts.new],
              ["Contacted", counts.contacted],
              ["Coming", counts.coming],
              ["Attended", counts.attended],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-black/10 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[#777]">{label}</p>
              <p className="mt-1 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <CsvImport userId={userId} onImported={() => void load()} />
        </div>

        <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5">
          <label className="block text-sm font-medium" htmlFor="invitation">
            Invitation
          </label>
          <textarea
            id="invitation"
            className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 px-3 py-2 text-sm"
            value={template}
            onChange={(event) => {
              setTemplateDraft(event.target.value);
              window.localStorage.setItem(TEMPLATE_KEY, event.target.value);
            }}
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="lead-search">
              Search leads
            </label>
            <input
              id="lead-search"
              value={search}
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
                setPage(0);
                if (searchTimer.current) window.clearTimeout(searchTimer.current);
                searchTimer.current = window.setTimeout(() => setQuery(value), 250);
              }}
              placeholder="Search name, phone, or email"
              className="w-full rounded-full border border-black/10 px-4 py-2 text-sm sm:max-w-sm"
            />
            <ActionButton tone="secondary" onClick={() => void exportFiltered()}>
              Export CSV
            </ActionButton>
            <ActionButton
              tone="secondary"
              disabled={!bulkPhones}
              onClick={() => void copyText(bulkPhones)}
            >
              Copy phone numbers
            </ActionButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Lead status">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                className={`rounded-full px-3 py-1 text-sm ${
                  filter === item ? "bg-[var(--sending-orange)] text-white" : "bg-[#f3f3f3]"
                }`}
                onClick={() => {
                  setFilter(item);
                  setPage(0);
                }}
              >
                {item === "all" ? "All" : LEAD_STATUS_LABELS[item]}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm text-[#9a3412]" role="alert">
            {error}
          </p>
        ) : null}
        {notice ? <p className="mt-3 text-sm text-[#666]">{notice}</p> : null}
        {loading ? <p className="mt-6 text-sm text-[#666]">Loading leads…</p> : null}
        {!loading && leads.length === 0 ? (
          <p className="mt-6 text-sm text-[#666]">No leads in this view.</p>
        ) : null}

        <div className="mt-4 hidden overflow-x-auto rounded-3xl border border-black/10 bg-white md:block">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-[#777]">
              <tr>
                <th className="px-3 py-3 font-medium">Done</th>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Phone</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Notes</th>
                <th className="px-3 py-3 font-medium">Contacted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-black/5 align-top">
                  <td className="px-3 py-3">
                    <DoneBox lead={lead} onDone={rowProps.onDone} />
                    <SelectBox lead={lead} selected={selected.includes(lead.id)} onSelect={toggleSelected} />
                  </td>
                  <td className="px-3 py-3">
                    <NameBlock lead={lead} />
                  </td>
                  <td className="px-3 py-3">
                    <PhoneBlock lead={lead} template={template} onCopy={copyText} />
                  </td>
                  <td className="px-3 py-3">
                    <StatusSelect lead={lead} onStatus={changeStatus} />
                  </td>
                  <td className="px-3 py-3">
                    <NotesField lead={lead} onNotes={rowProps.onNotes} />
                  </td>
                  <td className="px-3 py-3 text-[#666]">
                    {formatChicago(lead.contacted_at) || "Not contacted"}
                    {savingId === lead.id ? " · Saving…" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {leads.map((lead) => (
            <article key={lead.id} className="space-y-3 rounded-3xl border border-black/10 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <DoneBox lead={lead} onDone={rowProps.onDone} />
                <SelectBox lead={lead} selected={selected.includes(lead.id)} onSelect={toggleSelected} />
              </div>
              <NameBlock lead={lead} />
              <PhoneBlock lead={lead} template={template} onCopy={copyText} />
              <StatusSelect lead={lead} onStatus={changeStatus} />
              <NotesField lead={lead} onNotes={rowProps.onNotes} />
              <p className="text-sm text-[#666]">
                {formatChicago(lead.contacted_at) || "Not contacted"}
                {savingId === lead.id ? " · Saving…" : ""}
              </p>
            </article>
          ))}
        </div>

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
      </div>

      {resetLead ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") setResetLead(null);
          }}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6">
            <h2 id="reset-title" className="text-xl font-semibold">
              Reset to New
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              This clears the contacted date for {resetLead.full_name}.
            </p>
            <div className="mt-5 flex gap-2">
              <ActionButton
                onClick={() => {
                  const lead = resetLead;
                  setResetLead(null);
                  void persist(lead, { status: "new", contacted_at: null });
                }}
              >
                Reset to New
              </ActionButton>
              <ActionButton tone="secondary" onClick={() => setResetLead(null)}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}

function DoneBox({
  lead,
  onDone,
}: {
  lead: SendingLead;
  onDone: (lead: SendingLead, checked: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checkedStatus(lead.status)}
        aria-label={`Mark ${lead.full_name} done`}
        onChange={(event) => onDone(lead, event.target.checked)}
      />
      Done
    </label>
  );
}

function SelectBox({
  lead,
  selected,
  onSelect,
}: {
  lead: SendingLead;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
}) {
  return (
    <label className="mt-2 inline-flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        aria-label={`Select ${lead.full_name}`}
        onChange={(event) => onSelect(lead.id, event.target.checked)}
      />
      Select
    </label>
  );
}

function NameBlock({ lead }: { lead: SendingLead }) {
  return (
    <div>
      <p className="font-medium">{lead.full_name}</p>
      {lead.email ? <p className="text-[#666]">{lead.email}</p> : null}
    </div>
  );
}

function PhoneBlock({
  lead,
  template,
  onCopy,
}: {
  lead: SendingLead;
  template: string;
  onCopy: (value: string) => Promise<void>;
}) {
  const digits = lead.phone_normalized || lead.phone;
  const phone = formatUsPhone(digits);
  const blocked = lead.status === "do_not_contact";

  return (
    <div className="space-y-2">
      <p>{phone}</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <button type="button" className="text-[var(--sending-orange)]" onClick={() => void onCopy(phone)}>
          Copy Phone
        </button>
        <a className="text-[var(--sending-orange)]" href={`tel:+1${digits}`}>
          Call
        </a>
        {blocked ? (
          <span className="text-[#999]">Text</span>
        ) : (
          <a className="text-[var(--sending-orange)]" href={`sms:+1${digits}`}>
            Text
          </a>
        )}
        <button
          type="button"
          className="text-[var(--sending-orange)] disabled:text-[#999]"
          disabled={blocked}
          onClick={() => void onCopy(invitationText(template, lead.full_name))}
        >
          Copy Invitation
        </button>
      </div>
    </div>
  );
}

function StatusSelect({
  lead,
  onStatus,
}: {
  lead: SendingLead;
  onStatus: (lead: SendingLead, status: LeadStatus) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="sr-only">Status for {lead.full_name}</span>
      <select
        className="rounded-xl border border-black/10 px-2 py-1"
        value={lead.status}
        onChange={(event) => onStatus(lead, event.target.value as LeadStatus)}
      >
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {LEAD_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </label>
  );
}

function NotesField({
  lead,
  onNotes,
}: {
  lead: SendingLead;
  onNotes: (lead: SendingLead, notes: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="sr-only">Notes for {lead.full_name}</span>
      <textarea
        className="min-h-16 w-full min-w-40 rounded-xl border border-black/10 px-2 py-1"
        defaultValue={lead.notes ?? ""}
        key={`${lead.id}-${lead.updated_at}-${lead.notes ?? ""}`}
        onBlur={(event) => {
          if ((lead.notes ?? "") !== event.target.value) onNotes(lead, event.target.value);
        }}
      />
    </label>
  );
}
