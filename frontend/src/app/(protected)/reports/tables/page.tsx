"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function TableUtilizationPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Table Utilization</h1>
          <p className="text-xs font-medium text-gray-500">Track table occupancy and turnover rates</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export Report</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Peak Occupancy Rate</h3><p className="text-2xl font-black text-gray-900">85%</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Avg Dining Duration</h3><p className="text-2xl font-black text-gray-900">42 min</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Table Turnover (Daily)</h3><p className="text-2xl font-black text-gray-900">4.5x</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Most Used Table</h3><p className="text-2xl font-black text-green-600">Table 4</p></div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">All Tables Report</h3>
          </div>
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/50 font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Table Name</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Total Orders</th>
                <th className="px-4 py-3">Avg Duration</th>
                <th className="px-4 py-3">Turnover Rate</th>
                <th className="px-6 py-3 text-right">Revenue Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: "Table 1", capacity: 2, orders: 12, duration: "35 min", turnover: "6.0x", rev: "₹4,200" },
                { name: "Table 2", capacity: 4, orders: 8, duration: "45 min", turnover: "4.0x", rev: "₹8,650" },
                { name: "Table 3", capacity: 4, orders: 9, duration: "50 min", turnover: "4.5x", rev: "₹10,200" },
                { name: "Table 4", capacity: 6, orders: 15, duration: "65 min", turnover: "5.0x", rev: "₹24,500" },
                { name: "Table 5", capacity: 2, orders: 10, duration: "30 min", turnover: "5.0x", rev: "₹3,100" },
                { name: "Table 6", capacity: 8, orders: 4, duration: "90 min", turnover: "2.0x", rev: "₹18,400" },
              ].map((t, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{t.name}</td>
                  <td className="px-4 py-4">{t.capacity} Persons</td>
                  <td className="px-4 py-4">{t.orders}</td>
                  <td className="px-4 py-4">{t.duration}</td>
                  <td className="px-4 py-4">{t.turnover}</td>
                  <td className="px-6 py-4 text-right font-bold text-[#00D9D9]">{t.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
