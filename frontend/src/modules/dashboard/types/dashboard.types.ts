export interface DashboardStats {
  revenue: {
    value: number;
    trend: number;
  };
  bills: {
    value: number;
    trend: number;
  };
  averageBillValue: {
    value: number;
    trend: number;
  };
  topProduct: {
    name: string;
    sales: number;
  };
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface RecentBill {
  id: string;
  billNo: string;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  time: string;
  status: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'bill' | 'payment' | 'product' | 'stock' | 'user';
}

export interface DashboardData {
  stats: DashboardStats;
  revenueOverview: RevenueData[];
  salesByCategory: CategoryData[];
  recentBills: RecentBill[];
  recentActivity: Activity[];
  todaySummary: {
    totalRevenue: number;
    totalBills: number;
    itemsSold: number;
    newCustomers: number;
    returningCustomers: number;
  };
}
