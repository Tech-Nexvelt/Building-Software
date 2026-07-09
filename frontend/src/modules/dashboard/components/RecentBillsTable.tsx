"use client";

import { Card } from '@/components/ui/card';
import type { RecentBill } from '../types/dashboard.types';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RecentBillsTable({ bills }: { bills: RecentBill[] }) {
  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm rounded-2xl flex flex-col h-full">
      <h3 className="font-semibold text-gray-900 mb-6">Recent Bills</h3>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-[12px] text-gray-400 font-medium border-b border-gray-100">
            <tr>
              <th className="pb-3 font-medium">Bill No.</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Total Amount</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 font-medium text-gray-900">{bill.billNo}</td>
                <td className="py-4 text-gray-600">{bill.customerName}</td>
                <td className="py-4 text-gray-600">{bill.itemsCount}</td>
                <td className="py-4 font-medium text-gray-900">{formatCurrency(bill.totalAmount)}</td>
                <td className="py-4 text-gray-500">{bill.time}</td>
                <td className="py-4 text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-green-50 text-green-600 border border-green-100">
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4 mt-auto border-t border-gray-50">
        <Link href="/sales" className="inline-flex items-center text-[13px] font-semibold text-[#00D9D9] hover:text-[#00B8B8] transition-colors">
          View all bills <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </Card>
  );
}
