import { create } from "zustand";

export interface Transaction {
  id: string;
  invoiceNo: string;
  orderNo: string;
  table: string;
  paymentMethod: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  gateway: string;
  processedBy: string;
  dateTime: string;
}

export interface Refund {
  id: string;
  invoiceNo: string;
  method: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

interface PaymentsState {
  transactions: Transaction[];
  refunds: Refund[];
  dateRange: string;
  branch: string;
  
  // Gateways (excluding Razorpay as requested)
  gateways: { name: string; status: 'Operational' | 'Down' }[];

  setDateRange: (range: string) => void;
  setBranch: (branch: string) => void;
  
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
  
  processRefund: (invoiceNo: string, amount: number, method: string) => Promise<boolean>;
}

const mockTransactions: Transaction[] = [
  { id: "TXN-100245", invoiceNo: "INV-100245", orderNo: "ORD-1025", table: "T-12", paymentMethod: "UPI", amount: 1250, status: "Paid", gateway: "PhonePe", processedBy: "Amit Kumar", dateTime: "12 May 2025, 10:30 AM" },
  { id: "TXN-100244", invoiceNo: "INV-100244", orderNo: "ORD-1024", table: "T-08", paymentMethod: "Credit Card", amount: 850, status: "Paid", gateway: "Paytm", processedBy: "Rahul Sharma", dateTime: "12 May 2025, 10:28 AM" },
  { id: "TXN-100243", invoiceNo: "INV-100243", orderNo: "ORD-1023", table: "T-05", paymentMethod: "Cash", amount: 620, status: "Paid", gateway: "-", processedBy: "Neha Gupta", dateTime: "12 May 2025, 10:26 AM" },
  { id: "TXN-100242", invoiceNo: "INV-100242", orderNo: "ORD-1022", table: "T-03", paymentMethod: "UPI", amount: 1120, status: "Paid", gateway: "Google Pay", processedBy: "Amit Kumar", dateTime: "12 May 2025, 10:24 AM" },
  { id: "TXN-100241", invoiceNo: "INV-100241", orderNo: "ORD-1021", table: "T-02", paymentMethod: "PhonePe", amount: 930, status: "Pending", gateway: "PhonePe", processedBy: "Neha Gupta", dateTime: "12 May 2025, 10:22 AM" },
  { id: "TXN-100240", invoiceNo: "INV-100240", orderNo: "ORD-1020", table: "T-11", paymentMethod: "UPI", amount: 450, status: "Failed", gateway: "Paytm", processedBy: "System", dateTime: "12 May 2025, 10:20 AM" },
];

const mockRefunds: Refund[] = [
  { id: "RFND-10015", invoiceNo: "INV-100210", method: "Card", amount: 560, status: "Completed" },
  { id: "RFND-10014", invoiceNo: "INV-100208", method: "UPI", amount: 320, status: "Completed" },
  { id: "RFND-10013", invoiceNo: "INV-100205", method: "Cash", amount: 180, status: "Completed" },
];

export const usePaymentsStore = create<PaymentsState>((set, get) => ({
  transactions: mockTransactions,
  refunds: mockRefunds,
  dateRange: "12 May 2025 - 12 May 2025",
  branch: "Main Branch",
  
  gateways: [
    { name: "PhonePe", status: "Operational" },
    { name: "Paytm", status: "Operational" },
    { name: "Google Pay", status: "Operational" },
    { name: "Cash", status: "Operational" },
  ],

  setDateRange: (range) => set({ dateRange: range }),
  setBranch: (branch) => set({ branch }),
  
  addTransaction: (txn) => set((state) => ({ transactions: [txn, ...state.transactions] })),
  
  updateTransactionStatus: (id, status) => set((state) => ({
    transactions: state.transactions.map(t => t.id === id ? { ...t, status } : t)
  })),

  processRefund: async (invoiceNo, amount, method) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRefund: Refund = {
          id: `RFND-${Math.floor(10000 + Math.random() * 90000)}`,
          invoiceNo,
          amount,
          method,
          status: 'Completed'
        };
        set((state) => ({ refunds: [newRefund, ...state.refunds] }));
        resolve(true);
      }, 1500); // Simulate network delay
    });
  }
}));
