import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  discountPercent: number;
  paymentMethod: string;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setItemDiscount: (productId: string, discountAmount: number) => void;
  setDiscountPercent: (percent: number) => void;
  setPaymentMethod: (method: string) => void;
  clearCart: () => void;

  // Computed getters
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getGSTAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

function calculateItemTotals(product: Product, quantity: number, discountAmount = 0): CartItem {
  const unitPrice = product.price;
  const lineSubtotal = unitPrice * quantity - discountAmount;
  const gstAmount = (lineSubtotal * product.gst_rate) / 100;
  const total = lineSubtotal + gstAmount;

  return {
    product,
    quantity,
    unit_price: unitPrice,
    discount_amount: discountAmount,
    gst_amount: gstAmount,
    total,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountPercent: 0,
      paymentMethod: "cash",

      addItem: (product: Product) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? calculateItemTotals(product, i.quantity + 1, i.discount_amount)
                  : i
              ),
            };
          }
          return {
            items: [...state.items, calculateItemTotals(product, 1)],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? calculateItemTotals(i.product, quantity, i.discount_amount)
              : i
          ),
        }));
      },

      setItemDiscount: (productId: string, discountAmount: number) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? calculateItemTotals(i.product, i.quantity, discountAmount)
              : i
          ),
        }));
      },

      setDiscountPercent: (percent: number) => {
        set({ discountPercent: Math.min(100, Math.max(0, percent)) });
      },

      setPaymentMethod: (method: string) => {
        set({ paymentMethod: method });
      },

      clearCart: () => {
        set({ items: [], discountPercent: 0, paymentMethod: "cash" });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unit_price * item.quantity - item.discount_amount,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercent) / 100;
      },

      getGSTAmount: () => {
        return get().items.reduce((sum, item) => sum + item.gst_amount, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const gst = get().getGSTAmount();
        return subtotal - discount + gst;
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({
        items: state.items,
        discountPercent: state.discountPercent,
        paymentMethod: state.paymentMethod,
      }),
    }
  )
);
