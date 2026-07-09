"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, Mail } from "lucide-react";

export default function ScheduledReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Scheduled Reports</h1>
          <p className="text-xs font-medium text-gray-500">Manage automated report deliveries</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Plus className="h-4 w-4"/> New Schedule</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/50 font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Report Name</th>
                <th className="px-4 py-3">Frequency</th>
                <th className="px-4 py-3">Next Delivery</th>
                <th className="px-4 py-3">Recipients</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">Daily Closing Summary</td>
                <td className="px-4 py-4">Daily at 11:30 PM</td>
                <td className="px-4 py-4 text-blue-600 font-bold">Today, 11:30 PM</td>
                <td className="px-4 py-4 flex items-center gap-1"><Mail className="h-3 w-3"/> admin@nexrestro.com</td>
                <td className="px-4 py-4"><span className="inline-flex px-2 py-1 rounded font-bold bg-green-100 text-green-700">Active</span></td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">Weekly Sales & Tax</td>
                <td className="px-4 py-4">Weekly (Monday)</td>
                <td className="px-4 py-4">Mon, 18 May 2025</td>
                <td className="px-4 py-4 flex items-center gap-1"><Mail className="h-3 w-3"/> accountant@nexrestro.com</td>
                <td className="px-4 py-4"><span className="inline-flex px-2 py-1 rounded font-bold bg-green-100 text-green-700">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
