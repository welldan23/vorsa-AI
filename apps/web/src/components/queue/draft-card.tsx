import { ConfidenceBadge } from "@/components/queue/confidence-badge";
import { DraftThumbnail } from "@/components/queue/draft-thumbnail";
import { StatusBadge } from "@/components/queue/status-badge";
import { formatTime, formatWaitingTime, RUBRIC_LABELS, TEMPLATE_LABELS } from "@/lib/format";
import type { Draft } from "@/lib/types";

export function DraftCard({
  draft,
  now,
  selected = false,
  onSelect,
}: {
  draft: Draft;
  now: Date;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const inRevision = draft.status === "revision";

  return (
    <article
      className={`relative -mx-3 grid grid-cols-[96px_1fr] gap-4 rounded-sm border-b border-line px-3 py-5 transition-colors sm:grid-cols-[132px_1fr] sm:gap-6 ${
        selected ? "bg-ink/[0.04]" : onSelect ? "hover:bg-ink/[0.02]" : ""
      }`}
    >
      {selected && <span aria-hidden className="absolute top-5 bottom-5 left-0 w-0.5 bg-accent" />}
      <div className={inRevision ? "opacity-50 grayscale" : undefined}>
        <DraftThumbnail draft={draft} />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          <StatusBadge status={draft.status} />
          <span className="font-semibold text-accent">{RUBRIC_LABELS[draft.rubric]}</span>
          <span>{TEMPLATE_LABELS[draft.template]}</span>
          {draft.version > 1 && <span>Versi {draft.version}</span>}
        </div>

        <h2 className="text-lg leading-snug font-extrabold tracking-tight text-balance sm:text-xl">
          {onSelect ? (
            // Area klik direntangkan ke seluruh kartu lewat pseudo-element.
            <button
              type="button"
              onClick={onSelect}
              aria-expanded={selected}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
            >
              {draft.headline}
            </button>
          ) : (
            draft.headline
          )}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink/75">{draft.caption}</p>

        {inRevision && draft.revision_note && (
          <p className="border-l-2 border-revise pl-3 text-sm text-ink/80">
            <span className="font-semibold text-revise">Catatan revisi:</span> {draft.revision_note}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted">
          <ConfidenceBadge score={draft.confidence_score} doubtful={draft.is_doubtful} />
          <span>{draft.sources.length} sumber</span>
          <span>
            Masuk {formatTime(draft.created_at)} · menunggu {formatWaitingTime(draft.created_at, now)}
          </span>
        </div>
      </div>
    </article>
  );
}
