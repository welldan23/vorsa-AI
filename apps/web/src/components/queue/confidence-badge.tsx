import { formatPercent, LOW_CONFIDENCE_THRESHOLD } from "@/lib/format";

export function ConfidenceBadge({ score, doubtful }: { score: number; doubtful: boolean }) {
  const weak = doubtful || score < LOW_CONFIDENCE_THRESHOLD;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ${
        weak ? "bg-warn/10 text-warn" : "bg-ok/10 text-ok"
      }`}
      title="Skor keyakinan hasil riset & cek fakta"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${weak ? "bg-warn" : "bg-ok"}`} />
      {weak ? "Meragukan" : "Fakta"} · {formatPercent(score)}
    </span>
  );
}
