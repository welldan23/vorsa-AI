export function ApprovalQueueSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat antrean" className="animate-pulse">
      <div className="h-3 w-48 rounded-sm bg-line" />
      <div className="mt-6 grid grid-cols-3 gap-4 border-y border-ink py-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-sm bg-line" />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[132px_1fr] sm:gap-6"
        >
          <div className="aspect-[4/5] rounded-sm bg-line" />
          <div className="flex flex-col gap-3">
            <div className="h-3 w-32 rounded-sm bg-line" />
            <div className="h-5 w-4/5 rounded-sm bg-line" />
            <div className="h-3 w-full rounded-sm bg-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
