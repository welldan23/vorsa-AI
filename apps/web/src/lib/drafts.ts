import { connection } from "next/server";

import { buildMockQueueDrafts, type MockScenario } from "@/lib/mock/drafts";
import { type Draft, QUEUE_STATUSES } from "@/lib/types";

/**
 * Ambil semua draf di antrean editor: yang menunggu keputusan (`pending`) dan
 * yang sedang direvisi AI (`revision`).
 *
 * Sementara masih memakai data tiruan. Saat backend siap, ganti isinya dengan
 * fetch ke FastAPI (mis. `GET /drafts?status=pending,revision`) — bentuk
 * datanya sama, dan parameter `scenario` bisa dibuang.
 */
export async function getQueueDrafts(scenario: MockScenario = "normal"): Promise<Draft[]> {
  // Antrean harus selalu segar, jadi render di waktu request (bukan saat build).
  await connection();

  const statuses: readonly string[] = QUEUE_STATUSES;
  const drafts = buildMockQueueDrafts(new Date(), scenario).filter((d) =>
    statuses.includes(d.status),
  );
  // Antrean FIFO: draf yang paling lama menunggu tampil paling atas.
  return drafts.sort((a, b) => a.created_at.localeCompare(b.created_at));
}
