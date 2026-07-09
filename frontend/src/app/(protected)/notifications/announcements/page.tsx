"use client";

import { useState, useEffect } from "react";
import { Megaphone, Info, AlertTriangle } from "lucide-react";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function AnnouncementsPage() {
  const [mounted, setMounted] = useState(false);
  const { announcements } = useNotificationStore();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">System Announcements</h1>
          <p className="text-xs font-medium text-gray-500">Platform updates, holiday notices, and maintenance alerts</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden p-6 space-y-6">
           {announcements.map(a => (
             <div key={a.id} className="flex gap-4 items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className={`mt-1 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${a.type === 'Warning' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                  {a.type === 'Warning' ? <AlertTriangle className="h-6 w-6"/> : <Info className="h-6 w-6"/>}
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">{a.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{a.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-400">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{a.author}</span>
                    <span>•</span>
                    <span>{a.time}</span>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
