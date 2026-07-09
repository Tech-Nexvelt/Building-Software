"use client";

import { Eye, Printer, Download, Mail, MoreHorizontal, Search, Calendar, Filter as FilterIcon, Download as Export } from 'lucide-react';
import { Receipt } from '../types/receipt.types';
import { formatCurrency, cn } from '@/lib/utils';
import Link from 'next/link';

export function ReceiptHistoryTable({ receipts }: { receipts: Receipt[] }) {
  if (!receipts || receipts.length === 0) return <div>No receipts found.</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#00D9D9] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] sm:text-sm transition-all"
            placeholder="Search receipts..."
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            Date Range
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FilterIcon className="w-4 h-4 text-gray-500" />
            More Filters
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Export className="w-4 h-4 text-gray-500" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Receipt No.</th>
              <th className="px-6 py-4">Bill No.</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Printed By</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {receipts.map((receipt) => (
              <tr key={receipt.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-gray-900">{receipt.receiptNo}</td>
                <td className="px-6 py-4 text-gray-500">{receipt.orderNo}</td>
                <td className="px-6 py-4 text-gray-900">{receipt.customerName || 'Walk-in'}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {receipt.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(receipt.grandTotal)}</td>
                <td className="px-6 py-4 text-gray-600">{receipt.cashier}</td>
                <td className="px-6 py-4 text-gray-500">{receipt.date}, {receipt.time}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={receipt.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/receipts/${receipt.id}/preview`} className="p-1.5 text-gray-400 hover:text-[#00D9D9] hover:bg-[#E6F8F8] rounded-md transition-colors" title="View Preview">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Print Again">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Email">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <span className="text-sm text-gray-500">
          Showing 1 to {receipts.length} of 128 receipts
        </span>
        <div className="flex items-center gap-1 text-sm font-medium">
          <button className="px-3 py-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors" disabled>Prev</button>
          <button className="px-3 py-1 rounded-md bg-[#00D9D9] text-white shadow-sm">1</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">2</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') {
    return <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">{status}</span>;
  }
  if (status === 'Cancelled' || status === 'Refunded') {
    return <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">{status}</span>;
  }
  return <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">{status}</span>;
}
