"use client";

import { Search, Filter, LayoutGrid, List, ArrowDownUp } from 'lucide-react';
import { useProductsStore } from '../store/useProductsStore';
import { cn } from '@/lib/utils';

export function ProductFilters() {
  const { viewMode, setViewMode, searchQuery, setSearchQuery } = useProductsStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm sticky top-0 z-10">
      
      {/* Search */}
      <div className="relative w-full sm:max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#00D9D9] transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] sm:text-sm transition-all"
          placeholder="Search products, SKU, or barcode..."
        />
      </div>

      {/* Filters & Toggles */}
      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        
        {/* Filter Button */}
        <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
          <Filter className="w-4 h-4 text-gray-500" />
          Filter
        </button>
        
        {/* Sort Button */}
        <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
          <ArrowDownUp className="w-4 h-4 text-gray-500" />
          Sort: Newest
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1 shrink-0"></div>

        {/* View Toggles */}
        <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200 shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              viewMode === 'table' 
                ? "bg-[#00D9D9] text-white shadow-sm" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              viewMode === 'grid' 
                ? "bg-[#00D9D9] text-white shadow-sm" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>

      </div>
    </div>
  );
}
