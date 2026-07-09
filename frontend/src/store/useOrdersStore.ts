import { create } from "zustand";

// This type mirrors the structure we expect from the DB + real-time payloads
export interface Order {
  id: string;
  order_number: string;
  status: 'new' | 'accepted' | 'preparing' | 'ready' | 'served' | 'completed';
  payment_method: 'cash' | 'card' | 'upi' | 'wallet';
  total_amount: number;
  customer_name?: string;
  table_id?: string;
  table_number?: string;
  created_at: string;
  items_count: number;
  merged_into_id?: string | null;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  addOrUpdateOrder: (order: Order) => void;
  removeOrder: (orderId: string) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Derived / Filtering Helpers
  getActiveOrders: () => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  isLoading: false,

  setOrders: (orders) => set({ orders }),

  addOrUpdateOrder: (newOrder) => {
    set((state) => {
      const exists = state.orders.some((o) => o.id === newOrder.id);
      if (exists) {
        return {
          orders: state.orders.map((o) => (o.id === newOrder.id ? newOrder : o)),
        };
      }
      return { orders: [newOrder, ...state.orders] };
    });
  },

  removeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== orderId),
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),

  // Helpers
  getActiveOrders: () => {
    const activeStatuses = ['new', 'accepted', 'preparing', 'ready', 'served'];
    return get().orders.filter(
      (o) => activeStatuses.includes(o.status) && !o.merged_into_id
    );
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((o) => o.status === status && !o.merged_into_id);
  },
}));
