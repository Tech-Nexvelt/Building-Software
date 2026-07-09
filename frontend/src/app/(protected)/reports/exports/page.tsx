"use client";

import { useState, useEffect } from "react";
import { FileDown, Download } from "lucide-react";
import { useReportsStore } from "@/store/useReportsStore";

export default function ExportCenterPage() {
  const [mounted, setMounted] = useState(false);
  const { recentExports } = useReportsStore();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Export Center</h1>
          <p className="text-xs font-medium text-gray-500">History of all downloaded and exported files</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/50 font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">File Name</th>
                <th className="px-4 py-3">Exported On</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentExports.map(exp => (
                <tr key={exp.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2"><FileDown className="h-4 w-4 text-red-500"/> {exp.fileName}</td>
                  <td className="px-4 py-4 text-gray-500">{exp.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-[#00D9D9] opacity-0 group-hover:opacity-100 transition-opacity"><Download className="h-4 w-4 ml-auto"/></button>
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
