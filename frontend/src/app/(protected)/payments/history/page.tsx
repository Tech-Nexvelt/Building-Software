"use client";

import { useState, useEffect } from "react";
import { History, Search, Download } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function PaymentHistoryPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Payment History</h1>
          <p className="text-xs font-medium text-gray-500">Immutable ledger of all financial activities</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
          <Download className="h-4 w-4" /> Export Ledger
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Log ID</th><th className="px-4 py-4">Action</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(txn => (
                <tr key={`log-${txn.id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2"><History className="h-4 w-4 text-gray-400"/> LOG-{txn.id.split('-')[1]}</td>
                  <td className="px-4 py-4">Payment {txn.status === 'Paid' ? 'Collected' : txn.status === 'Refunded' ? 'Refunded' : 'Attempted'}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">
                     <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold ${
                      txn.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      txn.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      txn.status === 'Failed' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>{txn.status}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{txn.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
