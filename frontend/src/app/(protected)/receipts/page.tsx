import { receiptService } from '@/modules/receipts/services/receipt.service';
import { ReceiptHistoryTable } from '@/modules/receipts/components/ReceiptHistoryTable';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Receipts History — Nexvelt POS',
};

export default async function ReceiptsPage() {
  const receipts = await receiptService.getReceipts();

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-8 pt-6 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            🧾 Receipt History
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">View, reprint, or share past receipts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/receipts/settings" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            <Settings className="w-4 h-4 text-gray-500" />
            Receipt Settings
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0">
         <ReceiptHistoryTable receipts={receipts} />
      </div>
      
    </div>
  );
}
