import { SaleTransaction, SalesKPIs } from '../types/sales.types';

const MOCK_KPIS: SalesKPIs = {
  todaysRevenue: { value: 18540.00, trend: 15.6 },
  todaysOrders: { value: 127, trend: 12.4 },
  monthlyRevenue: { value: 428750.00, trend: 24.7 },
  avgOrderValue: { value: 146.00, trend: 8.2 },
  refunds: { value: 2350.00, trend: -3.1 },
  pendingOrders: { value: 12, trend: 6 },
};

const MOCK_TRANSACTIONS: SaleTransaction[] = [
  {
    id: '1',
    billNo: 'BHC-10245',
    receiptNo: 'RCP-10245',
    orderNo: 'ORD-10245',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    orderType: 'Dine In',
    paymentMethod: 'UPI',
    cashierName: 'Kishore Yadav',
    itemsCount: 5,
    amount: 1219.80,
    status: 'Completed',
    date: '24 May 2026',
    time: '10:24 AM'
  },
  {
    id: '2',
    billNo: 'BHC-10244',
    receiptNo: 'RCP-10244',
    orderNo: 'ORD-10244',
    customerName: 'Priya Reddy',
    orderType: 'Take Away',
    paymentMethod: 'Card',
    cashierName: 'Sneha Iyer',
    itemsCount: 3,
    amount: 850.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '10:10 AM'
  },
  {
    id: '3',
    billNo: 'BHC-10243',
    receiptNo: 'RCP-10243',
    orderNo: 'ORD-10243',
    customerName: 'Walk-in Customer',
    orderType: 'Dine In',
    paymentMethod: 'Cash',
    cashierName: 'Amit Verma',
    itemsCount: 2,
    amount: 320.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '09:58 AM'
  },
  {
    id: '4',
    billNo: 'BHC-10242',
    receiptNo: 'RCP-10242',
    orderNo: 'ORD-10242',
    customerName: 'Arjun Kumar',
    orderType: 'Delivery',
    paymentMethod: 'UPI',
    cashierName: 'Kishore Yadav',
    itemsCount: 6,
    amount: 1060.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '09:40 AM'
  },
  {
    id: '5',
    billNo: 'BHC-10241',
    receiptNo: 'RCP-10241',
    orderNo: 'ORD-10241',
    customerName: 'Neha Patel',
    orderType: 'Take Away',
    paymentMethod: 'Card',
    cashierName: 'Sneha Iyer',
    itemsCount: 4,
    amount: 680.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '09:22 AM'
  },
  {
    id: '6',
    billNo: 'BHC-10240',
    receiptNo: 'RCP-10240',
    orderNo: 'ORD-10240',
    customerName: 'Walk-in Customer',
    orderType: 'Dine In',
    paymentMethod: 'Cash',
    cashierName: 'Amit Verma',
    itemsCount: 2,
    amount: 210.00,
    status: 'Cancelled',
    date: '24 May 2026',
    time: '09:10 AM'
  },
  {
    id: '7',
    billNo: 'BHC-10239',
    receiptNo: 'RCP-10239',
    orderNo: 'ORD-10239',
    customerName: 'Vikram Rao',
    orderType: 'Delivery',
    paymentMethod: 'UPI',
    cashierName: 'Sneha Iyer',
    itemsCount: 5,
    amount: 1050.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '08:55 AM'
  },
  {
    id: '8',
    billNo: 'BHC-10238',
    receiptNo: 'RCP-10238',
    orderNo: 'ORD-10238',
    customerName: 'Sneha Iyer', // Employee purchase demo
    orderType: 'Dine In',
    paymentMethod: 'Card',
    cashierName: 'Amit Verma',
    itemsCount: 3,
    amount: 190.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '08:40 AM'
  },
  {
    id: '9',
    billNo: 'BHC-10237',
    receiptNo: 'RCP-10237',
    orderNo: 'ORD-10237',
    customerName: 'Priya Reddy',
    orderType: 'Take Away',
    paymentMethod: 'UPI',
    cashierName: 'Kishore Yadav',
    itemsCount: 4,
    amount: 750.00,
    status: 'Refunded',
    date: '24 May 2026',
    time: '08:25 AM'
  },
  {
    id: '10',
    billNo: 'BHC-10236',
    receiptNo: 'RCP-10236',
    orderNo: 'ORD-10236',
    customerName: 'Priya Reddy',
    orderType: 'Take Away',
    paymentMethod: 'Card',
    cashierName: 'Sneha Iyer',
    itemsCount: 2,
    amount: 430.00,
    status: 'Completed',
    date: '24 May 2026',
    time: '08:10 AM'
  }
];

export const salesService = {
  async getSalesKPIs(): Promise<SalesKPIs> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_KPIS;
  },

  async getTransactions(): Promise<SaleTransaction[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_TRANSACTIONS;
  }
};
