import { dashboardService } from '@/modules/dashboard/services/dashboard.service';
import { StatCards } from '@/modules/dashboard/components/StatCards';
import { RevenueChart } from '@/modules/dashboard/components/RevenueChart';
import { CategoryPieChart } from '@/modules/dashboard/components/CategoryPieChart';
import { RecentBillsTable } from '@/modules/dashboard/components/RecentBillsTable';
import { RecentActivity } from '@/modules/dashboard/components/RecentActivity';
import { TodaySummary } from '@/modules/dashboard/components/TodaySummary';
import { QuickActions } from '@/modules/dashboard/components/QuickActions';
import { DownloadReportButton } from '@/modules/dashboard/components/DownloadReportButton';

export const metadata = {
  title: 'Dashboard — Nexvelt POS',
};

export default async function DashboardPage() {
  const data = await dashboardService.getDashboardData();

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto p-8 pt-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, Kishore! 👋</h1>
          <p className="text-[14px] text-gray-500 mt-1">Here's what's happening with your business today.</p>
        </div>
        <DownloadReportButton />
      </div>

      {/* Top Stats */}
      <StatCards stats={data.stats} />

      {/* Main Charts */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
        <RevenueChart data={data.revenueOverview} />
        <CategoryPieChart data={data.salesByCategory} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
        <RecentBillsTable bills={data.recentBills} />
        <RecentActivity activities={data.recentActivity} />
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <TodaySummary summary={data.todaySummary} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
