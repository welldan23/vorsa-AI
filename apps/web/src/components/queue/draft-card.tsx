import { ConfidenceBadge } from "@/components/queue/confidence-badge";
import { DraftThumbnail } from "@/components/queue/draft-thumbnail";
import { formatTime, formatWaitingTime, RUBRIC_LABELS, TEMPLATE_LABELS } from "@/lib/format";
import type { Draft } from "@/lib/types";

export function DraftCard({ draft, now }: { draft: Draft; now: Date }) {
  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[132px_1fr] sm:gap-6">
      <DraftThumbnail draft={draft} />

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          <span className="font-semibold text-accent">{RUBRIC_LABELS[draft.rubric]}</span>
          <span>{TEMPLATE_LABELS[draft.template]}</span>
          {draft.version > 1 && <span>Versi {draft.version}</span>}
        </div>

        <h2 className="text-lg leading-snug font-extrabold tracking-tight text-balance sm:text-xl">
          {draft.headline}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink/75">{draft.caption}</p>

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
