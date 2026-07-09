"use client";

import { useState, useEffect } from "react";
import { Download, Eye } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function SuccessfulPaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const paidTxns = transactions.filter(t => t.status === 'Paid');

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Successful Payments</h1>
          <p className="text-xs font-medium text-gray-500">Completed and settled transactions</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-green-50/30 text-xs font-bold text-green-900 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Gateway</th><th className="px-4 py-4">Time</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paidTxns.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">{txn.gateway}</td>
                  <td className="px-4 py-4 text-gray-500">{txn.dateTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-green-600"><Eye className="h-5 w-5 ml-auto" /></button>
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
