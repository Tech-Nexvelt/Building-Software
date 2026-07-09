import { Receipt } from '../types/receipt.types';

const MOCK_RECEIPTS: Receipt[] = [
  {
    id: '1',
    receiptNo: 'RCP-10245',
    orderNo: 'ORD-10245',
    date: '24 May 2026',
    time: '10:24 AM',
    cashier: 'Kishore Yadav',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    loyaltyPoints: 280,
    membership: 'Gold Member',
    orderType: 'Dine In',
    tableNo: 'Table 5',
    items: [
      { id: '1', name: 'Black Forest Cake', quantity: 1, unitPrice: 650.00, total: 650.00 },
      { id: '2', name: 'Cappuccino', quantity: 2, unitPrice: 140.00, total: 280.00 },
      { id: '3', name: 'Garlic Bread', quantity: 1, unitPrice: 90.00, total: 90.00 },
      { id: '4', name: 'Cold Coffee', quantity: 1, unitPrice: 110.00, total: 110.00 },
    ],
    subtotal: 1130.00,
    discountAmount: 100.00,
    taxAmount: 51.50,
    cgst: 25.75,
    sgst: 25.75,
    serviceCharge: 20.60, // 2% of (1130 - 100)
    grandTotal: 1102.10,
    paymentMethod: 'UPI',
    amountPaid: 1102.10,
    changeReturned: 0,
    status: 'Completed'
  },
  {
    id: '2',
    receiptNo: 'RCP-10244',
    orderNo: 'ORD-10244',
    date: '24 May 2026',
    time: '10:10 AM',
    cashier: 'Sneha Iyer',
    customerName: 'Priya Patel',
    orderType: 'Take Away',
    items: [
      { id: '1', name: 'Veg Puff', quantity: 2, unitPrice: 45.00, total: 90.00 },
      { id: '2', name: 'Tea', quantity: 2, unitPrice: 25.00, total: 50.00 },
    ],
    subtotal: 140.00,
    discountAmount: 0,
    taxAmount: 7.00,
    cgst: 3.50,
    sgst: 3.50,
    serviceCharge: 0,
    grandTotal: 147.00,
    paymentMethod: 'Card',
    amountPaid: 147.00,
    changeReturned: 0,
    status: 'Completed'
  },
  {
    id: '3',
    receiptNo: 'RCP-10243',
    orderNo: 'ORD-10243',
    date: '24 May 2026',
    time: '09:58 AM',
    cashier: 'Kishore Yadav',
    orderType: 'Dine In',
    tableNo: 'Table 2',
    items: [
      { id: '1', name: 'Pizza', quantity: 1, unitPrice: 180.00, total: 180.00 },
      { id: '2', name: 'Fresh Juice', quantity: 2, unitPrice: 90.00, total: 180.00 },
    ],
    subtotal: 360.00,
    discountAmount: 0,
    taxAmount: 18.00,
    cgst: 9.00,
    sgst: 9.00,
    serviceCharge: 7.20,
    grandTotal: 385.20,
    paymentMethod: 'Cash',
    amountPaid: 500.00,
    changeReturned: 114.80,
    status: 'Completed'
  }
];

export const receiptService = {
  async getReceipts(): Promise<Receipt[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_RECEIPTS;
  },

  async getReceiptById(id: string): Promise<Receipt | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_RECEIPTS.find(r => r.id === id) || null;
  }
};
