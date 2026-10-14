import { TEMPLATE_LABELS } from "@/lib/format";
import type { DesignTemplate, Draft } from "@/lib/types";

// Gaya warna per template, dipakai selama gambar hasil render belum ada.
const TEMPLATE_STYLES: Record<DesignTemplate, string> = {
  news: "bg-paper text-ink ring-1 ring-inset ring-line",
  breaking: "bg-accent text-ink",
  carousel: "bg-ink text-paper",
  culture: "bg-[#e9e3d6] text-ink",
  tech: "bg-ink text-paper",
  business: "bg-paper text-ink ring-1 ring-inset ring-line",
  tldr: "bg-ink text-accent",
};

/**
 * Satu slide postingan Instagram rasio 4:5 (1080x1350). Kalau gambar hasil
 * render belum ada, tampilkan tiruan desain sesuai template. Ukuran teks
 * memakai satuan container (`cqw`) sehingga proporsinya sama di thumbnail
 * kecil maupun pratinjau besar.
 */
export function PostSlide({ draft, index = 0 }: { draft: Draft; index?: number }) {
  const imageUrl = draft.image_urls[index];

  return (
    <div className="@container relative aspect-[4/5] w-full overflow-hidden rounded-sm">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL gambar render berasal dari backend
        <img
          src={imageUrl}
          alt={`${draft.headline} — slide ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col justify-between p-[7cqw] ${TEMPLATE_STYLES[draft.template]}`}
        >
          <span className="truncate pr-[18cqw] font-mono text-[5cqw] uppercase tracking-[0.15em] opacity-70">
            {TEMPLATE_LABELS[draft.template]}
          </span>
          {index === 0 ? (
            <p className="line-clamp-5 text-[9.5cqw] leading-[1.08] font-extrabold tracking-tight">
              {draft.headline}
            </p>
          ) : (
            <div>
              <p className="font-mono text-[16cqw] leading-none font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-[4cqw] line-clamp-5 text-[6cqw] leading-snug font-semibold">
                {captionSentence(draft.caption, index)}
              </p>
            </div>
          )}
          <span className="font-mono text-[5cqw] font-bold tracking-[0.15em]">
            VORSA<span className="text-accent">.</span>
          </span>
        </div>
      )}
    </div>
  );
}

/** Ambil satu kalimat caption untuk isi slide tiruan berikutnya. */
function captionSentence(caption: string, index: number): string {
  const sentences = caption.match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
  if (sentences.length === 0) return caption;
  return sentences[(index - 1) % sentences.length];
}
