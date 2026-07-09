"use client";

import { useState, useEffect } from "react";
import { useReceptionStore, Table } from "@/store/useReceptionStore";
import { Search, Monitor, LayoutDashboard } from "lucide-react";

export default function ReceptionDashboardPage() {
  const { tables, getStats, selectedTable, setSelectedTable } = useReceptionStore();
  const [mounted, setMounted] = useState(false);
  const [activeFloor, setActiveFloor] = useState("Ground Floor");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = getStats();
  const currentTables = tables.filter(t => t.floor_name === activeFloor);

  const getStatusColor = (status: Table['status']) => {
    switch(status) {
      case 'available': return 'bg-green-100 border-green-400 text-green-800';
      case 'occupied': return 'bg-red-100 border-red-400 text-red-800 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'billing': return 'bg-orange-100 border-orange-400 text-orange-800 animate-pulse';
      case 'reserved': return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'cleaning': return 'bg-gray-100 border-gray-400 text-gray-800 opacity-70';
      default: return 'bg-white';
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-50/50">
      
      {/* LEFT: Floor Plan & Dashboard */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        
        {/* Top Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-button-gradient text-white shadow-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Reception</h1>
              <p className="text-xs font-medium text-gray-500">Live Floor Management</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search table, invoice..."
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4 p-6 pb-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-bold text-green-600 uppercase">Available</p>
            <h3 className="text-2xl font-black text-green-700">{stats.available}</h3>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-bold text-red-600 uppercase">Occupied</p>
            <h3 className="text-2xl font-black text-red-700">{stats.occupied}</h3>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-xs font-bold text-orange-600 uppercase">Pending Bills</p>
            <h3 className="text-2xl font-black text-orange-700">{stats.billing}</h3>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-xs font-bold text-yellow-600 uppercase">Reserved</p>
            <h3 className="text-2xl font-black text-yellow-700">{stats.reserved}</h3>
          </div>
        </div>

        {/* Floor Map Area */}
        <div className="flex-1 flex flex-col p-6 pt-4">
          <div className="mb-4 flex gap-2">
            {['Ground Floor', 'First Floor'].map((f) => (
              <button 
                key={f} 
                onClick={() => setActiveFloor(f)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${activeFloor === f ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative flex-1 rounded-2xl border-2 border-dashed border-gray-300 bg-white shadow-inner overflow-hidden">
            {/* Render Tables using Absolute Positioning */}
            {currentTables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                style={{ left: `${table.x_coord}%`, top: `${table.y_coord}%` }}
                className={`absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border-2 shadow-sm transition-all hover:scale-105 ${table.shape === 'circle' ? 'rounded-full' : ''} ${getStatusColor(table.status)} ${selectedTable?.id === table.id ? 'ring-4 ring-[#00D9D9] ring-offset-2' : ''}`}
              >
                <span className="text-lg font-black">{table.table_number}</span>
                <span className="text-xs font-medium">{table.capacity} Pax</span>
                
                {table.elapsed_minutes !== undefined && (
                  <span className="mt-1 rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-bold">
                    {Math.floor(table.elapsed_minutes / 60)}h {table.elapsed_minutes % 60}m
                  </span>
                )}
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4 rounded-xl bg-white/90 p-3 shadow-md backdrop-blur-sm">
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green-400"></div><span className="text-[10px] font-bold text-gray-600 uppercase">Available</span></div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-red-400"></div><span className="text-[10px] font-bold text-gray-600 uppercase">Occupied</span></div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-orange-400"></div><span className="text-[10px] font-bold text-gray-600 uppercase">Billing</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Table Billing & Session Drawer */}
      <div className="w-[400px] flex-shrink-0 bg-white flex flex-col h-full shadow-[-4px_0_15px_rgba(0,0,0,0.05)] relative z-10">
        {selectedTable ? (
          <div className="flex h-full flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-gray-900">{selectedTable.table_number}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium uppercase tracking-wide ${getStatusColor(selectedTable.status).replace('bg-', 'text-').replace('-100', '-700').split(' ')[0]} bg-opacity-10`}>
                    {selectedTable.status}
                  </span>
                  <span className="text-sm font-medium text-gray-500">• {selectedTable.capacity} Guests</span>
                </div>
              </div>
              <button onClick={() => setSelectedTable(null)} className="text-gray-400 hover:text-gray-900 text-xl font-bold p-2">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
               {selectedTable.status === 'available' || selectedTable.status === 'cleaning' ? (
                 <div className="text-center">
                   <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                     <Monitor className="h-6 w-6" />
                   </div>
                   <h3 className="font-bold text-gray-900">Table Available</h3>
                   <p className="text-xs text-gray-500 mt-1">Ready for next guests.</p>
                   <button className="mt-4 rounded-xl bg-button-gradient px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90">Open Table</button>
                 </div>
               ) : (
                 <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">Billing details component pending in next step.</p>
                 </div>
               )}
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 border-2 border-dashed border-gray-200">
              <Monitor className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Table Selected</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-[250px]">Click on any table from the floor map to view active sessions, running bills, and manage checkouts.</p>
          </div>
        )}
      </div>

    </div>
  );
}
