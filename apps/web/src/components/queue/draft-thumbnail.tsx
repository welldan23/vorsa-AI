import { PostSlide } from "@/components/post/post-slide";
import type { Draft } from "@/lib/types";

/** Miniatur slide pertama postingan untuk kartu di daftar antrean. */
export function DraftThumbnail({ draft }: { draft: Draft }) {
  return (
    <div className="relative">
      <PostSlide draft={draft} />
      {draft.slide_count > 1 && (
        <span className="absolute top-1.5 right-1.5 rounded-full bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-paper">
          1/{draft.slide_count}
        </span>
      )}
    </div>
  );
}
