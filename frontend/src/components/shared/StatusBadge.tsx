import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "active" | "inactive" | "completed" | "pending" | "cancelled" | "refunded";

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  },
  refunded: {
    label: "Refunded",
    className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-medium capitalize border px-2 py-0.5 rounded-full",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
