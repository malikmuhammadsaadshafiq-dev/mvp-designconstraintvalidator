"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 w-2/3 skeleton-shimmer rounded" />
          <div className="h-4 w-1/3 skeleton-shimmer rounded" />
        </div>
        <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
      </div>
      <div className="space-y-3 mb-4">
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-3/4 skeleton-shimmer rounded" />
        <div className="h-4 w-1/2 skeleton-shimmer rounded" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 skeleton-shimmer rounded-full" />
        <div className="h-6 w-24 skeleton-shimmer rounded-full" />
      </div>
      <div className="h-10 w-full skeleton-shimmer rounded-xl" />
    </div>
  );
}