"use client";

import { Card } from '@/components/ui/card';
import type { Activity } from '../types/dashboard.types';
import { ArrowRight, FileText, Wallet, Package, Box, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  bill: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  payment: { icon: Wallet, color: 'text-[#00D9D9]', bg: 'bg-[#E6F8F8]' },
  product: { icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  stock: { icon: Box, color: 'text-orange-600', bg: 'bg-orange-50' },
  user: { icon: UserPlus, color: 'text-green-600', bg: 'bg-green-50' },
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl flex flex-col h-full">
      <h3 className="font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-6 flex-1">
        {activities.map((activity) => {
          const style = iconMap[activity.type] || iconMap.bill;
          const Icon = style.icon;
          
          return (
            <div key={activity.id} className="flex items-start gap-4 group">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:border-[#00D9D9]/50 border border-transparent", style.bg)}>
                <Icon className={cn("w-4 h-4", style.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 leading-tight mb-0.5">{activity.title}</p>
                <p className="text-[12px] text-gray-500 truncate">{activity.description}</p>
              </div>
              <span className="text-[11px] text-gray-400 font-medium shrink-0 pt-0.5">{activity.time}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-6 mt-auto">
        <Link href="/sales" className="inline-flex items-center text-[13px] font-semibold text-[#00D9D9] hover:text-[#00B8B8] transition-colors">
          View all activity <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </Card>
  );
}
