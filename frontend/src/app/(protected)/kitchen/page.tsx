"use client";

import { useState, useEffect } from "react";
import { useKitchenStore } from "@/store/useKitchenStore";
import { ChefHat, Search, Volume2, VolumeX, ListFilter, LayoutGrid } from "lucide-react";
import { KitchenKanbanBoard } from "@/components/kitchen/KitchenKanbanBoard";

export default function KitchenDashboardPage() {
  const { soundAlertsEnabled, toggleSoundAlerts, newOrders, preparing, ready } = useKitchenStore();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Top Action Bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-button-gradient text-white shadow-sm">
            <ChefHat className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Main Kitchen</h1>
            <p className="text-xs font-medium text-gray-500">Live KDS System • Online</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search order / table..."
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>

          {/* Sound Alerts Toggle */}
          <button
            onClick={() => toggleSoundAlerts(!soundAlertsEnabled)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              soundAlertsEnabled 
                ? 'border-[#00D9D9]/30 bg-[#00D9D9]/10 text-[#00D9D9]' 
                : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {soundAlertsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            {soundAlertsEnabled ? 'Sound On' : 'Sound Off'}
          </button>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`rounded-md p-1.5 transition-colors ${viewMode === 'kanban' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
            >
              <ListFilter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4 p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">New Orders</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-gray-900">{newOrders.length}</h3>
            <span className="flex h-6 items-center rounded bg-red-100 px-2 text-xs font-bold text-red-600">Urgent</span>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Preparing</p>
          <h3 className="text-3xl font-black text-orange-500">{preparing.length}</h3>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Ready</p>
          <h3 className="text-3xl font-black text-[#00D9D9]">{ready.length}</h3>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Avg Prep Time</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-gray-900">18</h3>
            <span className="text-sm font-bold text-gray-500 mb-1">min</span>
          </div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Delayed</p>
          <h3 className="text-3xl font-black text-red-600">3</h3>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-hidden px-6 pb-6">
        {viewMode === 'kanban' ? (
          <KitchenKanbanBoard />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <h2 className="text-lg font-bold text-gray-900">List View Coming Soon</h2>
          </div>
        )}
      </div>
    </div>
  );
}
