import { DraftList } from "@/components/queue/draft-list";
import { getPendingDrafts } from "@/lib/drafts";
import { formatLongDate, formatPercent, isWeakEvidence } from "@/lib/format";

export async function ApprovalQueue() {
  const drafts = await getPendingDrafts();
  const now = new Date();

  const doubtfulCount = drafts.filter(isWeakEvidence).length;
  const averageConfidence =
    drafts.length > 0
      ? drafts.reduce((sum, d) => sum + d.confidence_score, 0) / drafts.length
      : null;

  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {formatLongDate(now)}
      </p>

      <dl className="mt-6 grid grid-cols-3 border-y border-ink">
        <Stat label="Menunggu" value={String(drafts.length)} />
        <Stat
          label="Meragukan"
          value={String(doubtfulCount)}
          highlight={doubtfulCount > 0}
        />
        <Stat
          label="Rata-rata keyakinan"
          value={averageConfidence === null ? "—" : formatPercent(averageConfidence)}
        />
      </dl>

      <DraftList drafts={drafts} now={now.toISOString()} />
    </>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="border-r border-line px-3 py-4 first:pl-0 last:border-r-0 sm:px-4 sm:py-5 sm:first:pl-0">
      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted sm:text-[11px]">
        {label}
      </dt>
      <dd
        className={`mt-1 text-2xl font-black tracking-tight sm:text-3xl ${highlight ? "text-warn" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
