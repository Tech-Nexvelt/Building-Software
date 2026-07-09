"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function TaxReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Tax Reports</h1>
          <p className="text-xs font-medium text-gray-500">View tax summary and liabilities</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export Report</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Tax Collection Summary (Today)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">Net Sales (Before Tax)</span>
                <span className="text-base font-bold text-gray-900">₹1,18,628</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">CGST (2.5%)</span>
                <span className="text-base font-bold text-orange-600">₹2,966</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">SGST (2.5%)</span>
                <span className="text-base font-bold text-orange-600">₹2,966</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mt-2">
                <span className="text-sm font-black text-gray-900">Total Gross Sales</span>
                <span className="text-lg font-black text-[#00D9D9]">₹1,24,560</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
