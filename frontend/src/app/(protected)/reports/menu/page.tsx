"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const topItems = [
  { name: 'Paneer Butter Masala', revenue: 15240, orders: 125 },
  { name: 'Veg Biryani', revenue: 11860, orders: 102 },
  { name: 'Margherita Pizza', revenue: 9450, orders: 87 },
  { name: 'Cold Coffee', revenue: 6780, orders: 74 },
  { name: 'Garlic Bread', revenue: 5320, orders: 68 },
];

export default function MenuPerformancePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Menu Performance</h1>
          <p className="text-xs font-medium text-gray-500">Track best and least selling items</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export Report</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Top Revenue Categories</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topItems} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#4b5563'}} width={120} />
                  <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="revenue" fill="#00D9D9" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Top Selling Items (Details)</h3>
            </div>
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50/50 font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-900">{item.name}</td>
                    <td className="px-4 py-3">{item.orders}</td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">₹{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
