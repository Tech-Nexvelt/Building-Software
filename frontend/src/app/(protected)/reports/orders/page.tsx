"use client";

import { useState, useEffect } from "react";
import { Download, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const orderData = [
  { hour: '12 PM', dineIn: 45, takeout: 15 },
  { hour: '2 PM', dineIn: 55, takeout: 20 },
  { hour: '4 PM', dineIn: 25, takeout: 10 },
  { hour: '6 PM', dineIn: 60, takeout: 30 },
  { hour: '8 PM', dineIn: 85, takeout: 40 },
  { hour: '10 PM', dineIn: 70, takeout: 25 },
];

export default function OrdersReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Orders Reports</h1>
          <p className="text-xs font-medium text-gray-500">Analyze order volume and peak times</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"><Filter className="h-4 w-4"/> Filters</button>
          <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Total Orders</h3><p className="text-2xl font-black text-gray-900">480</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Completed</h3><p className="text-2xl font-black text-green-600">465</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Cancelled</h3><p className="text-2xl font-black text-red-500">15</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="text-xs font-bold text-gray-500 mb-1">Avg Order Value</h3><p className="text-2xl font-black text-gray-900">₹486</p></div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Orders by Hour (Dine-in vs Takeout)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="dineIn" stackId="a" fill="#00D9D9" radius={[0, 0, 0, 0]} name="Dine-in" />
                <Bar dataKey="takeout" stackId="a" fill="#FF9F43" radius={[4, 4, 0, 0]} name="Takeout" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
