import { formatPercent, isWeakEvidence } from "@/lib/format";

export function ConfidenceBadge({ score, doubtful }: { score: number; doubtful: boolean }) {
  const weak = isWeakEvidence({ is_doubtful: doubtful, confidence_score: score });

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
