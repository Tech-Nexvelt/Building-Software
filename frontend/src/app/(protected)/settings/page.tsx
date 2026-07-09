import { settingsService } from '@/modules/settings/services/settings.service';
import { 
  Building2, 
  Store, 
  Receipt, 
  Calculator, 
  Printer, 
  CreditCard, 
  Users, 
  Bell, 
  ShieldCheck, 
  DatabaseBackup, 
  Blocks, 
  Palette, 
  Settings as SettingsIcon, 
  Info
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Settings — Nexvelt POS',
};

const CATEGORIES = [
  { id: 'business', title: 'Business Profile', description: 'Manage your business information and contact details', icon: Building2, href: '/settings/business-profile' },
  { id: 'store', title: 'Store Information', description: 'Configure store, branches, operating hours', icon: Store, href: '/settings/store' },
  { id: 'receipt', title: 'Receipt Settings', description: 'Customize receipt layout, header and footer', icon: Receipt, href: '/settings/receipts' },
  { id: 'billing', title: 'Billing & Tax', description: 'Manage billing, tax, GST and Service Charge', icon: Calculator, href: '/settings/billing' },
  { id: 'payment', title: 'Payment Methods', description: 'Configure payment methods and fees', icon: CreditCard, href: '/settings/payments' },
  { id: 'printers', title: 'Printer Management', description: 'Manage connected printers and settings', icon: Printer, href: '/settings/printers' },
  { id: 'users', title: 'Users & Roles', description: 'Manage users, roles and permissions', icon: Users, href: '/settings/users' },
  { id: 'notifications', title: 'Notifications', description: 'Configure alerts, emails and notifications', icon: Bell, href: '/settings/notifications' },
  { id: 'security', title: 'Security', description: 'Manage security, 2FA and login settings', icon: ShieldCheck, href: '/settings/security' },
  { id: 'backup', title: 'Backup & Restore', description: 'Backup data and restore when needed', icon: DatabaseBackup, href: '/settings/backup' },
  { id: 'integrations', title: 'Integrations', description: 'Connect third-party app integrations', icon: Blocks, href: '/settings/integrations' },
  { id: 'appearance', title: 'Appearance', description: 'Customize theme, layout and UI preferences', icon: Palette, href: '/settings/appearance' },
  { id: 'about', title: 'About System', description: 'View system info and update application', icon: Info, href: '/settings/about' },
];

export default async function SettingsPage() {
  const activity = await settingsService.getRecentActivity();

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto p-8 pt-6 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          ⚙️ Settings Dashboard
        </h1>
        <p className="text-[14px] text-gray-500 mt-1">Configure your business, billing, users, security, printers, integrations, and application preferences.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {CATEGORIES.map((category) => (
          <Link 
            key={category.id} 
            href={category.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#00D9D9]/40 hover:shadow-md transition-all group flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#E6F8F8] group-hover:border-[#00D9D9]/30 transition-colors">
                <category.icon className="w-5 h-5 text-gray-600 group-hover:text-[#00D9D9] transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-0.5 group-hover:text-[#00D9D9] transition-colors">{category.title}</h3>
                <p className="text-[12px] text-gray-500 leading-snug">{category.description}</p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-[#00D9D9] text-[13px] font-semibold">
              Manage
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-900 text-[15px]">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {activity.map((item) => (
            <div key={item.id} className="p-4 px-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <SettingsIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-[12px] text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[12px] text-gray-500">
                <span className="w-32 truncate">{item.user}</span>
                <span className="w-36 text-right">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
          <button className="text-[13px] font-semibold text-[#00D9D9] hover:underline">View All Activity</button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-sm mt-auto py-4">
        <SettingsIcon className="w-4 h-4" />
        <span>Nexvelt POS Version 2.4.0</span>
      </div>
      
    </div>
  );
}
