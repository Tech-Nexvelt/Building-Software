"use client";

import { useState, useEffect } from "react";
import { useQRStore, QRCodeData } from "@/store/useQRStore";
import { QrCode, Search, Filter, Download, Plus, Eye, MoreVertical } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodesDashboardPage() {
  const { qrCodes, getStats, selectedQRCodes, toggleSelection, selectAll, clearSelection } = useQRStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = getStats();
  const isAllSelected = selectedQRCodes.length === qrCodes.length && qrCodes.length > 0;

  const getStatusBadge = (status: QRCodeData['status']) => {
    switch (status) {
      case 'active': return <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">Assigned</span>;
      case 'inactive': return <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">Inactive</span>;
      case 'unassigned': return <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-700">Unassigned</span>;
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-button-gradient text-white shadow-sm">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">QR Code Management</h1>
            <p className="text-xs font-medium text-gray-500">Manage, generate, assign and track QR codes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search QR ID, Table, Floor..."
              className="w-72 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total QR Codes</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{qrCodes.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><QrCode className="h-5 w-5" /></div>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-700 uppercase">Active</p>
              <h3 className="text-2xl font-black text-green-800 mt-1">{stats.active}</h3>
            </div>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-700 uppercase">Inactive</p>
              <h3 className="text-2xl font-black text-red-800 mt-1">{stats.inactive}</h3>
            </div>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-yellow-700 uppercase">Unassigned</p>
              <h3 className="text-2xl font-black text-yellow-800 mt-1">{stats.unassigned}</h3>
            </div>
          </div>
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-700 uppercase">Total Scans</p>
              <h3 className="text-2xl font-black text-purple-800 mt-1">{stats.totalScans}</h3>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6">
          
          {/* Left Panel: QR List */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h2 className="font-bold text-gray-900">All QR Codes</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
                  <Filter className="h-3 w-3" /> Filters
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 shadow-sm">
                  <Plus className="h-4 w-4" /> Generate QR
                </button>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 w-12 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]"
                        checked={isAllSelected}
                        onChange={() => isAllSelected ? clearSelection() : selectAll()}
                      />
                    </th>
                    <th className="px-4 py-3">QR ID</th>
                    <th className="px-4 py-3">Table</th>
                    <th className="px-4 py-3">Floor</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Total Scans</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {qrCodes.map((qr) => (
                    <tr key={qr.id} className={`hover:bg-gray-50 transition-colors ${selectedQRCodes.includes(qr.id) ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-4 py-3 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]"
                          checked={selectedQRCodes.includes(qr.id)}
                          onChange={() => toggleSelection(qr.id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{qr.qr_code_id}</td>
                      <td className="px-4 py-3">{qr.table_number || '-'}</td>
                      <td className="px-4 py-3">{qr.floor}</td>
                      <td className="px-4 py-3">{getStatusBadge(qr.status)}</td>
                      <td className="px-4 py-3 font-medium">{qr.total_scans}</td>
                      <td className="px-4 py-3 text-right flex justify-end gap-2">
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><Eye className="h-4 w-4" /></button>
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><Download className="h-4 w-4" /></button>
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><MoreVertical className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-gray-50/50">
              <span className="text-xs text-gray-500">Showing 1 to {qrCodes.length} of {qrCodes.length} results</span>
              <div className="flex items-center gap-1">
                <button className="h-7 px-2 border rounded bg-white text-xs text-gray-400" disabled>&lt;</button>
                <button className="h-7 w-7 border rounded border-[#00D9D9] bg-[#00D9D9]/10 text-xs font-bold text-[#00D9D9]">1</button>
                <button className="h-7 px-2 border rounded bg-white text-xs text-gray-400 hover:bg-gray-50">&gt;</button>
              </div>
            </div>
          </div>

          {/* Right Panel: Selected Actions / Preview */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">
            
            <div className="rounded-2xl border border-[#00D9D9]/20 bg-gradient-to-b from-[#00D9D9]/5 to-transparent p-6 text-center flex flex-col items-center">
              <div className="rounded-2xl bg-white p-4 shadow-sm mb-4 border border-gray-100 relative group">
                <QRCodeSVG value={`https://nexrestro.com/qr/T-25`} size={140} level="H" includeMargin={false} className="opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer">
                  <span className="font-bold text-sm text-[#00D9D9]">Preview</span>
                </div>
              </div>
              <h3 className="font-black text-gray-900">Need QR Stickers?</h3>
              <p className="text-xs text-gray-500 mt-2 mb-4">Print beautiful branded QR stickers for your tables in bulk.</p>
              <button className="w-full rounded-xl border-2 border-[#00D9D9] py-2.5 text-sm font-bold text-[#00D9D9] hover:bg-[#00D9D9]/5 transition-colors">
                Go to Print Center
              </button>
            </div>

            {selectedQRCodes.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{selectedQRCodes.length} QRs Selected</h3>
                <div className="flex flex-col gap-2">
                  <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 py-2 text-sm font-bold text-white hover:bg-gray-800">
                    <Download className="h-4 w-4" /> Download Selected
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    Assign Tables
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
