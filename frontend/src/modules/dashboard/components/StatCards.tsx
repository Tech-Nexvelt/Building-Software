"use client";

import { Wallet, Receipt, ReceiptText, Coffee, TrendingUp } from 'lucide-react';
import type { DashboardStats } from '../types/dashboard.types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function StatCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Today's Revenue" 
        value={formatCurrency(stats.revenue.value)} 
        trend={stats.revenue.trend} 
        icon={<Wallet className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
      />
      <StatCard 
        title="Today's Bills" 
        value={stats.bills.value.toString()} 
        trend={stats.bills.trend} 
        icon={<Receipt className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
      />
      <StatCard 
        title="Average Bill Value" 
        value={formatCurrency(stats.averageBillValue.value)} 
        trend={stats.averageBillValue.trend} 
        icon={<ReceiptText className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
      />
      <StatCard 
        title="Top Selling Product" 
        value={stats.topProduct.name} 
        trendLabel={`${stats.topProduct.sales} Cups`}
        icon={<Coffee className="w-5 h-5 text-[#00D9D9]" />} 
        iconBg="bg-[#E6F8F8] border border-[#00D9D9]/20" 
        graphColor="#00D9D9"
        isProduct
      />
    </div>
  );
}

function StatCard({ title, value, trend, trendLabel, icon, iconBg, graphColor, isProduct }: any) {
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
        {isProduct ? (
          <p className="text-[13px] font-medium text-gray-600">{trendLabel}</p>
        ) : (
          <div className="flex items-center gap-1 text-[13px] font-medium text-[#22C55E]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{trend}% <span className="text-gray-400 font-normal">vs yesterday</span></span>
          </div>
        )}
        
        {/* Simple mini sparkline representation for visuals */}
        {!isProduct && (
          <svg width="60" height="24" viewBox="0 0 60 24" className="overflow-visible opacity-70 group-hover:opacity-100 transition-opacity">
            <path d="M0 24 L10 15 L20 18 L30 8 L40 12 L50 4 L60 0" fill="none" stroke={graphColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isProduct && (
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
             <img src="https://images.unsplash.com/photo-1572442388796-11668a67efeb?q=80&w=200&auto=format&fit=crop" alt="Coffee" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
