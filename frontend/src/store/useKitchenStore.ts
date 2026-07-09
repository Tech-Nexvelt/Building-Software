import { create } from "zustand";

export interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  cooking_status: 'pending' | 'cooking' | 'completed';
  kitchen_notes?: string;
  variants?: Record<string, string>;
  addons?: { id: string; name: string }[];
}

export interface KitchenOrder {
  id: string;
  order_number: string;
  token_number: string;
  table_number: string;
  status: 'new' | 'preparing' | 'ready' | 'served' | 'completed';
  priority: 'low' | 'normal' | 'high';
  created_at: string;
  estimated_completion_time?: string;
  kitchen_notes?: string;
  items: KitchenItem[];
}

interface KitchenState {
  // Kanban Columns
  newOrders: KitchenOrder[];
  preparing: KitchenOrder[];
  ready: KitchenOrder[];
  served: KitchenOrder[];
  completed: KitchenOrder[];

  isLoading: boolean;
  soundAlertsEnabled: boolean;

  // Actions
  setColumns: (columns: { newOrders?: KitchenOrder[], preparing?: KitchenOrder[], ready?: KitchenOrder[], served?: KitchenOrder[], completed?: KitchenOrder[] }) => void;
  moveOrder: (orderId: string, fromStatus: KitchenOrder['status'], toStatus: KitchenOrder['status']) => void;
  updateItemStatus: (orderId: string, itemId: string, newStatus: KitchenItem['cooking_status']) => void;
  toggleSoundAlerts: (enabled: boolean) => void;
}

export const useKitchenStore = create<KitchenState>((set, get) => ({
  newOrders: [
    {
      id: "ord-1",
      order_number: "#ORD-1025",
      token_number: "T-12",
      table_number: "12",
      status: "new",
      priority: "high",
      created_at: new Date().toISOString(),
      items: [
        { id: "item-1", name: "Paneer Butter Masala", quantity: 2, cooking_status: "pending" },
        { id: "item-2", name: "Garlic Naan", quantity: 4, cooking_status: "pending", kitchen_notes: "Extra butter" }
      ]
    },
    {
      id: "ord-2",
      order_number: "#ORD-1026",
      token_number: "T-08",
      table_number: "8",
      status: "new",
      priority: "normal",
      created_at: new Date().toISOString(),
      items: [
        { id: "item-3", name: "Chicken Biryani", quantity: 1, cooking_status: "pending" }
      ]
    }
  ],
  preparing: [
    {
      id: "ord-3",
      order_number: "#ORD-1018",
      token_number: "T-05",
      table_number: "5",
      status: "preparing",
      priority: "high",
      created_at: new Date(Date.now() - 15 * 60000).toISOString(),
      items: [
        { id: "item-4", name: "Veg Hakka Noodles", quantity: 2, cooking_status: "cooking" },
        { id: "item-5", name: "Spring Rolls", quantity: 1, cooking_status: "completed" }
      ]
    }
  ],
  ready: [],
  served: [],
  completed: [],

  isLoading: false,
  soundAlertsEnabled: false,

  setColumns: (columns) => set((state) => ({ ...state, ...columns })),

  moveOrder: (orderId, fromStatus, toStatus) => {
    set((state) => {
      // Map status strings to state keys
      const statusToKey = {
        'new': 'newOrders',
        'preparing': 'preparing',
        'ready': 'ready',
        'served': 'served',
        'completed': 'completed'
      } as const;

      const sourceKey = statusToKey[fromStatus];
      const destKey = statusToKey[toStatus];

      const sourceList = state[sourceKey];
      const orderToMove = sourceList.find(o => o.id === orderId);

      if (!orderToMove) return state; // Order not found in source column

      // Update the order's status
      const updatedOrder = { ...orderToMove, status: toStatus };

      return {
        ...state,
        [sourceKey]: sourceList.filter(o => o.id !== orderId),
        [destKey]: [...state[destKey], updatedOrder]
      };
    });
  },

  updateItemStatus: (orderId, itemId, newStatus) => {
    set((state) => {
      // We need to find which column the order is in to update its nested item
      const columns: (keyof KitchenState)[] = ['newOrders', 'preparing', 'ready', 'served', 'completed'];
      
      let targetColumn: keyof KitchenState | null = null;
      let targetOrderIndex = -1;

      for (const col of columns) {
        const orderList = state[col] as KitchenOrder[];
        const index = orderList.findIndex(o => o.id === orderId);
        if (index !== -1) {
          targetColumn = col;
          targetOrderIndex = index;
          break;
        }
      }

      if (!targetColumn || targetOrderIndex === -1) return state;

      const orderList = state[targetColumn] as KitchenOrder[];
      const updatedOrderList = [...orderList];
      const order = updatedOrderList[targetOrderIndex];

      const updatedItems = order.items.map(item => 
        item.id === itemId ? { ...item, cooking_status: newStatus } : item
      );

      updatedOrderList[targetOrderIndex] = { ...order, items: updatedItems };

      return { ...state, [targetColumn]: updatedOrderList };
    });
  },

  toggleSoundAlerts: (enabled) => set({ soundAlertsEnabled: enabled }),
}));
