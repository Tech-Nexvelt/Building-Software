"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Eye, Edit3, MoreVertical } from "lucide-react";
import { useMenuAdminStore } from "@/store/useMenuAdminStore";

export default function MenuItemsPage() {
  const { items, searchQuery, setSearchQuery } = useMenuAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Menu Items</h1>
          <p className="text-xs font-medium text-gray-500">Manage your entire product catalog</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-2 text-xs font-bold text-white hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Add Menu Item
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4 text-center">Variants</th>
                <th className="px-4 py-4 text-center">Add-ons</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 shrink-0"></div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-700">{item.category}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{item.price}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">{item.variantsCount}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-50 text-xs font-bold text-purple-600">{item.addonsCount}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded px-2 py-0.5 text-xs font-bold ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#00D9D9]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#00D9D9]"><Edit3 className="h-4 w-4" /></button>
                      <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
