"use client";

import { cn } from "@/lib/utils";

interface ValidationBadgeProps {
  status: "pass" | "warning" | "error";
  label: string;
  value?: string;
}

export function ValidationBadge({ status, label, value }: ValidationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
        status === "pass" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
        status === "warning" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
        status === "error" && "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200"
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          status === "pass" && "bg-emerald-500",
          status === "warning" && "bg-amber-500",
          status === "error" && "bg-rose-500"
        )}
      />
      <span>{label}</span>
      {value && <span className="opacity-75">({value})</span>}
    </div>
  );
}