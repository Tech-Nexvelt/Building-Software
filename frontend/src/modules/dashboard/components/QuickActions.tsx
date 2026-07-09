import { Card } from '@/components/ui/card';
import { Receipt, Package, UserPlus, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    { label: 'New Bill', icon: Receipt, href: '/billing', color: 'text-gray-500' },
    { label: 'Add Product', icon: Package, href: '/products', color: 'text-gray-500' },
    { label: 'View Reports', icon: BarChart3, href: '/sales', color: 'text-gray-500' },
  ];

  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl">
      <h3 className="font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action, i) => (
          <Link 
            key={i} 
            href={action.href}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-white hover:border-[#00D9D9]/30 hover:bg-[#E6F8F8] transition-all group"
          >
            <action.icon className={`w-5 h-5 mb-2 ${action.color} group-hover:text-[#00D9D9] transition-colors`} />
            <span className="text-[11px] font-semibold text-gray-600 text-center leading-tight group-hover:text-gray-900">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
