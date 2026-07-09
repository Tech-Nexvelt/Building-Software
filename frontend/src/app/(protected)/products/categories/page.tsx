"use client";

import { useState, useEffect } from "react";
import { Plus, MoreVertical, Search, Filter } from "lucide-react";

interface Category {
  id: string;
  name: string;
  itemsCount: number;
  status: 'active' | 'inactive';
  imageUrl: string;
}

const mockCategories: Category[] = [
  { id: "CAT-01", name: "Starters", itemsCount: 28, status: "active", imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=300&h=200" },
  { id: "CAT-02", name: "Main Course", itemsCount: 42, status: "active", imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&q=80&w=300&h=200" },
  { id: "CAT-03", name: "Beverages", itemsCount: 21, status: "active", imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=300&h=200" },
  { id: "CAT-04", name: "Desserts", itemsCount: 18, status: "active", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8a9e1cb?auto=format&fit=crop&q=80&w=300&h=200" },
  { id: "CAT-05", name: "Pizza", itemsCount: 15, status: "active", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300&h=200" },
  { id: "CAT-06", name: "Extra Add-ons", itemsCount: 12, status: "active", imageUrl: "https://images.unsplash.com/photo-1627042633145-b780d842ba45?auto=format&fit=crop&q=80&w=300&h=200" },
];

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredCategories = mockCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Categories</h1>
          <p className="text-xs font-medium text-gray-500">Manage your menu sections and display order</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-2 text-xs font-bold text-white hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          
          {/* Categories Grid */}
          {filteredCategories.map((category) => (
            <div key={category.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#00D9D9]/50 transition-all cursor-pointer">
              <div className="h-32 w-full overflow-hidden bg-gray-100">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{category.itemsCount} items</p>
                  </div>
                  <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 mt-auto">
                  {category.status === 'active' ? (
                    <span className="inline-block rounded bg-[#00D9D9]/10 px-2 py-0.5 text-xs font-bold text-[#00D9D9]">Active</span>
                  ) : (
                    <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">Inactive</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Category Card */}
          <div className="flex h-full min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-[#00D9D9]/5 hover:border-[#00D9D9]/50 transition-colors">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Plus className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm font-bold text-gray-700">Add Category</span>
          </div>

        </div>
      </div>
    </div>
  );
}
