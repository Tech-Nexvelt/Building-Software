export default function ProductsLoading() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-8 pt-6 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-96 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          <div className="h-9 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Top Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2 w-full">
                <div className="h-4 w-24 bg-gray-100 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0"></div>
            </div>
            <div className="h-4 w-32 bg-gray-50 rounded mt-auto"></div>
          </div>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-16 bg-white border border-gray-100 rounded-2xl mb-6 shadow-sm"></div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 h-[400px] shadow-sm"></div>
      
    </div>
  );
}
