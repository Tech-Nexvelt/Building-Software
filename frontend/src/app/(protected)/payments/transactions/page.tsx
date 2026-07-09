"use client";

import { useState, useEffect } from "react";
import { Search, Download, Filter, Eye, MoreVertical } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function TransactionsPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = transactions.filter(t => t.id.includes(search) || t.invoiceNo.includes(search) || t.orderNo.includes(search));

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">All Transactions</h1>
          <p className="text-xs font-medium text-gray-500">View and search across all payment activities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ID, Invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-sm"><Filter className="h-4 w-4"/> Filters</button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-sm"><Download className="h-4 w-4"/> Export</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th><th className="px-4 py-4">Invoice No</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Method</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Gateway</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-4 py-4">{txn.invoiceNo}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">{txn.paymentMethod}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                      txn.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      txn.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      txn.status === 'Failed' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>{txn.status}</span>
                  </td>
                  <td className="px-4 py-4">{txn.gateway}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-[#00D9D9]"><Eye className="h-4 w-4"/></button>
                      <button className="p-1 text-gray-400 hover:text-gray-900"><MoreVertical className="h-4 w-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
