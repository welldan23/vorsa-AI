import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink bg-ink text-paper">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight">
            VORSA<span className="text-accent">.</span>
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 sm:inline">
            Newsroom
          </span>
        </Link>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 sm:inline">
          The Voice of Our Era
        </span>
      </div>
    </header>
  );
}
