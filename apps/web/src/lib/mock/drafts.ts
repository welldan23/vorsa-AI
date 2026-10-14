import type { Draft } from "@/lib/types";

type MockDraft = Omit<Draft, "created_at" | "updated_at"> & {
  /** Berapa menit lalu draf dibuat, supaya data tiruan selalu terasa "hari ini". */
  minutes_ago: number;
};

const MOCK_DRAFTS: MockDraft[] = [
  {
    draft_id: "dft_001",
    news_id: "nws_98231",
    rubric: "teknologi",
    template: "tech",
    headline: "Startup AI Lokal Raup Pendanaan Rp 250 Miliar",
    caption:
      "Industri AI Indonesia kembali bergeliat. Sebuah startup asal Bandung mengumumkan pendanaan Seri B senilai Rp 250 miliar untuk memperluas layanan model bahasa berbahasa daerah ke Asia Tenggara.",
    hashtags: ["#VORSA", "#AI", "#Teknologi", "#Startup"],
    confidence_score: 0.92,
    is_doubtful: false,
    sources: [
      { name: "Kompas Tekno", url: "https://tekno.kompas.com" },
      { name: "DailySocial", url: "https://dailysocial.id" },
      { name: "Reuters", url: "https://www.reuters.com" },
    ],
    image_urls: [],
    slide_count: 1,
    status: "pending",
    version: 1,
    minutes_ago: 18,
  },
  {
    draft_id: "dft_002",
    news_id: "nws_98244",
    rubric: "berita",
    template: "breaking",
    headline: "Gempa M5,8 Guncang Selatan Jawa, Tidak Berpotensi Tsunami",
    caption:
      "BMKG mencatat gempa bermagnitudo 5,8 pada pukul 06.12 WIB. Getaran dirasakan hingga Yogyakarta dan Cilacap. Hingga kini belum ada laporan kerusakan berat.",
    hashtags: ["#VORSA", "#Gempa", "#BMKG", "#Berita"],
    confidence_score: 0.88,
    is_doubtful: false,
    sources: [
      { name: "BMKG", url: "https://www.bmkg.go.id" },
      { name: "Antara", url: "https://www.antaranews.com" },
    ],
    image_urls: [],
    slide_count: 1,
    status: "pending",
    version: 2,
    minutes_ago: 42,
  },
  {
    draft_id: "dft_003",
    news_id: "nws_98250",
    rubric: "ekonomi-bisnis",
    template: "carousel",
    headline: "5 Hal yang Perlu Kamu Tahu dari Kenaikan Suku Bunga BI",
    caption:
      "Bank Indonesia menaikkan suku bunga acuan 25 basis poin. Apa artinya buat cicilan, tabungan, dan harga barang? Kami rangkum dalam lima slide singkat.",
    hashtags: ["#VORSA", "#Ekonomi", "#BankIndonesia", "#SukuBunga"],
    confidence_score: 0.81,
    is_doubtful: false,
    sources: [
      { name: "Bank Indonesia", url: "https://www.bi.go.id" },
      { name: "Bisnis.com", url: "https://www.bisnis.com" },
      { name: "CNBC Indonesia", url: "https://www.cnbcindonesia.com" },
    ],
    image_urls: [],
    slide_count: 5,
    status: "pending",
    version: 1,
    minutes_ago: 75,
  },
  {
    draft_id: "dft_004",
    news_id: "nws_98262",
    rubric: "lifestyle",
    template: "news",
    headline: "Klaim Kopi Hitam Bisa Turunkan Berat Badan 5 Kg Seminggu",
    caption:
      "Sebuah unggahan viral menyebut kopi hitam tanpa gula mampu memangkas berat badan hingga 5 kg dalam seminggu. Ahli gizi menilai klaim ini berlebihan.",
    hashtags: ["#VORSA", "#Lifestyle", "#Kesehatan"],
    confidence_score: 0.41,
    is_doubtful: true,
    sources: [{ name: "Unggahan media sosial", url: "https://x.com" }],
    image_urls: [],
    slide_count: 1,
    status: "pending",
    version: 1,
    minutes_ago: 96,
  },
  {
    draft_id: "dft_005",
    news_id: "nws_98270",
    rubric: "budaya",
    template: "culture",
    headline: "Festival Film Pendek Jakarta Kembali Digelar di Ruang Publik",
    caption:
      "Tahun ini festival memutar 64 film pendek dari 18 kota di taman dan halte bus. Seluruh pemutaran gratis dan terbuka untuk umum hingga akhir pekan.",
    hashtags: ["#VORSA", "#Budaya", "#Film", "#Jakarta"],
    confidence_score: 0.86,
    is_doubtful: false,
    sources: [
      { name: "Tempo", url: "https://www.tempo.co" },
      { name: "Situs resmi festival", url: "https://example.org" },
    ],
    image_urls: [],
    slide_count: 1,
    status: "pending",
    version: 1,
    minutes_ago: 130,
  },
  {
    draft_id: "dft_006",
    news_id: "nws_98281",
    rubric: "teknologi",
    template: "tldr",
    headline: "TL;DR: Aturan Baru Perlindungan Data Pribadi Mulai Berlaku",
    caption:
      "Mulai bulan ini, perusahaan wajib melaporkan kebocoran data dalam 3x24 jam. Ini ringkasan poin penting yang berdampak langsung ke pengguna.",
    hashtags: ["#VORSA", "#TLDR", "#DataPribadi", "#Teknologi"],
    confidence_score: 0.64,
    is_doubtful: false,
    sources: [
      { name: "Kominfo", url: "https://www.komdigi.go.id" },
      { name: "Hukumonline", url: "https://www.hukumonline.com" },
    ],
    image_urls: [],
    slide_count: 1,
    status: "pending",
    version: 3,
    minutes_ago: 190,
  },
];

/** Bangun daftar draf tiruan dengan waktu relatif terhadap `now`. */
export function buildMockPendingDrafts(now: Date): Draft[] {
  return MOCK_DRAFTS.map(({ minutes_ago, ...draft }) => {
    const timestamp = new Date(now.getTime() - minutes_ago * 60_000).toISOString();
    return { ...draft, created_at: timestamp, updated_at: timestamp };
  });
}
