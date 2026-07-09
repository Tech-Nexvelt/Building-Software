import { create } from 'zustand';
import { SaleFilters, PaymentMethod, OrderType, OrderStatus } from '../types/sales.types';

interface SalesState {
  filters: SaleFilters;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setDateRange: (range: SaleFilters['dateRange']) => void;
  setPaymentMethod: (method: SaleFilters['paymentMethod']) => void;
  setOrderType: (type: SaleFilters['orderType']) => void;
  setStatus: (status: SaleFilters['status']) => void;
  resetFilters: () => void;
}

const initialFilters: SaleFilters = {
  searchQuery: '',
  dateRange: 'Today',
  paymentMethod: 'All',
  orderType: 'All Types',
  status: 'All Statuses',
};

export const useSalesStore = create<SalesState>((set) => ({
  filters: initialFilters,

  setSearchQuery: (query) => set((state) => ({ 
    filters: { ...state.filters, searchQuery: query } 
  })),
  
  setDateRange: (range) => set((state) => ({ 
    filters: { ...state.filters, dateRange: range } 
  })),
  
  setPaymentMethod: (method) => set((state) => ({ 
    filters: { ...state.filters, paymentMethod: method } 
  })),
  
  setOrderType: (type) => set((state) => ({ 
    filters: { ...state.filters, orderType: type } 
  })),
  
  setStatus: (status) => set((state) => ({ 
    filters: { ...state.filters, status: status } 
  })),
  
  resetFilters: () => set({ filters: initialFilters }),
}));
