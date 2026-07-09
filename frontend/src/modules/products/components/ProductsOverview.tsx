"use client";

import { Package, CheckCircle2, AlertTriangle, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import type { ProductsOverviewStats } from '../types/products.types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ProductsOverview({ stats }: { stats: ProductsOverviewStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Products" 
        value={stats.totalProducts.value.toString()} 
        trend={stats.totalProducts.trend} 
        icon={<Package className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
      />
      <StatCard 
        title="Active Products" 
        value={stats.activeProducts.value.toString()} 
        trend={stats.activeProducts.trend} 
        icon={<CheckCircle2 className="w-5 h-5 text-[#22C55E]" />} 
        iconBg="bg-green-50 border border-green-100" 
        graphColor="#22C55E"
      />
      <StatCard 
        title="Low Stock" 
        value={stats.lowStock.value.toString()} 
        trend={stats.lowStock.trend} 
        icon={<AlertTriangle className="w-5 h-5 text-[#F59E0B]" />} 
        iconBg="bg-amber-50 border border-amber-100" 
        graphColor="#F59E0B"
      />
      <StatCard 
        title="Inventory Value" 
        value={formatCurrency(stats.inventoryValue.value)} 
        trend={stats.inventoryValue.trend} 
        icon={<Wallet className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
      />
    </div>
  );
}

function StatCard({ title, value, trend, icon, iconBg, graphColor }: any) {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:border-[#00D9D9]/30 hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between h-10 mt-auto">
        <div className={cn("flex items-center gap-1 text-[13px] font-medium", isPositive ? "text-[#22C55E]" : "text-red-500")}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{isPositive ? '+' : ''}{trend}% <span className="text-gray-400 font-normal">vs last month</span></span>
        </div>
        
        {/* Simple mini sparkline representation for visuals */}
        <svg width="60" height="24" viewBox="0 0 60 24" className="overflow-visible opacity-70 group-hover:opacity-100 transition-opacity">
          <path 
            d={isPositive ? "M0 24 L10 15 L20 18 L30 8 L40 12 L50 4 L60 0" : "M0 0 L10 8 L20 4 L30 15 L40 12 L50 20 L60 24"} 
            fill="none" 
            stroke={graphColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </div>
  );
}
