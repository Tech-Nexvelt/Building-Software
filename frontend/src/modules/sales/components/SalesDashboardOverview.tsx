"use client";

import { Wallet, ReceiptText, Banknote, LineChart, RotateCcw, Clock } from 'lucide-react';
import type { SalesKPIs } from '../types/sales.types';
import { formatCurrency, cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SalesDashboardOverview({ kpis }: { kpis: SalesKPIs }) {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      
      <KPICard 
        title="Today's Revenue" 
        value={formatCurrency(kpis.todaysRevenue.value)} 
        trend={kpis.todaysRevenue.trend} 
        icon={<Wallet className="w-5 h-5 text-[#00D9D9]" />} 
        vsText="vs yesterday"
      />
      <KPICard 
        title="Today's Orders" 
        value={kpis.todaysOrders.value.toString()} 
        trend={kpis.todaysOrders.trend} 
        icon={<ReceiptText className="w-5 h-5 text-[#22C55E]" />} 
        vsText="vs yesterday"
      />
      <KPICard 
        title="Monthly Revenue" 
        value={formatCurrency(kpis.monthlyRevenue.value)} 
        trend={kpis.monthlyRevenue.trend} 
        icon={<Banknote className="w-5 h-5 text-[#00D9D9]" />} 
        vsText="vs last month"
      />
      <KPICard 
        title="Avg. Order Value" 
        value={formatCurrency(kpis.avgOrderValue.value)} 
        trend={kpis.avgOrderValue.trend} 
        icon={<LineChart className="w-5 h-5 text-[#00D9D9]" />} 
        vsText="vs last month"
      />
      <KPICard 
        title="Refunds" 
        value={formatCurrency(kpis.refunds.value)} 
        trend={kpis.refunds.trend} 
        icon={<RotateCcw className="w-5 h-5 text-red-500" />} 
        vsText="vs last month"
      />
      <KPICard 
        title="Pending Orders" 
        value={kpis.pendingOrders.value.toString()} 
        trend={kpis.pendingOrders.trend} 
        icon={<Clock className="w-5 h-5 text-[#F59E0B]" />} 
        vsText="vs yesterday"
      />

    </div>
  );
}

function KPICard({ title, value, trend, icon, vsText }: any) {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:border-[#00D9D9]/30 hover:shadow-md group">
      <div className="flex flex-col mb-4">
        <p className="text-[13px] font-medium text-gray-500 group-hover:text-gray-700 transition-colors mb-2">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 truncate">{value}</h3>
      </div>
      
      <div className="flex items-center gap-1.5 text-[12px] font-medium mt-auto">
        <span className={cn("flex items-center gap-1", isPositive ? "text-[#22C55E]" : "text-red-500")}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {isPositive ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-400 font-normal">{vsText}</span>
      </div>
    </div>
  );
}
