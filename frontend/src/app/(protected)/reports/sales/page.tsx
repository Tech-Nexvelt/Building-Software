"use client";

import { useState, useEffect } from "react";
import { Download, Calendar, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const salesData = [
  { day: 'Mon', revenue: 45000 }, { day: 'Tue', revenue: 52000 }, { day: 'Wed', revenue: 48000 },
  { day: 'Thu', revenue: 61000 }, { day: 'Fri', revenue: 85000 }, { day: 'Sat', revenue: 110000 }, { day: 'Sun', revenue: 124560 }
];

export default function SalesReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Sales Reports</h1>
          <p className="text-xs font-medium text-gray-500">Track revenue and growth across time</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"><Filter className="h-4 w-4"/> Filters</button>
          <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export Report</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 mb-2">Total Sales (This Week)</h3>
            <p className="text-2xl font-black text-gray-900">₹5,25,560</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 mb-2">Highest Grossing Day</h3>
            <p className="text-2xl font-black text-gray-900">Sunday</p>
            <p className="text-[10px] font-bold text-green-600 bg-green-50 inline-block px-1.5 py-0.5 rounded mt-2">₹1,24,560</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 mb-2">Average Daily Sales</h3>
            <p className="text-2xl font-black text-gray-900">₹75,080</p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Weekly Revenue Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="revenue" stroke="#00D9D9" strokeWidth={3} dot={{r: 4, fill: '#00D9D9', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
