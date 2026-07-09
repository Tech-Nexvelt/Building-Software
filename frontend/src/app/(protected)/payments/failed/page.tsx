"use client";

import { useState, useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function FailedPaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const failedTxns = transactions.filter(t => t.status === 'Failed');

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Failed Payments</h1>
          <p className="text-xs font-medium text-gray-500">Transactions that declined or timed out</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-red-50 text-xs font-bold text-red-900 uppercase tracking-wider border-b border-red-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Gateway</th><th className="px-4 py-4">Time</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              {failedTxns.map(txn => (
                <tr key={txn.id} className="hover:bg-red-50/30">
                  <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" /> {txn.id}
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">{txn.gateway}</td>
                  <td className="px-4 py-4 text-gray-500">{txn.dateTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded bg-red-100 text-red-700 px-3 py-1.5 text-xs font-bold hover:bg-red-200 transition-colors inline-flex items-center gap-2">
                      <RotateCcw className="h-3 w-3"/> Retry Payment
                    </button>
                  </td>
                </tr>
              ))}
              {failedTxns.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500">No failed payments.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
