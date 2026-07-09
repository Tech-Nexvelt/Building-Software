export type PaymentMethod = 'UPI' | 'Cash' | 'Card' | 'Wallet' | 'Split';
export type OrderStatus = 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
export type OrderType = 'Dine In' | 'Take Away' | 'Delivery';

export interface SalesKPIs {
  todaysRevenue: { value: number; trend: number };
  todaysOrders: { value: number; trend: number };
  monthlyRevenue: { value: number; trend: number };
  avgOrderValue: { value: number; trend: number };
  refunds: { value: number; trend: number };
  pendingOrders: { value: number; trend: number };
}

export interface SaleTransaction {
  id: string;
  billNo: string;
  receiptNo: string;
  orderNo: string;
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  cashierName: string;
  itemsCount: number;
  amount: number;
  status: OrderStatus;
  date: string;
  time: string;
}

export interface SaleFilters {
  searchQuery: string;
  dateRange: 'Today' | 'Yesterday' | 'This Week' | 'This Month' | 'Custom';
  paymentMethod: PaymentMethod | 'All';
  orderType: OrderType | 'All Types';
  status: OrderStatus | 'All Statuses';
}
