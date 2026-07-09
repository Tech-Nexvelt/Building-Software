"use client";

import { useState, useEffect } from "react";
import { Landmark, Download } from "lucide-react";

export default function SettlementsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Settlements</h1>
          <p className="text-xs font-medium text-gray-500">Track payouts from payment gateways to your bank</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
          <Download className="h-4 w-4" /> Download Report
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-2">Next Payout (Est.)</h3>
            <p className="text-2xl font-black text-gray-900">₹45,200</p>
            <p className="text-xs font-medium text-blue-600 mt-2 bg-blue-50 inline-block px-2 py-1 rounded">Expected: Today, 11:00 PM</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 mb-2">Last Settlement</h3>
            <p className="text-2xl font-black text-gray-900">₹85,760</p>
            <p className="text-xs font-bold text-green-600 mt-2 bg-green-50 inline-block px-2 py-1 rounded">Settled to Bank</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Settlement History</h3>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Settlement ID</th><th className="px-4 py-4">Date</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Gateway</th><th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2"><Landmark className="h-4 w-4 text-gray-400"/> STL-1004</td>
                <td className="px-4 py-4">11 May 2025</td>
                <td className="px-4 py-4 font-bold text-gray-900">₹85,760</td>
                <td className="px-4 py-4">Multiple</td>
                <td className="px-4 py-4"><span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">Settled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
