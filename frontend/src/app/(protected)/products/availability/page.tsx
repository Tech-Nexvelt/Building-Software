"use client";

import { useState, useEffect } from "react";
import { Search, Clock, Save } from "lucide-react";
import { useMenuAdminStore } from "@/store/useMenuAdminStore";

export default function AvailabilityPage() {
  const { items } = useMenuAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Menu Availability</h1>
          <p className="text-xs font-medium text-gray-500">Quickly toggle item status and set stock limits</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-2 text-xs font-bold text-white hover:opacity-90 shadow-sm">
            <Save className="h-4 w-4" /> Save Changes
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
                <th className="px-4 py-4">Current Status</th>
                <th className="px-6 py-4 text-right">Quick Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="px-4 py-4 text-gray-500">{item.category}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded px-2 py-0.5 text-xs font-bold ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      defaultValue={item.status}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold outline-none focus:border-[#00D9D9]"
                    >
                      <option value="active">Active (In Stock)</option>
                      <option value="out_of_stock">Out of Stock</option>
                      <option value="inactive">Disabled</option>
                    </select>
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
