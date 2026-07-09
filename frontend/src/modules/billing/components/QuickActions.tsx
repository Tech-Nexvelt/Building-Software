"use client";

import { 
  PlusCircle, 
  Save, 
  PauseCircle, 
  PlayCircle, 
  CheckCircle, 
  Printer, 
  XCircle, 
  Copy 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickActions() {
  const actions = [
    { label: 'New Order', shortcut: 'F2', icon: PlusCircle, color: 'text-[#00D9D9]', hover: 'hover:border-[#00D9D9] hover:bg-[#E6F8F8]' },
    { label: 'Save Draft', shortcut: 'F3', icon: Save, color: 'text-gray-500', hover: 'hover:border-gray-300 hover:bg-gray-100' },
    { label: 'Hold Order', shortcut: 'F4', icon: PauseCircle, color: 'text-gray-500', hover: 'hover:border-gray-300 hover:bg-gray-100' },
    { label: 'Resume Order', shortcut: 'F5', icon: PlayCircle, color: 'text-gray-500', hover: 'hover:border-gray-300 hover:bg-gray-100' },
    { label: 'Generate Bill', shortcut: 'F6', icon: CheckCircle, color: 'text-[#00D9D9]', hover: 'hover:border-[#00D9D9] hover:bg-[#E6F8F8]' },
    { label: 'Print Receipt', shortcut: 'F7', icon: Printer, color: 'text-gray-500', hover: 'hover:border-gray-300 hover:bg-gray-100' },
    { label: 'Cancel Order', shortcut: 'F8', icon: XCircle, color: 'text-gray-500', hover: 'hover:border-red-200 hover:bg-red-50 hover:text-red-500' },
    { label: 'Duplicate Order', shortcut: 'F9', icon: Copy, color: 'text-gray-500', hover: 'hover:border-gray-300 hover:bg-gray-100' },
  ];

  return (
    <div className="shrink-0 flex items-center justify-between gap-2 overflow-x-auto p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {actions.map((action, i) => (
        <button 
          key={i}
          className={cn(
            "flex flex-col items-center justify-center py-2 px-4 rounded-xl border border-transparent transition-all group min-w-[90px]",
            action.hover
          )}
        >
          <action.icon className={cn("w-5 h-5 mb-1 transition-colors", action.color)} />
          <span className="text-[11px] font-bold text-gray-700 leading-tight group-hover:text-gray-900">{action.label}</span>
          <span className="text-[10px] font-medium text-gray-400 mt-0.5">{action.shortcut}</span>
        </button>
      ))}
    </div>
  );
}
