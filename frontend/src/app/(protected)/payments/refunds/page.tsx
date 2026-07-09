"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function RefundsPage() {
  const [mounted, setMounted] = useState(false);
  const { refunds } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Refunds</h1>
          <p className="text-xs font-medium text-gray-500">Manage customer refunds and reversals</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-2 text-xs font-bold text-white hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Process Refund
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Refund ID</th><th className="px-4 py-4">Invoice No</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Method</th><th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {refunds.map(refund => (
                <tr key={refund.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{refund.id}</td>
                  <td className="px-4 py-4">{refund.invoiceNo}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{refund.amount}</td>
                  <td className="px-4 py-4">{refund.method}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">{refund.status}</span>
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
