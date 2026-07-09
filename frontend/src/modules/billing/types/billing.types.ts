import { Product } from '@/modules/products/types/products.types';

export interface CartItem {
  id: string; // Unique ID for the cart line item
  product: Product;
  quantity: number;
  note?: string;
}

export type OrderType = 'Dine In' | 'Take Away' | 'Delivery';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  loyaltyPoints: number;
  isMember: boolean;
}

export interface Discount {
  type: 'flat' | 'percentage';
  value: number;
}

export interface BillingSummary {
  subtotal: number;
  discountAmount: number;
  taxAmount: number; // 5% GST
  serviceChargeAmount: number; // 2% Service Charge for Dine In
  grandTotal: number;
}
