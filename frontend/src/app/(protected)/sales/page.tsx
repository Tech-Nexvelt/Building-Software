import { salesService } from '@/modules/sales/services/sales.service';
import { SalesDashboardOverview } from '@/modules/sales/components/SalesDashboardOverview';
import { SalesTable } from '@/modules/sales/components/SalesTable';
import { Download, Printer, RefreshCw, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Sales History — Nexvelt POS',
};

export default async function SalesPage() {
  const [kpis, transactions] = await Promise.all([
    salesService.getSalesKPIs(),
    salesService.getTransactions()
  ]);

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-8 pt-6 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            📊 Sales History
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">Monitor all business transactions, customer purchases, and revenue performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-gray-500" />
            Export Sales
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <Printer className="w-4 h-4 text-gray-500" />
            Print Report
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <RefreshCw className="w-4 h-4 text-gray-500" />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9D9] border border-transparent rounded-lg text-sm font-bold text-white hover:bg-[#00B8B8] shadow-sm transition-all">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="shrink-0">
        <SalesDashboardOverview kpis={kpis} />
      </div>

      {/* Main Table */}
      <div className="flex-1 min-h-[400px]">
        <SalesTable transactions={transactions} />
      </div>
      
    </div>
  );
}
