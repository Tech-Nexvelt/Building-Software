import { create } from "zustand";

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  addons?: string[];
  notes?: string;
}

interface CustomerMenuState {
  cart: CartItem[];
  tableNumber: string | null;
  restaurantName: string;
  
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCustomerMenuStore = create<CustomerMenuState>((set, get) => ({
  cart: [],
  tableNumber: "T-04",
  restaurantName: "The Green Bowl",
  
  addToCart: (item) => {
    const newItem = { ...item, id: Math.random().toString(36).substring(2, 9) };
    set((state) => ({ cart: [...state.cart, newItem] }));
  },
  
  removeFromCart: (cartItemId) => {
    set((state) => ({ cart: state.cart.filter(item => item.id !== cartItemId) }));
  },
  
  updateQuantity: (cartItemId, delta) => {
    set((state) => ({
      cart: state.cart.map(item => {
        if (item.id === cartItemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }));
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
