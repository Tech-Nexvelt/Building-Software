"use client";

import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export function DownloadReportButton() {
  const handleDownload = () => {
    // Generate Excel data
    const data = [
      { Date: '2026-05-24', Revenue: 24590, Orders: 128 },
      { Date: '2026-05-23', Revenue: 21200, Orders: 110 }
    ];
    
    // Create a new workbook and add a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Report");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "daily_report.xlsx");
  };

  return (
    <button 
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
    >
      <Download className="w-4 h-4" />
      Download Report
    </button>
  );
}
