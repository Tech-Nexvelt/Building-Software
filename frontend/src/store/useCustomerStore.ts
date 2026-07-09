import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // unique ID for the cart item (since same product can have different variants)
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  specialInstructions?: string;
  variants?: Record<string, string>;
  addons?: { id: string; name: string; price: number }[];
}

export interface DiningSession {
  id: string;
  sessionToken: string;
  restaurantId: string;
  branchId: string;
  tableId: string;
  tableNumber: string;
  status: 'active' | 'closed';
}

interface CustomerState {
  // Session
  session: DiningSession | null;
  setSession: (session: DiningSession) => void;
  clearSession: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Bill calculations
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      session: null,
      cart: [],

      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null, cart: [] }),

      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            cart: currentCart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...currentCart, item] });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => {
          const itemBasePrice = item.price;
          const addonsPrice = item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
          return total + (itemBasePrice + addonsPrice) * item.quantity;
        }, 0);
      },

      getCartItemCount: () => {
        const cart = get().cart;
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "nexvelt-customer-session",
    }
  )
);
