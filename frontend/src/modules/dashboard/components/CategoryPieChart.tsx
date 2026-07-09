"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryData } from '../types/dashboard.types';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export function CategoryPieChart({ data }: { data: CategoryData[] }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // Override colors for the light theme to match the beautiful vibrant mockup
  const lightThemeColors = ['#00D9D9', '#4338ca', '#a855f7', '#f97316', '#eab308', '#94a3b8'];
  const themeData = data.map((d, i) => ({
    ...d,
    color: lightThemeColors[i % lightThemeColors.length]
  }));

  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl h-full flex flex-col">
      <h3 className="font-semibold text-gray-900 mb-6">Sales by Category</h3>
      
      <div className="flex-1 flex items-center justify-between">
        {/* Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={themeData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {themeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] font-medium text-gray-500">Total</span>
            <span className="text-sm font-bold text-gray-900">₹{Math.floor(total / 1000)}k</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 ml-8 space-y-4">
          {themeData.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[13px] font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-semibold text-gray-900 mr-2">
                  {formatCurrency(item.value).replace('.00', '')}
                </span>
                <span className="text-[11px] text-gray-500">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
