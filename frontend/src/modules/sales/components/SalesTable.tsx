"use client";

import { Eye, Printer, Download, RotateCcw, Search, ChevronDown, Filter as FilterIcon, MoreHorizontal } from 'lucide-react';
import { SaleTransaction } from '../types/sales.types';
import { useSalesStore } from '../store/useSalesStore';
import { formatCurrency, cn } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';

export function SalesTable({ transactions }: { transactions: SaleTransaction[] }) {
  const { filters, setSearchQuery } = useSalesStore();

  // Apply filters locally for demo
  const filteredData = useMemo(() => {
    let result = transactions;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(t => t.billNo.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q));
    }
    if (filters.paymentMethod !== 'All') {
      result = result.filter(t => t.paymentMethod === filters.paymentMethod);
    }
    if (filters.orderType !== 'All Types') {
      result = result.filter(t => t.orderType === filters.orderType);
    }
    if (filters.status !== 'All Statuses') {
      result = result.filter(t => t.status === filters.status);
    }
    return result;
  }, [transactions, filters]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#00D9D9] transition-colors" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] sm:text-sm transition-all"
            placeholder="Search by bill no, receipt no, customer..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            Date Range
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            Payment Method
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
            Status
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block shrink-0"></div>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
            <FilterIcon className="w-4 h-4 text-gray-500" />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-5 py-4 w-[40px]">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]" />
              </th>
              <th className="px-5 py-4">Bill No.</th>
              <th className="px-5 py-4">Receipt No.</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Order Type</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Cashier</th>
              <th className="px-5 py-4 text-center">Items</th>
              <th className="px-5 py-4 text-right">Amount</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4">Date & Time</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-5 py-8 text-center text-gray-500">
                  No transactions match the selected filters.
                </td>
              </tr>
            ) : filteredData.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-5 py-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]" />
                </td>
                <td className="px-5 py-3 font-semibold text-gray-900">{t.billNo}</td>
                <td className="px-5 py-3 text-gray-500">{t.receiptNo}</td>
                <td className="px-5 py-3 text-gray-900">{t.customerName}</td>
                <td className="px-5 py-3 text-gray-600">{t.orderType}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {t.paymentMethod}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-600">{t.cashierName}</td>
                <td className="px-5 py-3 text-center text-gray-900 font-medium">{t.itemsCount}</td>
                <td className="px-5 py-3 text-right font-semibold text-gray-900">{formatCurrency(t.amount)}</td>
                <td className="px-5 py-3 text-center">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-5 py-3 text-gray-500">{t.date}, {t.time}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-[#00D9D9] hover:bg-[#E6F8F8] rounded-md transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Print Receipt">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Download Invoice">
                      <Download className="w-4 h-4" />
                    </button>
                    {t.status === 'Completed' && (
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Issue Refund">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">0 selected</span>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
            Bulk Export <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <button className="px-3 py-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors" disabled>Prev</button>
          <button className="px-3 py-1 rounded-md bg-[#00D9D9] text-white shadow-sm">1</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">2</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">3</button>
          <span className="px-2 text-gray-400">...</span>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">50</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-600 border border-green-100">{status}</span>;
  }
  if (status === 'Refunded' || status === 'Cancelled') {
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100">{status}</span>;
  }
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">{status}</span>;
}
