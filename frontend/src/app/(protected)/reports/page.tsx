"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, MapPin, Search, Plus, Download, Bell, HelpCircle, FileText,
  IndianRupee, TrendingUp, LineChart as LineChartIcon, PieChart as PieChartIcon, 
  Target, BarChart2, CalendarDays, Hammer, Clock, FileDown, Eye, Download as DownloadIcon, MoreVertical,
  CheckCircle2, XCircle, RotateCcw, Wallet, Receipt
} from "lucide-react";
import { useReportsStore } from "@/store/useReportsStore";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const COLORS = ['#00D9D9', '#FF9F43', '#28C76F', '#7367F0', '#EA5455', '#A8AAAE'];

const donutData = [
  { name: 'UPI', value: 42, amount: '₹52,540' },
  { name: 'Card', value: 21, amount: '₹26,210' },
  { name: 'Cash', value: 18, amount: '₹22,430' },
  { name: 'Wallet', value: 10, amount: '₹12,460' },
  { name: 'Net Banking', value: 6, amount: '₹7,470' },
  { name: 'Others', value: 3, amount: '₹3,450' },
];

const salesLineData = [
  { time: '12 AM', today: 10000, yesterday: 8000 },
  { time: '4 AM', today: 12000, yesterday: 10000 },
  { time: '8 AM', today: 35000, yesterday: 30000 },
  { time: '12 PM', today: 80000, yesterday: 65000 },
  { time: '4 PM', today: 95000, yesterday: 85000 },
  { time: '8 PM', today: 110000, yesterday: 105000 },
  { time: '11 PM', today: 124560, yesterday: 115000 }
];

const ordersBarData = [
  { time: '12 AM', value: 5 }, { time: '2 AM', value: 2 }, { time: '4 AM', value: 8 },
  { time: '6 AM', value: 15 }, { time: '8 AM', value: 30 }, { time: '10 AM', value: 45 },
  { time: '12 PM', value: 60 }, { time: '2 PM', value: 55 }, { time: '4 PM', value: 40 },
  { time: '6 PM', value: 50 }, { time: '8 PM', value: 48 }
];

export default function ReportsDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { recentReports, recentExports, dateRange, branch, triggerExport } = useReportsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleExport = () => {
    triggerExport(`Custom_Export_${new Date().getTime()}.csv`);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Top Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">Reports Dashboard</h1>
          <p className="text-sm font-medium text-gray-500">Analyze your restaurant performance and grow your business</p>
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
              placeholder="Search reports, invoices, orders..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm font-medium outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#00D9D9] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Custom Report
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-8 gap-4">
          <KPICard title="Total Sales" value="₹1,24,560" icon={<IndianRupee className="h-5 w-5 text-blue-600" />} trend="+18.6%" />
          <KPICard title="Total Orders" value="256" icon={<FileText className="h-5 w-5 text-[#00D9D9]" />} trend="+12.4%" />
          <KPICard title="Total Revenue" value="₹1,18,760" icon={<Wallet className="h-5 w-5 text-green-600" />} trend="+16.8%" />
          <KPICard title="Successful Payments" value="231" icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} trend="+15.7%" />
          <KPICard title="Cancelled Orders" value="17" icon={<XCircle className="h-5 w-5 text-red-500" />} trend="+21.3%" trendColor="text-red-500" />
          <KPICard title="Refunded Payments" value="5" icon={<RotateCcw className="h-5 w-5 text-purple-500" />} trend="+5.2%" />
          <KPICard title="Active Tables" value="18" icon={<BarChart2 className="h-5 w-5 text-orange-500" />} trend="+8.6%" />
          <KPICard title="Avg. Order Value" value="₹486.56" icon={<IndianRupee className="h-5 w-5 text-blue-500" />} trend="+8.1%" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Sales Overview */}
          <div className="col-span-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Sales Overview</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-black text-gray-900">₹1,24,560</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesLineData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} tickFormatter={(value) => `${value/1000}k`} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="today" stroke="#00D9D9" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="yesterday" stroke="#9ca3af" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Payment Method */}
          <div className="col-span-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Revenue by Payment Method</h3>
            <div className="flex items-center h-48">
              <div className="w-1/2 relative h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutData} innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-black text-gray-900">₹1.24L</span>
                  <span className="text-[10px] font-medium text-gray-500">Total</span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center gap-2 pl-4">
                {donutData.map((d, i) => (
                  <div key={d.name} className="flex justify-between items-center text-[10px] font-bold">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                      {d.name}
                    </div>
                    <span className="text-gray-900">{d.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Trend */}
          <div className="col-span-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Orders Trend</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-2xl font-black text-gray-900">256</span>
              <span className="text-xs font-bold text-green-500 mb-1 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5"/> +12.4%</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersBarData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                  <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="value" fill="#00D9D9" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Content Row 3 */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Recent Reports Table */}
          <div className="col-span-9 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Reports</h3>
              <button className="text-xs font-bold text-[#00D9D9]">View All</button>
            </div>
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50/50 font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Report Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date Range</th>
                  <th className="px-4 py-3">Generated On</th>
                  <th className="px-4 py-3">Format</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentReports.map(report => (
                  <tr key={report.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-3 font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#00D9D9]" /> {report.name}
                    </td>
                    <td className="px-4 py-3">{report.type}</td>
                    <td className="px-4 py-3 text-gray-500">{report.dateRange}</td>
                    <td className="px-4 py-3 text-gray-500">{report.generatedOn}</td>
                    <td className="px-4 py-3">{report.generatedBy}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-400 hover:text-[#00D9D9]"><Eye className="h-4 w-4"/></button>
                        <button className="p-1 text-gray-400 hover:text-[#00D9D9]" onClick={handleExport}><DownloadIcon className="h-4 w-4"/></button>
                        <button className="p-1 text-gray-400 hover:text-gray-900"><MoreVertical className="h-4 w-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Report Generator & Recent Exports Sidebar */}
          <div className="col-span-3 space-y-6">
            
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Report Generator</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Report Type</label>
                  <select className="w-full rounded-lg border border-gray-200 p-2 text-xs font-bold text-gray-700 outline-none focus:border-[#00D9D9]">
                    <option>Sales Report</option>
                    <option>Orders Report</option>
                    <option>Tax Report</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Date Range</label>
                  <select className="w-full rounded-lg border border-gray-200 p-2 text-xs font-bold text-gray-700 outline-none focus:border-[#00D9D9]">
                    <option>12 May 2025 - 12 May 2025</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Branch</label>
                  <select className="w-full rounded-lg border border-gray-200 p-2 text-xs font-bold text-gray-700 outline-none focus:border-[#00D9D9]">
                    <option>All Branches</option>
                  </select>
                </div>
                <button onClick={handleExport} className="w-full rounded-lg bg-[#00D9D9] py-2 text-sm font-bold text-white hover:opacity-90">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Recent Exports</h3>
                <button className="text-xs font-bold text-[#00D9D9]">View All</button>
              </div>
              <div className="space-y-3">
                {recentExports.map(exp => (
                  <div key={exp.id} className="flex items-start gap-3">
                    <FileDown className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-900 break-all">{exp.fileName}</p>
                      <p className="text-[10px] text-gray-400">{exp.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Report Categories (Subpages Links) */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Report Categories</h3>
          <div className="grid grid-cols-5 gap-4">
            
            <CategoryCard title="Sales Reports" desc="Track sales, revenue and growth" icon={<TrendingUp className="h-6 w-6 text-blue-500" />} count="12 Reports" />
            <CategoryCard title="Orders Reports" desc="Analyze orders and performance" icon={<LineChartIcon className="h-6 w-6 text-purple-500" />} count="8 Reports" />
            <CategoryCard title="Payments Reports" desc="Monitor payments and collections" icon={<PieChartIcon className="h-6 w-6 text-green-500" />} count="10 Reports" />
            <CategoryCard title="Tax Reports" desc="View tax summary and details" icon={<Receipt className="h-6 w-6 text-orange-500" />} count="6 Reports" />
            <CategoryCard title="Menu Performance" desc="Best & least selling items" icon={<Target className="h-6 w-6 text-red-500" />} count="9 Reports" />
            
            <CategoryCard title="Table Utilization" desc="Table occupancy & usage" icon={<BarChart2 className="h-6 w-6 text-yellow-500" />} count="6 Reports" />
            <CategoryCard title="Daily Closing" desc="Daily summary reports" icon={<CalendarDays className="h-6 w-6 text-[#00D9D9]" />} count="4 Reports" />
            <CategoryCard title="Custom Builder" desc="Build your own reports" icon={<Hammer className="h-6 w-6 text-gray-700" />} count="Unlimited" />
            <CategoryCard title="Scheduled Reports" desc="Automated report deliveries" icon={<Clock className="h-6 w-6 text-indigo-500" />} count="5 Active" />
            <CategoryCard title="Export Center" desc="All your downloaded files" icon={<FileDown className="h-6 w-6 text-gray-900" />} count="34 Exports" />

          </div>
        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, trendColor = "text-green-500" }: { title: string, value: string, icon: any, trend: string, trendColor?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-[11px] font-bold text-gray-500 leading-tight">{title}</h3>
      </div>
      <div>
        <p className="text-lg font-black text-gray-900">{value}</p>
        <p className={`text-[10px] font-bold ${trendColor} mt-1 flex items-center`}>
          {trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-0.5" /> : null} {trend} <span className="text-gray-400 ml-1 font-medium">vs yesterday</span>
        </p>
      </div>
    </div>
  );
}

function CategoryCard({ title, desc, icon, count }: { title: string, desc: string, icon: any, count: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#00D9D9]/50 transition-all cursor-pointer flex flex-col items-center text-center">
      <div className="mb-3 rounded-xl bg-gray-50 p-3">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{count}</span>
    </div>
  );
}
