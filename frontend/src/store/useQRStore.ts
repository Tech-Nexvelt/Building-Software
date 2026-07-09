import { create } from "zustand";

export interface QRCodeData {
  id: string;
  qr_code_id: string;
  table_id?: string;
  table_number?: string;
  floor: string;
  branch_name: string;
  restaurant_name: string;
  status: 'active' | 'inactive' | 'unassigned';
  assigned_date?: string;
  last_scan?: string;
  total_scans: number;
}

interface QRState {
  qrCodes: QRCodeData[];
  isLoading: boolean;
  selectedQRCodes: string[]; // For bulk actions/printing

  // Actions
  setQRCodes: (codes: QRCodeData[]) => void;
  updateQRStatus: (id: string, status: QRCodeData['status']) => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  
  // Helpers
  getStats: () => { active: number; inactive: number; unassigned: number; totalScans: number };
}

export const useQRStore = create<QRState>((set, get) => ({
  qrCodes: [
    // Mock Data
    { id: "qr1", qr_code_id: "QR-0001248", table_number: "T-25", floor: "Ground Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "active", assigned_date: "12 May 2025", last_scan: "10:30 AM", total_scans: 18 },
    { id: "qr2", qr_code_id: "QR-0001247", table_number: "T-24", floor: "Ground Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "active", assigned_date: "12 May 2025", last_scan: "10:28 AM", total_scans: 14 },
    { id: "qr3", qr_code_id: "QR-0001246", table_number: "T-23", floor: "Ground Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "active", assigned_date: "12 May 2025", last_scan: "10:25 AM", total_scans: 22 },
    { id: "qr4", qr_code_id: "QR-0001245", table_number: "T-22", floor: "Ground Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "unassigned", assigned_date: "12 May 2025", total_scans: 0 },
    { id: "qr5", qr_code_id: "QR-0001244", table_number: "T-21", floor: "First Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "active", assigned_date: "12 May 2025", last_scan: "10:20 AM", total_scans: 8 },
    { id: "qr6", qr_code_id: "QR-0001243", table_number: "T-20", floor: "First Floor", branch_name: "Main Branch", restaurant_name: "NexRestro", status: "inactive", assigned_date: "11 May 2025", total_scans: 0 },
  ],
  isLoading: false,
  selectedQRCodes: [],

  setQRCodes: (codes) => set({ qrCodes: codes }),

  updateQRStatus: (id, status) => {
    set((state) => ({
      qrCodes: state.qrCodes.map(qr => qr.id === id ? { ...qr, status } : qr)
    }));
  },

  toggleSelection: (id) => {
    set((state) => {
      const isSelected = state.selectedQRCodes.includes(id);
      return {
        selectedQRCodes: isSelected 
          ? state.selectedQRCodes.filter(qrId => qrId !== id)
          : [...state.selectedQRCodes, id]
      };
    });
  },

  selectAll: () => set((state) => ({ selectedQRCodes: state.qrCodes.map(qr => qr.id) })),
  
  clearSelection: () => set({ selectedQRCodes: [] }),

  getStats: () => {
    const codes = get().qrCodes;
    return {
      active: codes.filter(c => c.status === 'active').length,
      inactive: codes.filter(c => c.status === 'inactive').length,
      unassigned: codes.filter(c => c.status === 'unassigned').length,
      totalScans: codes.reduce((sum, c) => sum + c.total_scans, 0),
    };
  }
}));
