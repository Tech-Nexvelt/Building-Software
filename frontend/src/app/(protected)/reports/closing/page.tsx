"use client";

import { useState, useEffect } from "react";
import { Printer } from "lucide-react";

export default function DailyClosingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Daily Closing Report</h1>
          <p className="text-xs font-medium text-gray-500">Summary for shift handovers and EOD processes</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Printer className="h-4 w-4"/> Print Z-Report</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 text-center mb-1">END OF DAY REPORT</h2>
          <p className="text-xs text-center text-gray-500 mb-8">Date: 12 May 2025 | Branch: Main Branch</p>

          <div className="space-y-4 text-sm font-medium">
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <span className="text-gray-500">Opening Cash Balance</span><span className="text-gray-900">₹10,000</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <span className="text-gray-500">Total Sales (Gross)</span><span className="text-gray-900">₹1,24,560</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <span className="text-gray-500">Total Refunds</span><span className="text-red-500">-₹1,060</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2 mt-6">
              <span className="text-gray-500">Cash Collected</span><span className="text-gray-900">₹22,430</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <span className="text-gray-500">Online Collected (UPI/Card)</span><span className="text-gray-900">₹91,210</span>
            </div>
            <div className="flex justify-between bg-gray-50 p-3 rounded-lg mt-4">
              <span className="font-black text-gray-900">Expected Closing Cash in Drawer</span>
              <span className="font-black text-[#00D9D9] text-lg">₹32,430</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
