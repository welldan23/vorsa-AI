# VORSA Newsroom — Web Editor

UI editor VORSA AI Newsroom (Next.js 16 + Tailwind CSS 4). Halaman utama `/`
adalah **Antrean Persetujuan**: daftar draf yang menunggu keputusan editor.

Untuk sementara data draf masih tiruan (`src/lib/mock/drafts.ts`) dan dibaca lewat
`getPendingDrafts()` di `src/lib/drafts.ts`. Saat backend FastAPI siap, cukup ganti
isi fungsi itu dengan panggilan API — bentuk datanya (`src/lib/types.ts`) sudah
mengikuti kontrak JSON di PRD.

Selama masih pakai data tiruan, tampilan lain bisa dicoba lewat URL:

- `/` — antrean berisi draf (status menunggu & sedang direvisi)
- `/?skenario=kosong` — antrean kosong

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
