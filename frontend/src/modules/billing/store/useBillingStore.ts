import { create } from 'zustand';
import { Product } from '@/modules/products/types/products.types';
import { CartItem, Customer, OrderType, Discount, BillingSummary } from '../types/billing.types';

interface BillingState {
  // State
  cart: CartItem[];
  customer: Customer | null;
  orderType: OrderType;
  discount: Discount;
  orderNote: string;
  searchQuery: string;
  selectedCategory: string;

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setOrderType: (type: OrderType) => void;
  setCustomer: (customer: Customer | null) => void;
  setDiscount: (discount: Discount) => void;
  setOrderNote: (note: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  clearCart: () => void;

  // Computed Values
  getSummary: () => BillingSummary;
}

export const useBillingStore = create<BillingState>((set, get) => ({
  cart: [],
  customer: null,
  orderType: 'Dine In',
  discount: { type: 'flat', value: 0 },
  orderNote: '',
  searchQuery: '',
  selectedCategory: 'All',

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return {
      cart: [...state.cart, { id: crypto.randomUUID(), product, quantity: 1 }]
    };
  }),

  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId)
  })),

  updateQuantity: (itemId, delta) => set((state) => ({
    cart: state.cart.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    })
  })),

  setOrderType: (type) => set({ orderType: type }),
  setCustomer: (customer) => set({ customer }),
  setDiscount: (discount) => set({ discount }),
  setOrderNote: (note) => set({ orderNote: note }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearCart: () => set({ cart: [], customer: null, orderNote: '', discount: { type: 'flat', value: 0 } }),

  getSummary: () => {
    const { cart, discount, orderType } = get();
    
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    let discountAmount = 0;
    if (discount.type === 'flat') {
      discountAmount = Math.min(discount.value, subtotal);
    } else {
      discountAmount = subtotal * (discount.value / 100);
    }

    const afterDiscount = subtotal - discountAmount;
    
    // 5% GST on items
    const taxAmount = afterDiscount * 0.05;
    
    // 2% Service charge only for Dine In
    const serviceChargeAmount = orderType === 'Dine In' ? (afterDiscount * 0.02) : 0;

    const grandTotal = afterDiscount + taxAmount + serviceChargeAmount;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      serviceChargeAmount,
      grandTotal
    };
  }
}));
