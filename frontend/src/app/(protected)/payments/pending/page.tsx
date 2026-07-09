"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Eye, MoreVertical } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function PendingPaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const pendingTxns = transactions.filter(t => t.status === 'Pending');

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Pending Payments</h1>
          <p className="text-xs font-medium text-gray-500">Payments waiting for gateway confirmation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-orange-50 text-orange-600 px-4 py-2 text-xs font-bold hover:bg-orange-100 transition-colors">
            <RefreshCw className="h-4 w-4" /> Verify All Pending
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-orange-50/30 text-xs font-bold text-orange-900 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Gateway</th><th className="px-4 py-4">Time</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingTxns.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">{txn.gateway}</td>
                  <td className="px-4 py-4 text-gray-500">{txn.dateTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded bg-orange-100 text-orange-700 px-3 py-1.5 text-xs font-bold hover:bg-orange-200 transition-colors">Verify Status</button>
                  </td>
                </tr>
              ))}
              {pendingTxns.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">No pending payments.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
