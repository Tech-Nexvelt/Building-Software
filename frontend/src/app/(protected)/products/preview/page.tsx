"use client";

import { useState, useEffect } from "react";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { CustomerMenu } from "@/modules/customer/components/CustomerMenu";

export default function PreviewPage() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Menu Preview</h1>
          <p className="text-xs font-medium text-gray-500">See exactly what your customers see when they scan the QR code</p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
          <button 
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Smartphone className="h-4 w-4" /> Mobile
          </button>
          <button 
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'tablet' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Tablet className="h-4 w-4" /> Tablet
          </button>
          <button 
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Monitor className="h-4 w-4" /> Desktop
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-gray-200/50">
        <div className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 rounded-[2.5rem] border-[12px] border-gray-900 ${
          viewMode === 'mobile' ? 'w-[375px] h-[812px]' : 
          viewMode === 'tablet' ? 'w-[768px] h-[1024px]' : 
          'w-full max-w-5xl h-[800px]'
        }`}>
          <div className="h-full w-full bg-gray-50 flex flex-col overflow-hidden rounded-[1.5rem]">
            <CustomerMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
