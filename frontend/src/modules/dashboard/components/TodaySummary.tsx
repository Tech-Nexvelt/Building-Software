import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Wallet, Receipt, Package, Users, UserPlus } from 'lucide-react';
import type { DashboardData } from '@/modules/dashboard/types/dashboard.types';

export function TodaySummary({ summary }: { summary: DashboardData['todaySummary'] }) {
  const items = [
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue), icon: Wallet, color: 'text-[#00D9D9]', bg: 'bg-[#E6F8F8] border border-[#00D9D9]/20' },
    { label: 'Total Bills', value: summary.totalBills, icon: Receipt, color: 'text-[#00D9D9]', bg: 'bg-[#E6F8F8] border border-[#00D9D9]/20' },
    { label: 'Items Sold', value: summary.itemsSold, icon: Package, color: 'text-[#00B8B8]', bg: 'bg-[#E6F8F8] border border-[#00D9D9]/20' },
    { label: 'New Customers', value: summary.newCustomers, icon: UserPlus, color: 'text-[#00D9D9]', bg: 'bg-[#E6F8F8] border border-[#00D9D9]/20' },
    { label: 'Returning Customers', value: summary.returningCustomers, icon: Users, color: 'text-[#00B8B8]', bg: 'bg-[#E6F8F8] border border-[#00D9D9]/20' },
  ];

  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl flex flex-col transition-all hover:border-[#00D9D9]/30 hover:shadow-md">
      <h3 className="font-semibold text-gray-900 mb-6">Today's Summary</h3>
      <div className="space-y-4 flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} group-hover:border-[#00D9D9]/50 transition-colors`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-[13px] text-gray-600 group-hover:text-gray-900 transition-colors font-medium">{item.label}</span>
            </div>
            <span className="text-[13px] font-bold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
