"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { DraftCard } from "@/components/queue/draft-card";
import { isWeakEvidence, RUBRIC_LABELS } from "@/lib/format";
import type { Draft, Rubric } from "@/lib/types";

type SortKey = "oldest" | "newest" | "lowest-confidence";

const SORT_LABELS: Record<SortKey, string> = {
  oldest: "Terlama menunggu",
  newest: "Terbaru",
  "lowest-confidence": "Keyakinan terendah",
};

const SORTERS: Record<SortKey, (a: Draft, b: Draft) => number> = {
  oldest: (a, b) => a.created_at.localeCompare(b.created_at),
  newest: (a, b) => b.created_at.localeCompare(a.created_at),
  "lowest-confidence": (a, b) => a.confidence_score - b.confidence_score,
};

const RUBRICS = Object.keys(RUBRIC_LABELS) as Rubric[];

/**
 * Daftar draf menunggu keputusan, lengkap dengan filter rubrik, filter
 * "meragukan", dan pilihan urutan. Semua penyaringan terjadi di sisi klien.
 */
export function DraftList({ drafts, now }: { drafts: Draft[]; now: string }) {
  const [rubric, setRubric] = useState<Rubric | "all">("all");
  const [doubtfulOnly, setDoubtfulOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("oldest");

  const nowDate = useMemo(() => new Date(now), [now]);

  const visible = useMemo(
    () =>
      drafts
        .filter((d) => rubric === "all" || d.rubric === rubric)
        .filter((d) => !doubtfulOnly || isWeakEvidence(d))
        .sort(SORTERS[sort]),
    [drafts, rubric, doubtfulOnly, sort],
  );

  if (drafts.length === 0) {
    return (
      <EmptyState
        title="Antrean bersih. Semua draf sudah diputuskan."
        description="Sistem mengecek berita baru tiap 30 menit. Draf berikutnya akan muncul di sini begitu selesai ditulis dan didesain."
      />
    );
  }

  const countByRubric = (r: Rubric) => drafts.filter((d) => d.rubric === r).length;
  const isFiltered = rubric !== "all" || doubtfulOnly;

  return (
    <section aria-label="Daftar draf menunggu">
      <div className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip active={rubric === "all"} onClick={() => setRubric("all")}>
            Semua · {drafts.length}
          </FilterChip>
          {RUBRICS.map((r) => (
            <FilterChip
              key={r}
              active={rubric === r}
              disabled={countByRubric(r) === 0}
              onClick={() => setRubric(r)}
            >
              {RUBRIC_LABELS[r]} · {countByRubric(r)}
            </FilterChip>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
            <input
              type="checkbox"
              checked={doubtfulOnly}
              onChange={(e) => setDoubtfulOnly(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Hanya meragukan
          </label>
          <label className="flex items-center gap-2">
            <span className="sr-only">Urutkan</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-sm border border-line bg-paper px-2 py-1.5 text-sm"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          size="sm"
          title="Tidak ada draf yang cocok dengan filter."
          description="Coba pilih rubrik lain atau matikan filter meragukan."
          action={
            <button
              type="button"
              onClick={() => {
                setRubric("all");
                setDoubtfulOnly(false);
              }}
              className="rounded-full border border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-paper"
            >
              Hapus filter
            </button>
          }
        />
      ) : (
        <>
          {isFiltered && (
            <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              Menampilkan {visible.length} dari {drafts.length} draf
            </p>
          )}
          <ul>
            {visible.map((draft) => (
              <li key={draft.draft_id}>
                <DraftCard draft={draft} now={nowDate} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function FilterChip({
  active,
  disabled = false,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line"
      }`}
    >
      {children}
    </button>
  );
}
