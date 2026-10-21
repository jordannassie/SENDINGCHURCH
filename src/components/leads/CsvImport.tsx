"use client";

import { useState } from "react";
import { ActionButton } from "@/components/leads/ActionButton";
import { createClient } from "@/lib/supabase/client";
import {
  analyzeCsv,
  mappingIsComplete,
  missingMappingLabels,
  type ColumnMapping,
  type CsvAnalysis,
  type LeadField,
} from "@/lib/leads/csv";
import { importLeads, importSummaryText } from "@/lib/leads/import";
import { formatUsPhone } from "@/lib/leads/phone";
import { UPSERT_OPTIONS, type ParsedLead } from "@/lib/leads/types";

const FIELD_LABELS: Record<LeadField, string> = {
  full_name: "Full name",
  first_name: "First name",
  last_name: "Last name",
  phone: "Phone",
  email: "Email",
  lead_id: "Meta lead id",
  created_time: "Created time",
};

export function CsvImport({
  userId,
  onImported,
}: {
  userId: string;
  onImported: () => void;
}) {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<CsvAnalysis | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [retryLeads, setRetryLeads] = useState<ParsedLead[]>([]);

  function loadText(name: string, contents: string) {
    setFileName(name);
    setText(contents);
    setSummary("");
    setErrors([]);
    setRetryLeads([]);
    const next = analyzeCsv(contents);
    setAnalysis(next);
    setMapping(next.mapping);
  }

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => loadText(file.name, String(reader.result ?? ""));
    reader.readAsText(file);
  }

  function useMapping() {
    if (!text) return;
    const next = analyzeCsv(text, mapping);
    setAnalysis(next);
  }

  async function save(leads: ParsedLead[], fileDuplicates: number, invalid: number) {
    if (!fileName || leads.length === 0) return;
    setBusy(true);
    setErrors([]);
    const supabase = createClient();
    const result = await importLeads(
      {
        upsertLeads: async (rows) => {
          const { data, error } = await supabase
            .from("sending_leads")
            .upsert(rows, UPSERT_OPTIONS)
            .select("id");
          return {
            data,
            error: error ? { message: error.message } : null,
          };
        },
      },
      leads,
      fileName,
      userId,
      fileDuplicates,
      invalid,
    );
    setSummary(importSummaryText(result));
    setErrors(result.errors);
    setRetryLeads(result.failedLeads);
    setBusy(false);
    if (result.added > 0) onImported();
  }

  const ready = analysis && !analysis.needsMapping;

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
      <h2 className="text-lg font-semibold">Import Meta CSV</h2>
      <p className="mt-1 text-sm text-[#666]">
        Drop the leads download here. Existing people are skipped, so notes and
        contact status stay as they are.
      </p>
      <label
        className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-[#fafafa] px-4 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          if (file) readFile(file);
        }}
      >
        <span className="text-sm font-medium">Drag a CSV here</span>
        <span className="mt-2 text-sm text-[var(--sending-orange)]">Browse files</span>
        <input
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          aria-label="Choose a Meta leads CSV"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) readFile(file);
          }}
        />
      </label>

      {analysis?.needsMapping ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-[#9a3412]">
            Choose the columns for{" "}
            {missingMappingLabels(mapping).join(" and ") || "the unclear headers"}.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(FIELD_LABELS) as LeadField[]).map((field) => (
              <label key={field} className="text-sm">
                <span className="mb-1 block text-[#666]">{FIELD_LABELS[field]}</span>
                <select
                  className="w-full rounded-xl border border-black/10 px-3 py-2"
                  value={mapping[field] ?? ""}
                  onChange={(event) =>
                    setMapping((current) => ({
                      ...current,
                      [field]: event.target.value || undefined,
                    }))
                  }
                >
                  <option value="">Skip</option>
                  {analysis.headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <ActionButton disabled={!mappingIsComplete(mapping)} onClick={useMapping}>
            Preview rows
          </ActionButton>
        </div>
      ) : null}

      {ready ? (
        <div className="mt-4">
          <p className="text-sm text-[#444]">
            {fileName}: {analysis.valid.length} ready · {analysis.fileDuplicateCount}{" "}
            repeated in the file · {analysis.invalid.length} invalid · {analysis.blankCount}{" "}
            blank
            {analysis.emailWarningCount
              ? ` · ${analysis.emailWarningCount} emails left blank`
              : ""}
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[#777]">
                <tr>
                  <th className="py-2 font-medium">Name</th>
                  <th className="py-2 font-medium">Phone</th>
                  <th className="py-2 font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {analysis.preview.map((lead) => (
                  <tr key={lead.rowNumber} className="border-t border-black/5">
                    <td className="py-2">{lead.fullName}</td>
                    <td className="py-2">{formatUsPhone(lead.phone)}</td>
                    <td className="py-2">
                      {lead.email ?? lead.emailWarning ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {analysis.invalid.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-[#9a3412]">
              {analysis.invalid.map((row) => (
                <li key={`${row.rowNumber}-${row.reason}`}>
                  Row {row.rowNumber}: {row.reason}
                </li>
              ))}
            </ul>
          ) : null}
          <ActionButton
            className="mt-4"
            disabled={busy || analysis.valid.length === 0}
            onClick={() =>
              save(analysis.valid, analysis.fileDuplicateCount, analysis.invalid.length)
            }
          >
            {busy ? "Saving…" : "Save new leads"}
          </ActionButton>
        </div>
      ) : null}

      {summary ? <p className="mt-4 text-sm font-medium">{summary}</p> : null}
      {errors.map((error) => (
        <p key={error} className="mt-2 text-sm text-[#9a3412]">
          {error}
        </p>
      ))}
      {retryLeads.length > 0 ? (
        <ActionButton tone="secondary" className="mt-3" disabled={busy} onClick={() => save(retryLeads, 0, 0)}>
          Retry {retryLeads.length} failed
        </ActionButton>
      ) : null}
    </section>
  );
}
