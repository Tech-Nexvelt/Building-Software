"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Layers } from "lucide-react";

export default function AddonsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Add-ons</h1>
          <p className="text-xs font-medium text-gray-500">Manage extra customizations like extra cheese or sauces</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search add-ons..."
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-2 text-xs font-bold text-white hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Create Add-on
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <div className="text-center">
          <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Add-ons Defined Yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">Create add-ons and assign them to your menu items to allow customers to fully customize their orders.</p>
          <button className="rounded-lg bg-[#00D9D9] px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgb(0,217,217,0.2)] hover:opacity-90 transition-opacity mx-auto inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create First Add-on
          </button>
        </div>
      </div>
    </div>
  );
}
