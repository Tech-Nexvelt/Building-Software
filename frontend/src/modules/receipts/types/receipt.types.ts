export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Receipt {
  id: string; // Internal ID
  receiptNo: string; // e.g. RCP-10245
  orderNo: string;   // e.g. ORD-10245
  date: string;
  time: string;
  cashier: string;
  
  // Customer Info (optional)
  customerName?: string;
  customerPhone?: string;
  loyaltyPoints?: number;
  membership?: string;

  orderType: 'Dine In' | 'Take Away' | 'Delivery';
  tableNo?: string;

  items: ReceiptItem[];

  // Financials
  subtotal: number;
  discountAmount: number;
  taxAmount: number; // e.g. 5% GST Total
  cgst: number;      // 2.5%
  sgst: number;      // 2.5%
  serviceCharge: number; // e.g. 2%
  grandTotal: number;

  paymentMethod: 'Cash' | 'UPI' | 'Card' | 'Split';
  amountPaid: number;
  changeReturned?: number;

  status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
}

export interface PrintSettings {
  printer: string;
  receiptType: 'thermal' | 'a4';
  paperSize: '80mm' | '58mm' | 'A4';
  orientation: 'Portrait' | 'Landscape';
  margins: 'Normal' | 'None' | 'Minimum';
  copies: number;
  showHeader: boolean;
  showFooter: boolean;
  autoPrint: boolean;
}
