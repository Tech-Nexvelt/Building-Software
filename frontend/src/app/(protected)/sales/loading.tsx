export default function SalesLoading() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-8 pt-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-96 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-36 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* KPIs Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-[120px] bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="h-4 w-24 bg-gray-100 rounded mb-2"></div>
            <div className="h-7 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 w-40 bg-gray-50 rounded mt-auto"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="h-[500px] bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="h-16 border-b border-gray-100 flex items-center px-4">
          <div className="h-10 w-full max-w-md bg-gray-100 rounded-lg"></div>
        </div>
        <div className="p-4 space-y-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-8 bg-gray-50 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
