import { Suspense } from "react";

import { ApprovalQueue } from "@/components/queue/approval-queue";
import { ApprovalQueueSkeleton } from "@/components/queue/approval-queue-skeleton";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-4">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Antrean Persetujuan<span className="text-accent">.</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
          Semua draf siap tinjau hari ini. Tidak ada yang tayang tanpa persetujuanmu.
        </p>
      </header>

      <Suspense fallback={<ApprovalQueueSkeleton />}>
        <ApprovalQueue />
      </Suspense>
    </main>
  );
}
