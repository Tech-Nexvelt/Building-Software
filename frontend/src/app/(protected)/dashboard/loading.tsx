import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto p-8 pt-6">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      {/* Top Stats Skeleton */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 h-[140px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="w-10 h-10 rounded-xl" />
            </div>
            <div className="flex justify-between items-end">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Skeleton */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
        <Skeleton className="h-[360px] rounded-2xl w-full" />
        <Skeleton className="h-[360px] rounded-2xl w-full" />
      </div>

      {/* Bottom Grid Skeleton */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
        <Skeleton className="h-[400px] rounded-2xl w-full" />
        <Skeleton className="h-[400px] rounded-2xl w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[220px] rounded-2xl w-full" />
          <Skeleton className="h-[160px] rounded-2xl w-full" />
        </div>
      </div>
    </div>
  );
}
