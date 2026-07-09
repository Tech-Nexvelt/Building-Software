import { create } from "zustand";

export interface Table {
  id: string;
  table_number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning' | 'billing';
  x_coord: number;
  y_coord: number;
  shape: 'rectangle' | 'circle';
  floor_name: string;
  session_id?: string;
  running_bill?: number;
  elapsed_minutes?: number;
}

interface ReceptionState {
  tables: Table[];
  isLoading: boolean;
  selectedTable: Table | null;

  // Actions
  setTables: (tables: Table[]) => void;
  updateTableStatus: (tableId: string, status: Table['status']) => void;
  setSelectedTable: (table: Table | null) => void;
  
  // Helpers
  getTablesByFloor: (floorName: string) => Table[];
  getStats: () => { occupied: number; available: number; reserved: number; billing: number };
}

export const useReceptionStore = create<ReceptionState>((set, get) => ({
  tables: [
    // Ground Floor: 2 Tables (Round)
    { id: "t1", table_number: "T-01", capacity: 4, status: "occupied", x_coord: 30, y_coord: 50, shape: "circle", floor_name: "Ground Floor", running_bill: 1450, elapsed_minutes: 32 },
    { id: "t2", table_number: "T-02", capacity: 2, status: "available", x_coord: 70, y_coord: 50, shape: "circle", floor_name: "Ground Floor" },
    
    // First Floor: 4 Tables (Round)
    { id: "t3", table_number: "T-03", capacity: 6, status: "reserved", x_coord: 25, y_coord: 30, shape: "circle", floor_name: "First Floor" },
    { id: "t4", table_number: "T-04", capacity: 4, status: "occupied", x_coord: 75, y_coord: 30, shape: "circle", floor_name: "First Floor", running_bill: 3200, elapsed_minutes: 65 },
    { id: "t5", table_number: "T-05", capacity: 2, status: "cleaning", x_coord: 25, y_coord: 70, shape: "circle", floor_name: "First Floor" },
    { id: "t6", table_number: "T-06", capacity: 4, status: "billing", x_coord: 75, y_coord: 70, shape: "circle", floor_name: "First Floor", running_bill: 980, elapsed_minutes: 45 },
  ],
  isLoading: false,
  selectedTable: null,

  setTables: (tables) => set({ tables }),

  updateTableStatus: (tableId, status) => {
    set((state) => ({
      tables: state.tables.map(t => t.id === tableId ? { ...t, status } : t)
    }));
  },

  setSelectedTable: (table) => set({ selectedTable: table }),

  getTablesByFloor: (floorName) => {
    return get().tables.filter(t => t.floor_name === floorName);
  },

  getStats: () => {
    const tables = get().tables;
    return {
      occupied: tables.filter(t => t.status === 'occupied').length,
      available: tables.filter(t => t.status === 'available').length,
      reserved: tables.filter(t => t.status === 'reserved').length,
      billing: tables.filter(t => t.status === 'billing').length,
    };
  }
}));
