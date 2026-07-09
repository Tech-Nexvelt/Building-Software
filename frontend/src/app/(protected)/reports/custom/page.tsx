"use client";

import { useState, useEffect } from "react";
import { Hammer, Download, Save } from "lucide-react";
import { useReportsStore } from "@/store/useReportsStore";

export default function CustomBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const { triggerExport } = useReportsStore();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Custom Report Builder</h1>
          <p className="text-xs font-medium text-gray-500">Select modules, columns, and filters to generate tailored reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"><Save className="h-4 w-4"/> Save Template</button>
          <button onClick={() => triggerExport('Custom_Report.csv')} className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Generate & Download</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Hammer className="h-4 w-4"/> Build Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Data Source</label>
                <select className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none">
                  <option>Transactions & Invoices</option>
                  <option>Menu Items</option>
                  <option>Customers</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Select Columns</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00D9D9]" /> Transaction ID</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00D9D9]" /> Amount</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00D9D9]" /> Payment Method</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-gray-300 text-[#00D9D9]" /> Customer Name</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
