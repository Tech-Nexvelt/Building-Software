"use client";

import { useState, useEffect } from "react";
import { 
  Bell, CheckCheck, Trash2, Search, Filter, AlertTriangle, 
  Wallet, UserPlus, CircleDot, Megaphone, Info, MoreVertical,
  BellRing, Settings, Smartphone, Volume2, Mail, ChevronRight
} from "lucide-react";
import { useNotificationStore, Notification, Announcement } from "@/store/useNotificationStore";

export default function NotificationsDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { notifications, announcements, markAsRead, markAllAsRead, clearAll, addNotification } = useNotificationStore();

  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const unreadCount = notifications.filter(n => !n.read).length;
  const pinnedNotifications = notifications.filter(n => n.priority === 'High' || n.category === 'Announcement').slice(0, 3);
  const highPriorityCount = notifications.filter(n => n.priority === 'High').length;
  const kitchenAlertsCount = notifications.filter(n => n.category === 'Kitchen').length;
  const paymentAlertsCount = notifications.filter(n => n.category === 'Payment').length;
  const requestsCount = notifications.filter(n => n.category === 'Request').length;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Notification Center</h1>
          <p className="text-sm font-medium text-gray-500">Stay updated with real-time alerts, updates and announcements</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search notification, order..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm font-medium outline-none focus:border-[#00D9D9] transition-all" />
          </div>
          <button onClick={markAllAsRead} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
          <button onClick={clearAll} className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100">
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-6 gap-4">
          <KPICard title="Unread" value={unreadCount} icon={<Bell className="h-5 w-5 text-blue-600" />} trend="+20%" trendColor="text-green-500" />
          <KPICard title="Today's Notifications" value={notifications.length} icon={<ClockIcon className="h-5 w-5 text-orange-500" />} trend="+15%" />
          <KPICard title="High Priority Alerts" value={highPriorityCount} icon={<AlertTriangle className="h-5 w-5 text-red-500" />} trend="+25%" />
          <KPICard title="Kitchen Alerts" value={kitchenAlertsCount} icon={<BellRing className="h-5 w-5 text-yellow-500" />} trend="+18%" />
          <KPICard title="Payment Alerts" value={paymentAlertsCount} icon={<Wallet className="h-5 w-5 text-green-500" />} trend="+10%" />
          <KPICard title="Customer Requests" value={requestsCount} icon={<UserPlus className="h-5 w-5 text-purple-500" />} trend="+5%" />
        </div>

        {/* Pinned & Announcements Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">Pinned Notifications</h3>
              <span className="text-xs font-bold text-gray-400">{pinnedNotifications.length}</span>
            </div>
            <div className="space-y-4 flex-1">
              {pinnedNotifications.map(n => <NotificationItem key={`pin-${n.id}`} notif={n} />)}
            </div>
            <button className="mt-4 w-full text-xs font-bold text-[#00D9D9] py-2 border-t border-gray-100 hover:bg-gray-50 rounded-b-xl">View all pinned</button>
          </div>

          <div className="col-span-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><Megaphone className="h-4 w-4 text-gray-400"/> Announcements</h3>
              <span className="text-xs font-bold text-gray-400">{announcements.length}</span>
            </div>
            <div className="space-y-4 flex-1">
               {announcements.slice(0,2).map(a => (
                 <div key={a.id} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${a.type === 'Warning' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {a.type === 'Warning' ? <AlertTriangle className="h-4 w-4"/> : <Info className="h-4 w-4"/>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{a.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{a.description}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{a.author} • {a.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="mt-4 w-full text-xs font-bold text-[#00D9D9] py-2 border-t border-gray-100 hover:bg-gray-50 rounded-b-xl">View all announcements</button>
          </div>

          <div className="col-span-3 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Filters</h3>
              <div className="space-y-3 text-xs font-bold text-gray-600">
                <div className="flex justify-between hover:text-[#00D9D9] cursor-pointer"><span className="flex items-center gap-2"><Bell className="h-4 w-4"/> Unread</span><span>{unreadCount}</span></div>
                <div className="flex justify-between hover:text-[#00D9D9] cursor-pointer"><span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500"/> High Priority</span><span>{highPriorityCount}</span></div>
                <div className="flex justify-between hover:text-[#00D9D9] cursor-pointer"><span className="flex items-center gap-2"><CircleDot className="h-4 w-4 text-green-500"/> Mentions</span><span>2</span></div>
                <div className="flex justify-between hover:text-[#00D9D9] cursor-pointer"><span className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-blue-500"/> Action Required</span><span>8</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-9 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">All Notifications</h3>
                <span className="text-xs font-bold text-gray-400">{notifications.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <select className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-bold text-gray-700 outline-none"><option>All Categories</option></select>
                <select className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-bold text-gray-700 outline-none"><option>All Priorities</option></select>
                <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50"><Filter className="h-4 w-4"/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[600px] p-2">
              {notifications.map(n => (
                <div key={n.id} onClick={() => markAsRead(n.id)} className={`flex items-start justify-between p-4 rounded-xl mb-1 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                  <div className="flex gap-4">
                    <div className="mt-1">
                      {getIconForCategory(n.category)}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{n.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                     <span className={`px-2 py-1 rounded font-bold text-[10px] ${getPriorityColor(n.priority)}`}>{n.priority}</span>
                     <span className="text-gray-400 w-20 text-right">{n.time}</span>
                     <div className="w-2 flex justify-center">
                        {!n.read && <div className="h-2 w-2 rounded-full bg-[#00D9D9]"></div>}
                     </div>
                     <button className="text-gray-400 hover:text-gray-900"><MoreVertical className="h-4 w-4"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-3 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Notification Preferences</h3>
              <p className="text-[11px] text-gray-500 mb-4">Manage how you receive notifications</p>
              <div className="space-y-2">
                <PrefButton icon={<Settings className="h-4 w-4 text-gray-500"/>} text="Notification Preferences" />
                <PrefButton icon={<Mail className="h-4 w-4 text-gray-500"/>} text="Email Preferences" />
                <PrefButton icon={<Volume2 className="h-4 w-4 text-gray-500"/>} text="Sound & Alerts" />
                <PrefButton icon={<Bell className="h-4 w-4 text-gray-500"/>} text="Do Not Disturb" val="Off" />
                <PrefButton icon={<Smartphone className="h-4 w-4 text-gray-500"/>} text="Manage Devices" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, trendColor = "text-green-500" }: { title: string, value: number, icon: any, trend: string, trendColor?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-[11px] font-bold text-gray-500 leading-tight">{title}</h3>
      </div>
      <div>
        <p className="text-xl font-black text-gray-900">{value}</p>
        <p className={`text-[10px] font-bold ${trendColor} mt-1 flex items-center`}>
          {trend} <span className="text-gray-400 ml-1 font-medium">vs yesterday</span>
        </p>
      </div>
    </div>
  );
}

function PrefButton({ icon, text, val }: { icon: any, text: string, val?: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-3 text-xs font-bold text-gray-700">
        {icon} {text}
      </div>
      <div className="flex items-center gap-2">
        {val && <span className="text-xs font-bold text-gray-500">{val}</span>}
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </button>
  );
}

function NotificationItem({ notif }: { notif: Notification }) {
  return (
     <div className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0 cursor-pointer group">
        <div className="mt-0.5">
          {getIconForCategory(notif.category)}
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#00D9D9] transition-colors">{notif.title}</h4>
          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{notif.description}</p>
        </div>
        <div className="text-right">
           <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${getPriorityColor(notif.priority)}`}>{notif.priority}</span>
        </div>
     </div>
  );
}

function ClockIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }

function getIconForCategory(cat: Notification['category']) {
  switch (cat) {
    case 'Order': return <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><CircleDot className="h-4 w-4"/></div>;
    case 'Payment': return <div className="h-8 w-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center"><CheckCheck className="h-4 w-4"/></div>;
    case 'Kitchen': return <div className="h-8 w-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><AlertTriangle className="h-4 w-4"/></div>;
    case 'Request': return <div className="h-8 w-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><UserPlus className="h-4 w-4"/></div>;
    case 'Announcement': return <div className="h-8 w-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Megaphone className="h-4 w-4"/></div>;
    default: return <div className="h-8 w-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center"><Bell className="h-4 w-4"/></div>;
  }
}

function getPriorityColor(prio: Notification['priority']) {
  switch (prio) {
    case 'High': return 'bg-red-50 text-red-600';
    case 'Medium': return 'bg-orange-50 text-orange-600';
    case 'Low': return 'bg-blue-50 text-blue-600';
    default: return 'bg-gray-100 text-gray-600';
  }
}
