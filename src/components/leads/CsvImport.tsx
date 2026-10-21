"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { analyzeCsv, decodeLeadFile, missingMappingLabels, toInsertRow } from "@/lib/leads/csv";
import { databaseFailureText, importLeads, importSummaryText } from "@/lib/leads/import";
import { UPSERT_OPTIONS } from "@/lib/leads/types";

export function CsvImport({ onImported }: { onImported: () => void }) {
  const [summary, setSummary] = useState("");
  const [rowProblems, setRowProblems] = useState<string[]>([]);
  const [databaseProblem, setDatabaseProblem] = useState("");
  const [busy, setBusy] = useState(false);

  async function importText(fileName: string, text: string) {
    setBusy(true);
    setSummary("");
    setRowProblems([]);
    setDatabaseProblem("");
    const analysis = analyzeCsv(text);
    if (analysis.needsMapping) {
      setRowProblems(missingMappingLabels(analysis.mapping).map((label) => `Couldn't find a ${label} column.`));
      setBusy(false);
      return;
    }

    const problemsForRows = analysis.invalid.map((row) => `Row ${row.rowNumber}: ${row.reason}`);
    if (analysis.valid.length === 0) {
      const duplicates = analysis.fileDuplicateCount;
      if (duplicates > 0) setSummary(`0 added · ${duplicates} duplicates skipped`);
      setRowProblems(problemsForRows);
      setBusy(false);
      return;
    }

    const supabase = createClient();
    const result = await importLeads(
      {
        upsertLeads: async (rows: ReturnType<typeof toInsertRow>[]) => {
          const { data, error } = await supabase
            .from("sending_leads")
            .upsert(rows, UPSERT_OPTIONS)
            .select("id");
          return { data, error: error ? { message: error.message } : null };
        },
      },
      analysis.valid,
      fileName,
      null,
      analysis.fileDuplicateCount,
      analysis.invalid.length,
    );

    const duplicates = result.fileDuplicates + result.existingDuplicates;
    const savedSomething = result.added > 0 || duplicates > 0;
    if (result.failed > 0) {
      setDatabaseProblem(databaseFailureText(result.errors));
    }
    if (savedSomething) setSummary(importSummaryText(result));
    setRowProblems(problemsForRows);
    setBusy(false);
    if (result.added > 0) onImported();
  }

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      void importText(file.name, decodeLeadFile(bytes));
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <section>
      <label
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-black/15 bg-white px-4 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          if (file) readFile(file);
        }}
      >
        <span className="text-base font-medium">{busy ? "Importing…" : "Drop a Meta leads CSV"}</span>
        <span className="mt-2 text-sm text-[var(--sending-orange)]">or tap to choose a file</span>
        <input
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          aria-label="Choose a Meta leads CSV"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) readFile(file);
          }}
        />
      </label>
      {summary ? <p className="mt-4 text-sm font-medium">{summary}</p> : null}
      {databaseProblem ? (
        <p className="mt-3 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm text-[#9a3412]" role="alert">
          {databaseProblem}
        </p>
      ) : null}
      {rowProblems.length > 0 ? (
        <div className="mt-3 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm text-[#9a3412]" role="alert">
          <p className="font-medium">
            {rowProblems.length} {rowProblems.length === 1 ? "row" : "rows"} could not be read.
          </p>
          <ul className="mt-2 space-y-1">
            {rowProblems.map((problem, index) => (
              <li key={`${index}-${problem}`}>{problem}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
