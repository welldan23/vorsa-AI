"use client";

import { useEffect, useState } from "react";

import { PostSlide } from "@/components/post/post-slide";
import { ConfidenceBadge } from "@/components/queue/confidence-badge";
import { StatusBadge } from "@/components/queue/status-badge";
import { RUBRIC_LABELS, TEMPLATE_LABELS } from "@/lib/format";
import type { Draft } from "@/lib/types";

/** Batas resmi Instagram untuk caption dan jumlah hashtag. */
const IG_CAPTION_LIMIT = 2200;
const IG_HASHTAG_LIMIT = 30;

/**
 * Panel pratinjau satu draf: gambar (dengan navigasi slide untuk carousel),
 * caption lengkap seperti tampil di Instagram, dan sumber berita.
 */
export function DraftPreviewPanel({ draft, onClose }: { draft: Draft; onClose: () => void }) {
  const [slide, setSlide] = useState(0);
  const lastSlide = draft.slide_count - 1;

  // Tutup panel dengan tombol Escape.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const fullCaption = `${draft.caption}\n\n${draft.hashtags.join(" ")}`;
  const captionLength = fullCaption.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          <StatusBadge status={draft.status} />
          <span className="font-semibold text-accent">{RUBRIC_LABELS[draft.rubric]}</span>
          <span>{TEMPLATE_LABELS[draft.template]}</span>
          <span>Versi {draft.version}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau"
          className="-mt-1 -mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none hover:bg-line"
        >
          ×
        </button>
      </div>

      <figure>
        <PostSlide draft={draft} index={slide} />
        {draft.slide_count > 1 && (
          <figcaption className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="Slide sebelumnya"
              className="h-8 w-8 rounded-full border border-line text-sm hover:border-ink disabled:opacity-30 disabled:hover:border-line"
            >
              ←
            </button>
            <div className="flex items-center gap-1.5" aria-label={`Slide ${slide + 1} dari ${draft.slide_count}`}>
              {Array.from({ length: draft.slide_count }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Ke slide ${i + 1}`}
                  aria-current={i === slide}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-5 bg-ink" : "w-1.5 bg-line"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSlide((s) => Math.min(lastSlide, s + 1))}
              disabled={slide === lastSlide}
              aria-label="Slide berikutnya"
              className="h-8 w-8 rounded-full border border-line text-sm hover:border-ink disabled:opacity-30 disabled:hover:border-line"
            >
              →
            </button>
          </figcaption>
        )}
      </figure>

      <section aria-labelledby="preview-caption">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3 id="preview-caption" className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            Caption
          </h3>
          <span
            className={`font-mono text-[11px] ${captionLength > IG_CAPTION_LIMIT || draft.hashtags.length > IG_HASHTAG_LIMIT ? "text-warn" : "text-muted"}`}
          >
            {captionLength.toLocaleString("id-ID")}/{IG_CAPTION_LIMIT.toLocaleString("id-ID")} karakter ·{" "}
            {draft.hashtags.length} hashtag
          </span>
        </div>
        <h4 className="text-xl leading-snug font-extrabold tracking-tight text-balance">
          {draft.headline}
        </h4>
        <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
          <span className="font-bold">vorsa</span> {draft.caption}
        </p>
        <p className="mt-2 text-sm font-medium text-accent">{draft.hashtags.join(" ")}</p>
      </section>

      <section aria-labelledby="preview-sources" className="border-t border-line pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 id="preview-sources" className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            Sumber · {draft.sources.length}
          </h3>
          <ConfidenceBadge score={draft.confidence_score} doubtful={draft.is_doubtful} />
        </div>
        <ul className="flex flex-col gap-1.5 text-sm">
          {draft.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
