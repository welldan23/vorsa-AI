// Kontrak data draf yang diasumsikan dari backend FastAPI (lihat PRD §5.3,
// output `/generate/draft`). Field memakai snake_case agar sama persis dengan
// JSON dari API, jadi nanti tinggal ganti sumber data tanpa mapping ulang.

export type Rubric =
  | "berita"
  | "budaya"
  | "teknologi"
  | "ekonomi-bisnis"
  | "lifestyle";

export type DesignTemplate =
  | "news"
  | "breaking"
  | "carousel"
  | "culture"
  | "tech"
  | "business"
  | "tldr";

export type DraftStatus =
  | "pending"
  | "approved"
  | "revision"
  | "rejected"
  | "published";

export interface DraftSource {
  name: string;
  url: string;
}

export interface Draft {
  draft_id: string;
  news_id: string;
  rubric: Rubric;
  template: DesignTemplate;
  headline: string;
  caption: string;
  hashtags: string[];
  /** Skor keyakinan hasil riset & cek fakta, 0–1. */
  confidence_score: number;
  /** Ditandai meragukan bila bukti lemah/bertentangan. */
  is_doubtful: boolean;
  sources: DraftSource[];
  /** URL gambar hasil render 1080x1350; lebih dari satu untuk carousel. */
  image_urls: string[];
  /** Jumlah slide (1 untuk feed biasa). */
  slide_count: number;
  status: DraftStatus;
  /** Naik tiap kali isi draf berubah; dipakai untuk membatalkan persetujuan lama. */
  version: number;
  created_at: string;
  updated_at: string;
}
