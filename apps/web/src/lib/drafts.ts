import { connection } from "next/server";

import { buildMockPendingDrafts } from "@/lib/mock/drafts";
import type { Draft } from "@/lib/types";

/**
 * Ambil semua draf yang menunggu keputusan editor.
 *
 * Sementara masih memakai data tiruan. Saat backend siap, ganti isinya dengan
 * fetch ke FastAPI (mis. `GET /drafts?status=pending`) — bentuk datanya sama.
 */
export async function getPendingDrafts(): Promise<Draft[]> {
  // Antrean harus selalu segar, jadi render di waktu request (bukan saat build).
  await connection();

  const drafts = buildMockPendingDrafts(new Date());
  // Antrean FIFO: draf yang paling lama menunggu tampil paling atas.
  return drafts.sort((a, b) => a.created_at.localeCompare(b.created_at));
}
