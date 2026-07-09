"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQRStore, QRCodeData } from "@/store/useQRStore";
import { Printer, ArrowLeft, Download, FileText, Settings2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QRPrintCenterPage() {
  const router = useRouter();
  const { qrCodes, selectedQRCodes } = useQRStore();
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState<'A4_grid' | 'stickers'>('A4_grid');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Print either the selected QRs, or if none selected, default to all Active QRs
  let codesToPrint = qrCodes.filter(qr => selectedQRCodes.includes(qr.id));
  if (codesToPrint.length === 0) {
    codesToPrint = qrCodes.filter(qr => qr.status === 'active');
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this triggers jsPDF to render the HTML to a PDF blob
    alert(`Initiating jsPDF generation for ${codesToPrint.length} QR codes in ${layout} format...`);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-6 w-px bg-gray-200"></div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Print Center</h1>
            <p className="text-xs font-medium text-gray-500">{codesToPrint.length} QR Codes queued for printing</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-button-gradient px-5 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgb(0,217,217,0.2)] hover:opacity-90 transition-opacity">
            <Printer className="h-4 w-4" /> Print Directly
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Settings Sidebar */}
        <div className="w-80 shrink-0 border-r border-gray-200 bg-white p-6 flex flex-col gap-6">
          
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Settings2 className="h-4 w-4 text-[#00D9D9]" /> Print Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Layout Format</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setLayout('A4_grid')}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${layout === 'A4_grid' ? 'border-[#00D9D9] bg-[#00D9D9]/5 text-[#00D9D9]' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-xs font-bold">A4 Table Grid</span>
                  </button>
                  <button 
                    onClick={() => setLayout('stickers')}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${layout === 'stickers' ? 'border-[#00D9D9] bg-[#00D9D9]/5 text-[#00D9D9]' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    <div className="grid grid-cols-2 gap-1 h-6 w-6">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                    <span className="text-xs font-bold">Small Stickers</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Branding Elements</label>
                <div className="mt-2 flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]" />
                    Include Restaurant Logo
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]" />
                    Include Table Number
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9]" />
                    Include Scan Instructions
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-200/50 p-8 flex justify-center">
          
          {/* A4 Paper Canvas */}
          <div className="w-[794px] min-h-[1123px] bg-white shadow-xl rounded-sm p-8 mx-auto">
            
            {layout === 'A4_grid' && (
              <div className="grid grid-cols-2 gap-8">
                {codesToPrint.map(qr => (
                  <div key={qr.id} className="flex flex-col items-center rounded-2xl border-2 border-dashed border-gray-300 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-1">{qr.restaurant_name}</h2>
                    <p className="text-sm font-medium text-gray-500 mb-6">{qr.branch_name} • {qr.floor}</p>
                    
                    <div className="rounded-2xl p-4 shadow-sm border border-gray-100 bg-white">
                      <QRCodeSVG value={`https://nexrestro.com/qr/${qr.qr_code_id}`} size={180} level="H" />
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Table</p>
                      <h3 className="text-5xl font-black text-[#00D9D9]">{qr.table_number || 'N/A'}</h3>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-6 text-center">Scan to open the digital menu and place your order.</p>
                  </div>
                ))}
              </div>
            )}

            {layout === 'stickers' && (
              <div className="grid grid-cols-4 gap-4">
                {codesToPrint.map(qr => (
                  <div key={qr.id} className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-4">
                    <h2 className="text-[10px] font-black text-gray-900 mb-2">{qr.restaurant_name}</h2>
                    <div className="p-1">
                      <QRCodeSVG value={`https://nexrestro.com/qr/${qr.qr_code_id}`} size={80} level="H" />
                    </div>
                    <div className="mt-2 w-full rounded bg-gray-100 py-1 text-center">
                      <span className="text-xs font-black text-gray-900">{qr.table_number || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
