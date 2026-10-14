import { STATUS_LABELS } from "@/lib/format";
import type { DraftStatus } from "@/lib/types";

const STATUS_STYLES: Record<DraftStatus, string> = {
  pending: "border-accent text-accent",
  revision: "border-revise bg-revise/10 text-revise",
  approved: "border-ok bg-ok/10 text-ok",
  rejected: "border-line bg-line/40 text-muted",
  published: "border-ink bg-ink text-paper",
};

export function StatusBadge({ status }: { status: DraftStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
