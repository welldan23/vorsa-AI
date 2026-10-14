import type { DesignTemplate, Draft, Rubric } from "@/lib/types";

const TIME_ZONE = "Asia/Jakarta";

export const RUBRIC_LABELS: Record<Rubric, string> = {
  berita: "Berita",
  budaya: "Budaya",
  teknologi: "Teknologi/AI",
  "ekonomi-bisnis": "Ekonomi & Bisnis",
  lifestyle: "Lifestyle",
};

export const TEMPLATE_LABELS: Record<DesignTemplate, string> = {
  news: "News",
  breaking: "Breaking News",
  carousel: "Carousel",
  culture: "Culture",
  tech: "Tech",
  business: "Business",
  tldr: "TL;DR",
};

/** Batas skor di bawah ini dianggap bukti lemah. */
export const LOW_CONFIDENCE_THRESHOLD = 0.6;

/** Draf dianggap meragukan bila ditandai riset atau skornya di bawah ambang. */
export function isWeakEvidence(draft: Pick<Draft, "is_doubtful" | "confidence_score">): boolean {
  return draft.is_doubtful || draft.confidence_score < LOW_CONFIDENCE_THRESHOLD;
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatWaitingTime(iso: string, now: Date): string {
  const minutes = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60_000));
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} jam` : `${hours} jam ${rest} mnt`;
}

export function formatPercent(score: number): string {
  return `${Math.round(score * 100)}%`;
}
