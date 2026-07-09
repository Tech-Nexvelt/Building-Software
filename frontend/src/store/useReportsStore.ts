import { create } from "zustand";

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  dateRange: string;
  generatedOn: string;
  generatedBy: string;
}

export interface ExportItem {
  id: string;
  fileName: string;
  time: string;
}

interface ReportsState {
  recentReports: ReportItem[];
  recentExports: ExportItem[];
  dateRange: string;
  branch: string;
  
  setDateRange: (range: string) => void;
  setBranch: (branch: string) => void;
  
  generateReport: (name: string, type: string) => void;
  triggerExport: (fileName: string) => void;
}

const mockRecentReports: ReportItem[] = [
  { id: "RPT-1", name: "Sales Report", type: "Sales", dateRange: "12 May 2025 - 12 May 2025", generatedOn: "12 May 2025, 10:30 AM", generatedBy: "Rahul Sharma" },
  { id: "RPT-2", name: "Orders Report", type: "Orders", dateRange: "12 May 2025 - 12 May 2025", generatedOn: "12 May 2025, 10:28 AM", generatedBy: "Rahul Sharma" },
  { id: "RPT-3", name: "Payments Report", type: "Payments", dateRange: "12 May 2025 - 12 May 2025", generatedOn: "12 May 2025, 10:25 AM", generatedBy: "Amit Kumar" },
  { id: "RPT-4", name: "Tax Report", type: "Tax", dateRange: "11 May 2025 - 11 May 2025", generatedOn: "11 May 2025, 11:00 PM", generatedBy: "Neha Gupta" },
  { id: "RPT-5", name: "Menu Performance", type: "Menu", dateRange: "11 May 2025 - 11 May 2025", generatedOn: "11 May 2025, 10:40 PM", generatedBy: "Rahul Sharma" },
];

const mockRecentExports: ExportItem[] = [
  { id: "EXP-1", fileName: "Sales_Report_12_May_2025.pdf", time: "10:30 AM" },
  { id: "EXP-2", fileName: "Orders_Report_12_May_2025.csv", time: "10:28 AM" },
  { id: "EXP-3", fileName: "Payments_Report_12_May_2025.csv", time: "10:25 AM" },
  { id: "EXP-4", fileName: "Tax_Report_11_May_2025.pdf", time: "Yesterday" },
  { id: "EXP-5", fileName: "Menu_Performance_May_2025.xlsx", time: "Yesterday" },
];

export const useReportsStore = create<ReportsState>((set, get) => ({
  recentReports: mockRecentReports,
  recentExports: mockRecentExports,
  dateRange: "12 May 2025 - 12 May 2025",
  branch: "Main Branch",

  setDateRange: (range) => set({ dateRange: range }),
  setBranch: (branch) => set({ branch }),
  
  generateReport: (name, type) => {
    const newReport: ReportItem = {
      id: `RPT-${Math.floor(100 + Math.random() * 900)}`,
      name,
      type,
      dateRange: get().dateRange,
      generatedOn: new Date().toLocaleString(),
      generatedBy: "System",
    };
    set(state => ({ recentReports: [newReport, ...state.recentReports] }));
  },
  
  triggerExport: (fileName) => {
    const newExport: ExportItem = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      fileName,
      time: "Just now",
    };
    set(state => ({ recentExports: [newExport, ...state.recentExports] }));
  }
}));
