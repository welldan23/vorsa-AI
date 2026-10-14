import type { ReactNode } from "react";

/** Tampilan saat sebuah daftar tidak punya isi. */
export function EmptyState({
  title,
  description,
  action,
  size = "lg",
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center text-center ${size === "lg" ? "py-20" : "py-14"}`}
    >
      <span aria-hidden className="mb-5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-ink" />
        <span className="h-2 w-8 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
      <p
        className={`font-extrabold tracking-tight text-balance ${size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"}`}
      >
        {title}
      </p>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
