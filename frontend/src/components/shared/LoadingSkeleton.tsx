import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── Generic row skeleton ─────────────────────────────────────
export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-border last:border-0">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1 rounded" />
      ))}
    </div>
  );
}

// ─── Card skeleton ────────────────────────────────────────────
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border p-5 space-y-3", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Analytics card skeleton grid ────────────────────────────
export function SkeletonAnalyticsGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ─── Table skeleton ───────────────────────────────────────────
export function SkeletonTable({
  rows = 8,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 py-2.5 px-4 bg-muted/40 border-b border-border">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 flex-1 rounded" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} cols={cols} />
      ))}
    </div>
  );
}

// ─── Product card skeleton ────────────────────────────────────
export function SkeletonProductCard() {
  return (
    <div className="rounded-xl border border-border p-3 space-y-3">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}
