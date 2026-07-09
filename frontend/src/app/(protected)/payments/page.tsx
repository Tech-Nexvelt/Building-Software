"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Search, Plus, Download, Bell, HelpCircle,
  IndianRupee, FileText, Clock, CheckCircle2, XCircle, RotateCcw, 
  Wallet, CreditCard, TrendingUp, MoreVertical, Eye
} from "lucide-react";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#00D9D9', '#FF9F43', '#28C76F', '#7367F0', '#EA5455', '#A8AAAE'];

const donutData = [
  { name: 'UPI', value: 42 },
  { name: 'Card', value: 21 },
  { name: 'Cash', value: 18 },
  { name: 'Wallet', value: 10 },
  { name: 'Net Banking', value: 6 },
  { name: 'Others', value: 3 },
];

const lineData = [
  { time: '12 AM', value: 0 }, { time: '6 AM', value: 40000 }, { time: '12 PM', value: 80000 },
  { time: '6 PM', value: 100000 }, { time: '12 AM', value: 124560 }
];

export default function PaymentsDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { transactions, refunds, gateways, dateRange, branch } = usePaymentsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Top Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Payments Dashboard</h1>
          <p className="text-sm font-medium text-gray-500">Monitor, verify and manage all your payments in one place</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-700">
            <Calendar className="h-4 w-4 text-gray-400" /> {dateRange}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-700">
            <MapPin className="h-4 w-4 text-gray-400" /> {branch}
          </div>
          <div className="relative ml-2 w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transaction, invoice, order..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm font-medium outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-8 gap-4">
          <KPICard title="Today's Collection" value="₹1,24,560" icon={<IndianRupee className="h-5 w-5 text-blue-600" />} trend="+18.6%" trendColor="text-green-500" />
          <KPICard title="Total Transactions" value="256" icon={<FileText className="h-5 w-5 text-[#00D9D9]" />} trend="+12.4%" trendColor="text-green-500" />
          <KPICard title="Pending Payments" value="8" icon={<Clock className="h-5 w-5 text-orange-500" />} trend="+14.3%" trendColor="text-orange-500" />
          <KPICard title="Successful Payments" value="231" icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} trend="+15.7%" trendColor="text-green-500" />
          <KPICard title="Failed Payments" value="17" icon={<XCircle className="h-5 w-5 text-red-500" />} trend="+21.3%" trendColor="text-red-500" />
          <KPICard title="Refunded Payments" value="5" icon={<RotateCcw className="h-5 w-5 text-purple-500" />} trend="+5.2%" trendColor="text-green-500" />
          <KPICard title="Cash Collection" value="₹45,320" icon={<Wallet className="h-5 w-5 text-green-600" />} trend="+10.2%" trendColor="text-green-500" />
          <KPICard title="Online Collection" value="₹79,240" icon={<CreditCard className="h-5 w-5 text-blue-500" />} trend="+22.4%" trendColor="text-green-500" />
        </div>

        {/* Charts & Mini Lists Row */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Payment Method Distribution */}
          <div className="col-span-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Payment Method Distribution</h3>
            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-gray-900">256</span>
                <span className="text-xs font-medium text-gray-500">Total</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="col-span-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Recent Transactions</h3>
              <button className="text-xs font-bold text-[#00D9D9] hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {transactions.slice(0,4).map(txn => (
                <div key={txn.id} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{txn.invoiceNo}</p>
                      <p className="text-[10px] font-medium text-gray-500">Table {txn.table} • Order {txn.orderNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">₹{txn.amount}</p>
                    <p className="text-[10px] font-bold text-green-600 bg-green-50 inline-block px-1.5 rounded">{txn.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Pending Verifications</h3>
              <button className="text-xs font-bold text-[#00D9D9] hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {transactions.filter(t => t.status === 'Pending').slice(0,3).map(txn => (
                <div key={txn.id} className="flex justify-between items-center pb-3 border-b border-orange-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-orange-200 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{txn.invoiceNo}</p>
                      <p className="text-[10px] font-medium text-gray-500">Table {txn.table} • {txn.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Collection Line Chart */}
          <div className="col-span-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-gray-900">Today's Collection</h3>
              <button className="text-xs font-bold text-[#00D9D9] hover:underline">View Report</button>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-black text-gray-900">₹1,24,560</span>
              <span className="text-xs font-bold text-green-500 mb-1 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5"/> +18.6%</span>
            </div>
            <div className="flex-1 w-full min-h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#9ca3af'}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="value" stroke="#00D9D9" strokeWidth={3} dot={{r: 4, fill: '#00D9D9', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Data Table Row */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">All Transactions</h3>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="h-4 w-4" /> Export
              </button>
              <button className="rounded-lg bg-button-gradient px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 flex items-center gap-2">
                <Plus className="h-4 w-4" /> New Payment
              </button>
            </div>
          </div>
          <table className="w-full text-left text-xs font-medium text-gray-600">
            <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-4 py-3">Invoice No.</th>
                <th className="px-4 py-3">Order No.</th>
                <th className="px-4 py-3">Table</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Gateway</th>
                <th className="px-4 py-3">Processed By</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-3 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-4 py-3 text-gray-700">{txn.invoiceNo}</td>
                  <td className="px-4 py-3">{txn.orderNo}</td>
                  <td className="px-4 py-3 font-bold">{txn.table}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {txn.paymentMethod}
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900">₹{txn.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                      txn.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      txn.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      txn.status === 'Failed' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {txn.status === 'Paid' ? '+ Paid' : txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{txn.gateway}</td>
                  <td className="px-4 py-3">{txn.processedBy}</td>
                  <td className="px-4 py-3 text-gray-500">{txn.dateTime}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#00D9D9]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><MoreVertical className="h-4 w-4" /></button>
                    </div>
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

function KPICard({ title, value, icon, trend, trendColor }: { title: string, value: string, icon: any, trend: string, trendColor: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-xs font-bold text-gray-500 leading-tight">{title}</h3>
      </div>
      <div>
        <p className="text-xl font-black text-gray-900">{value}</p>
        <p className={`text-[10px] font-bold ${trendColor} mt-1 flex items-center`}>
          {trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-0.5" /> : null} {trend} <span className="text-gray-400 ml-1 font-medium">vs yesterday</span>
        </p>
      </div>
    </div>
  );
}
