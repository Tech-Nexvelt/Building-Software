import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
}

interface BranchState {
  currentBranch: Branch | null;
  availableBranches: Branch[];
  setCurrentBranch: (branch: Branch) => void;
  setAvailableBranches: (branches: Branch[]) => void;
  clearBranchState: () => void;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      currentBranch: null,
      availableBranches: [],
      
      setCurrentBranch: (branch) => 
        set({ currentBranch: branch }),
        
      setAvailableBranches: (branches) => 
        set({ availableBranches: branches }),
        
      clearBranchState: () => 
        set({ currentBranch: null, availableBranches: [] })
    }),
    {
      name: "nexvelt-branch-storage"
    }
  )
);
