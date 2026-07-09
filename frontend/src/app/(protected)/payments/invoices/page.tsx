"use client";

import { useState, useEffect } from "react";
import { Download, Printer, Search } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function InvoicesPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions } = usePaymentsStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const validInvoices = transactions.filter(t => t.status === 'Paid' && t.invoiceNo.includes(search));

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Invoices</h1>
          <p className="text-xs font-medium text-gray-500">View and download generated invoices</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoice number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Invoice No</th><th className="px-4 py-4">Order No</th><th className="px-4 py-4">Amount</th><th className="px-4 py-4">Date Generated</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {validInvoices.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.invoiceNo}</td>
                  <td className="px-4 py-4">{txn.orderNo}</td>
                  <td className="px-4 py-4 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-4">{txn.dateTime}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-[#00D9D9] hover:text-white transition-colors"><Printer className="h-4 w-4"/></button>
                      <button className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-[#00D9D9] hover:text-white transition-colors"><Download className="h-4 w-4"/></button>
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
