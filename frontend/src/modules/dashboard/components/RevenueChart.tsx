"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { RevenueData } from '../types/dashboard.types';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
        <select className="text-sm border-gray-200 rounded-lg text-gray-600 py-1.5 px-3 bg-gray-50 hover:bg-gray-100 outline-none cursor-pointer transition-colors focus:ring-[#00D9D9] focus:border-[#00D9D9]">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="flex-1 min-h-[260px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D9D9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D9D9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              tickFormatter={(value) => `₹${value / 1000}K`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              itemStyle={{ color: '#00D9D9', fontWeight: 600 }}
              labelStyle={{ color: '#0f172a', marginBottom: '4px' }}
              formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#00D9D9" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#00D9D9', filter: 'drop-shadow(0px 0px 4px rgba(0,217,217,0.5))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
