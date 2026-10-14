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

export interface DraftNavigation {
  /** Posisi draf ini di daftar yang tampil (mulai 1), `null` bila tersembunyi filter. */
  position: number | null;
  total: number;
  prev?: Draft;
  next?: Draft;
  onSelect: (draftId: string) => void;
}

/** Abaikan shortcut saat editor sedang mengetik atau memakai kontrol form. */
function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

/**
 * Panel pratinjau satu draf: gambar (dengan navigasi slide untuk carousel),
 * caption lengkap seperti tampil di Instagram, dan sumber berita. Editor bisa
 * pindah ke draf sebelumnya/berikutnya lewat tombol atau shortcut J/K.
 */
export function DraftPreviewPanel({
  draft,
  onClose,
  navigation,
}: {
  draft: Draft;
  onClose: () => void;
  navigation: DraftNavigation;
}) {
  const [slide, setSlide] = useState(0);
  const lastSlide = draft.slide_count - 1;
  const { position, total, prev, next, onSelect } = navigation;

  // Shortcut keyboard: Escape menutup, J/K pindah ke draf berikutnya/sebelumnya.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      if (e.key === "Escape") onClose();
      else if (e.key.toLowerCase() === "j" && next) onSelect(next.draft_id);
      else if (e.key.toLowerCase() === "k" && prev) onSelect(prev.draft_id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onSelect, next, prev]);

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

      <nav
        aria-label="Navigasi antar draf"
        className="-mt-2 flex items-center justify-between gap-3 border-y border-line py-2"
      >
        <button
          type="button"
          onClick={() => prev && onSelect(prev.draft_id)}
          disabled={!prev}
          aria-label="Draf sebelumnya"
          title={prev ? `Sebelumnya: ${prev.headline} (K)` : undefined}
          className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm font-semibold hover:bg-line disabled:opacity-30 disabled:hover:bg-transparent"
        >
          ↑ <span className="hidden sm:inline">Sebelumnya</span>
        </button>
        <span className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
          {position === null ? "Tersembunyi filter" : `Draf ${position} / ${total}`}
        </span>
        <button
          type="button"
          onClick={() => next && onSelect(next.draft_id)}
          disabled={!next}
          aria-label="Draf berikutnya"
          title={next ? `Berikutnya: ${next.headline} (J)` : undefined}
          className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm font-semibold hover:bg-line disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <span className="hidden sm:inline">Berikutnya</span> ↓
        </button>
      </nav>

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
            <div
              className="flex items-center gap-1.5"
              aria-label={`Slide ${slide + 1} dari ${draft.slide_count}`}
            >
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
          <h3
            id="preview-caption"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
          >
            Caption
          </h3>
          <span
            className={`font-mono text-[11px] ${captionLength > IG_CAPTION_LIMIT || draft.hashtags.length > IG_HASHTAG_LIMIT ? "text-warn" : "text-muted"}`}
          >
            {captionLength.toLocaleString("id-ID")}/{IG_CAPTION_LIMIT.toLocaleString("id-ID")}{" "}
            karakter · {draft.hashtags.length} hashtag
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
          <h3
            id="preview-sources"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
          >
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

      {next ? (
        <button
          type="button"
          onClick={() => onSelect(next.draft_id)}
          className="group flex flex-col items-start gap-1 rounded-sm border border-line p-4 text-left hover:border-ink"
        >
          <span className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
            Draf berikutnya · tekan J
          </span>
          <span className="font-extrabold tracking-tight group-hover:text-accent">
            {next.headline} →
          </span>
        </button>
      ) : (
        position !== null && (
          <p className="rounded-sm border border-dashed border-line p-4 text-center text-sm text-muted">
            Ini draf terakhir di antrean.
          </p>
        )
      )}
    </div>
  );
}
