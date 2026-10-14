import { TEMPLATE_LABELS } from "@/lib/format";
import type { DesignTemplate, Draft } from "@/lib/types";

// Gaya warna per template, dipakai selama gambar hasil render belum ada.
const TEMPLATE_STYLES: Record<DesignTemplate, string> = {
  news: "bg-paper text-ink border border-line",
  breaking: "bg-accent text-ink",
  carousel: "bg-ink text-paper",
  culture: "bg-[#e9e3d6] text-ink",
  tech: "bg-ink text-paper",
  business: "bg-paper text-ink border border-line",
  tldr: "bg-ink text-accent",
};

/** Miniatur postingan 4:5 (rasio 1080x1350). */
export function DraftThumbnail({ draft }: { draft: Draft }) {
  const [imageUrl] = draft.image_urls;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL gambar render berasal dari backend
        <img src={imageUrl} alt={draft.headline} className="h-full w-full object-cover" />
      ) : (
        <div
          className={`flex h-full w-full flex-col justify-between p-2 sm:p-3 ${TEMPLATE_STYLES[draft.template]}`}
        >
          <span
            className={`truncate font-mono text-[8px] uppercase tracking-[0.15em] opacity-70 sm:text-[9px] ${
              draft.slide_count > 1 ? "pr-8" : ""
            }`}
          >
            {TEMPLATE_LABELS[draft.template]}
          </span>
          <p className="line-clamp-3 text-[11px] leading-tight font-extrabold tracking-tight sm:line-clamp-4 sm:text-[13px]">
            {draft.headline}
          </p>
          <span className="font-mono text-[8px] font-bold tracking-[0.15em] sm:text-[9px]">
            VORSA<span className="text-accent">.</span>
          </span>
        </div>
      )}
      {draft.slide_count > 1 && (
        <span className="absolute top-2 right-2 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-paper">
          1/{draft.slide_count}
        </span>
      )}
    </div>
  );
}
