import type { DashboardData } from '../types/dashboard.types';

// Mock service layer returning identical data to match the UI screenshot exactly.
// In a real database scenario, this would query the Supabase DB via createClient()
export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    // Simulating network request for Real-time rendering showcase
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      stats: {
        revenue: { value: 24590.00, trend: 18.6 },
        bills: { value: 128, trend: 12.4 },
        averageBillValue: { value: 192.11, trend: 8.2 },
        topProduct: { name: 'Cappuccino', sales: 36 },
      },
      revenueOverview: [
        { date: '18 May', revenue: 8000 },
        { date: '19 May', revenue: 15000 },
        { date: '20 May', revenue: 17000 },
        { date: '21 May', revenue: 12000 },
        { date: '22 May', revenue: 22000 },
        { date: '23 May', revenue: 25000 },
        { date: '24 May', revenue: 24590 },
      ],
      salesByCategory: [
        { name: 'Beverages', value: 12650, percentage: 51.5, color: '#f97316' },
        { name: 'Food', value: 6480, percentage: 26.4, color: '#3b82f6' },
        { name: 'Desserts', value: 3680, percentage: 15.0, color: '#22c55e' },
        { name: 'Snacks', value: 1780, percentage: 7.1, color: '#eab308' },
      ],
      recentBills: [
        { id: '1', billNo: 'INV-00125', customerName: 'Walk-in Customer', itemsCount: 3, totalAmount: 493.50, time: '10:24 AM', status: 'Paid' },
        { id: '2', billNo: 'INV-00124', customerName: 'Rahul Sharma', itemsCount: 5, totalAmount: 875.00, time: '10:10 AM', status: 'Paid' },
        { id: '3', billNo: 'INV-00123', customerName: 'Priya Patel', itemsCount: 2, totalAmount: 210.00, time: '09:58 AM', status: 'Paid' },
        { id: '4', billNo: 'INV-00122', customerName: 'Walk-in Customer', itemsCount: 4, totalAmount: 620.00, time: '09:42 AM', status: 'Paid' },
        { id: '5', billNo: 'INV-00121', customerName: 'Amit Verma', itemsCount: 3, totalAmount: 350.00, time: '09:30 AM', status: 'Paid' },
      ],
      recentActivity: [
        { id: '1', title: 'New bill created', description: 'INV-00125 for ₹493.50', time: '10:24 AM', type: 'bill' },
        { id: '2', title: 'Payment received', description: '₹875.00 via Cash', time: '10:10 AM', type: 'payment' },
        { id: '3', title: 'New product added', description: 'Chocolate Brownie', time: '09:58 AM', type: 'product' },
        { id: '4', title: 'Stock updated', description: 'Cappuccino Powder', time: '09:42 AM', type: 'stock' },
        { id: '5', title: 'New user added', description: 'Rahul as Cashier', time: '09:30 AM', type: 'user' },
      ],
      todaySummary: {
        totalRevenue: 24590.00,
        totalBills: 128,
        itemsSold: 346,
        newCustomers: 18,
        returningCustomers: 32,
      },
    };
  },
};
