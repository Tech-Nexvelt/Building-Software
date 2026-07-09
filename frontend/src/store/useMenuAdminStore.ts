import { create } from "zustand";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive' | 'out_of_stock' | 'scheduled';
  variantsCount: number;
  addonsCount: number;
  orders: number;
  rating: number;
}

interface MenuAdminState {
  items: MenuItem[];
  isLoading: boolean;
  searchQuery: string;
  isDrawerOpen: boolean;
  editingItem: MenuItem | null;
  
  setItems: (items: MenuItem[]) => void;
  setSearchQuery: (query: string) => void;
  openDrawer: (item?: MenuItem) => void;
  closeDrawer: () => void;
  
  getStats: () => {
    totalItems: number;
    available: number;
    outOfStock: number;
    disabled: number;
  };
}

export const useMenuAdminStore = create<MenuAdminState>((set, get) => ({
  items: [
    { id: "ITEM-0001", name: "Paneer Butter Masala", category: "Main Course", price: 249, status: "active", variantsCount: 3, addonsCount: 5, orders: 1245, rating: 4.8 },
    { id: "ITEM-0002", name: "Veg Biryani", category: "Main Course", price: 229, status: "active", variantsCount: 2, addonsCount: 3, orders: 980, rating: 4.6 },
    { id: "ITEM-0003", name: "Garlic Bread", category: "Starters", price: 129, status: "out_of_stock", variantsCount: 1, addonsCount: 2, orders: 875, rating: 4.4 },
    { id: "ITEM-0004", name: "Cold Coffee", category: "Beverages", price: 129, status: "active", variantsCount: 2, addonsCount: 1, orders: 650, rating: 4.7 },
    { id: "ITEM-0005", name: "Margherita Pizza", category: "Pizza", price: 299, status: "active", variantsCount: 3, addonsCount: 4, orders: 760, rating: 4.5 },
  ],
  isLoading: false,
  searchQuery: '',
  isDrawerOpen: false,
  editingItem: null,
  
  setItems: (items) => set({ items }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  openDrawer: (item) => set({ isDrawerOpen: true, editingItem: item || null }),
  closeDrawer: () => set({ isDrawerOpen: false, editingItem: null }),
  
  getStats: () => {
    const items = get().items;
    return {
      totalItems: items.length,
      available: items.filter(i => i.status === 'active').length,
      outOfStock: items.filter(i => i.status === 'out_of_stock').length,
      disabled: items.filter(i => i.status === 'inactive').length,
    };
  }
}));
