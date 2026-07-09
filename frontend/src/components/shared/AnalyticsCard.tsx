import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
  loading?: boolean;
}

export function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
  trend,
  trendLabel,
  className,
  loading = false,
}: AnalyticsCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;
  const isNeutral = trend === 0;

  if (loading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
              <div className="h-7 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground tracking-tight truncate">
              {value}
            </p>
            {(trend !== undefined || subtitle) && (
              <div className="flex items-center gap-1.5 mt-2">
                {trend !== undefined && (
                  <>
                    {isPositive && (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    {isNegative && (
                      <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                    )}
                    {isNeutral && (
                      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isPositive && "text-emerald-500",
                        isNegative && "text-red-500",
                        isNeutral && "text-muted-foreground"
                      )}
                    >
                      {isPositive && "+"}
                      {trend}%
                    </span>
                  </>
                )}
                {(trendLabel || subtitle) && (
                  <span className="text-xs text-muted-foreground">
                    {trendLabel ?? subtitle}
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              "bg-primary/10 transition-transform duration-200 hover:scale-110"
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
