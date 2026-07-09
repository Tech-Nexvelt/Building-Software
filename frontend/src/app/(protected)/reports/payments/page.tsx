"use client";

import { useState, useEffect } from "react";
import { Download, Filter } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

const paymentData = [
  { name: 'UPI', value: 52540 },
  { name: 'Credit/Debit Card', value: 26210 },
  { name: 'Cash', value: 22430 },
  { name: 'Wallet', value: 12460 },
];
const COLORS = ['#00D9D9', '#7367F0', '#28C76F', '#FF9F43'];

export default function PaymentsReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Payments Reports</h1>
          <p className="text-xs font-medium text-gray-500">Monitor payment collections and gateways</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"><Download className="h-4 w-4"/> Export</button>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
             <h3 className="text-sm font-bold text-gray-900 mb-4">Collection by Method</h3>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={paymentData} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                     {paymentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                   </Pie>
                   <RechartsTooltip formatter={(value) => `₹${value}`} />
                   <Legend />
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-center">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Payment Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">Total Collected</span>
                <span className="text-base font-black text-gray-900">₹1,13,640</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">Online Payments</span>
                <span className="text-base font-black text-blue-600">₹91,210</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">Cash Payments</span>
                <span className="text-base font-black text-green-600">₹22,430</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-sm font-medium text-gray-500">Total Refunds</span>
                <span className="text-base font-black text-red-500">-₹1,060</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
