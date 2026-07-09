import { create } from 'zustand';
import { Product } from '../types/products.types';

type ViewMode = 'table' | 'grid';

interface ProductsState {
  viewMode: ViewMode;
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedProducts: string[];
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedStatus: (status: string) => void;
  toggleProductSelection: (productId: string) => void;
  selectAllProducts: (productIds: string[]) => void;
  clearSelection: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  viewMode: 'table',
  searchQuery: '',
  selectedCategory: 'All',
  selectedStatus: 'All',
  selectedProducts: [],
  
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  
  toggleProductSelection: (productId) => set((state) => ({
    selectedProducts: state.selectedProducts.includes(productId)
      ? state.selectedProducts.filter(id => id !== productId)
      : [...state.selectedProducts, productId]
  })),
  
  selectAllProducts: (productIds) => set({ selectedProducts: productIds }),
  clearSelection: () => set({ selectedProducts: [] }),
}));
