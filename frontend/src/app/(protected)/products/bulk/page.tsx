"use client";

import { useState, useEffect } from "react";
import { Upload, Download, RefreshCw, AlertTriangle } from "lucide-react";

export default function BulkOperationsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Bulk Operations</h1>
          <p className="text-xs font-medium text-gray-500">Update multiple items at once via CSV or macros</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Import Menu (CSV)</h3>
            <p className="text-sm text-gray-500 mb-6">Upload a CSV file to create or update multiple items at once.</p>
            <button className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
              Select CSV File
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4">
              <Download className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Export Menu</h3>
            <p className="text-sm text-gray-500 mb-6">Download your entire menu catalog as a CSV for reporting.</p>
            <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Export Full Catalog
            </button>
          </div>

          <div className="col-span-2 rounded-2xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-orange-900 mb-1">Bulk Price Update</h3>
              <p className="text-sm text-orange-700 mb-4">Apply a percentage or flat increase/decrease to all items in a specific category.</p>
              <button className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600 transition-colors">
                Configure Price Update
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
