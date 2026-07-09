"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function CustomerRequestsPage() {
  const [mounted, setMounted] = useState(false);
  const { notifications, markAsRead } = useNotificationStore();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const requestAlerts = notifications.filter(n => n.category === 'Request');

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Customer Requests</h1>
          <p className="text-xs font-medium text-gray-500">Live requests from QR table menus (water, bill, waiter)</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden p-4">
          <div className="space-y-2">
            {requestAlerts.map(n => (
              <div key={n.id} onClick={() => markAsRead(n.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors border border-gray-100 ${!n.read ? 'bg-purple-50/50 border-purple-100' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${!n.read ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                    <UserPlus className="h-5 w-5"/>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{n.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-400">{n.time}</span>
                  {!n.read && <div className="h-2 w-2 rounded-full bg-purple-500"></div>}
                </div>
              </div>
            ))}
            {requestAlerts.length === 0 && <p className="text-sm text-center text-gray-500 py-10">No customer requests found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
