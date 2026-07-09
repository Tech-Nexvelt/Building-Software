"use client";

import { useState, useEffect } from "react";
import { Wallet, Settings2, CheckCircle2 } from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";

export default function GatewaysPage() {
  const [mounted, setMounted] = useState(false);
  const { gateways } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Payment Gateways</h1>
          <p className="text-xs font-medium text-gray-500">Manage payment provider integrations</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {gateways.map(g => (
            <div key={g.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {g.status}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{g.name}</h3>
                <p className="text-xs text-gray-500">Live API Key Configured</p>
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings2 className="h-4 w-4" /> Configure
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
