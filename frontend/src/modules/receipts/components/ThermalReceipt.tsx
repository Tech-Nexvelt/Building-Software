"use client";

import { Receipt } from '../types/receipt.types';
import { formatCurrency, cn } from '@/lib/utils';
import { Package2 } from 'lucide-react';

export function ThermalReceipt({ receipt, showHeader = true, showFooter = true }: { receipt: Receipt, showHeader?: boolean, showFooter?: boolean }) {
  if (!receipt) return null;

  return (
    <div className="bg-white mx-auto w-[320px] shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-100 min-h-[500px] flex flex-col font-mono text-[12px] text-gray-900 overflow-hidden relative">
      
      {/* Jagged Edge Top (CSS Trick) */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cG9seWdvbiBwb2ludHM9IjAsOCA0LDAgOCw4IiBmaWxsPSIjRjlGQUZCIi8+Cjwvc3ZnPg==')] rotate-180 z-10" />

      <div className="p-6 pt-8 pb-8 flex-1 flex flex-col">
        
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white mb-2">
              <Package2 className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-lg mb-1">Bake Home Café</h1>
            <p className="text-[11px] text-gray-600 mb-0.5">Fresh Cakes, Coffee & Happiness</p>
            <p className="text-[11px] text-gray-600 mb-0.5">123, Bakery Street, MG Road</p>
            <p className="text-[11px] text-gray-600 mb-0.5">Bangalore, Karnataka - 560001</p>
            <p className="text-[11px] text-gray-600 mb-1">Ph: +91 98765 43210</p>
            <p className="text-[10px] text-gray-500 font-bold tracking-wider">GSTIN: 29ABCDE1234F1Z5</p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t-2 border-dashed border-gray-300 w-full mb-4"></div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4 text-[11px]">
          <div><span className="text-gray-500">Bill No:</span> {receipt.receiptNo}</div>
          <div className="text-right"><span className="text-gray-500">Date:</span> {receipt.date}</div>
          <div><span className="text-gray-500">Order No:</span> {receipt.orderNo}</div>
          <div className="text-right"><span className="text-gray-500">Time:</span> {receipt.time}</div>
          <div className="col-span-2"><span className="text-gray-500">Cashier:</span> {receipt.cashier}</div>
          {receipt.tableNo && <div className="col-span-2"><span className="text-gray-500">Table:</span> {receipt.tableNo}</div>}
          <div className="col-span-2"><span className="text-gray-500">Order Type:</span> {receipt.orderType}</div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 w-full mb-3"></div>

        {/* Items Table Header */}
        <div className="grid grid-cols-[1fr_30px_50px_60px] gap-2 font-bold border-b border-dashed border-gray-300 pb-2 mb-2 text-[11px]">
          <div>Item</div>
          <div className="text-center">Qty</div>
          <div className="text-right">Price</div>
          <div className="text-right">Amount</div>
        </div>

        {/* Items */}
        <div className="space-y-2 mb-4">
          {receipt.items.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_30px_50px_60px] gap-2 text-[11px]">
              <div className="truncate pr-1">{item.name}</div>
              <div className="text-center">{item.quantity}</div>
              <div className="text-right">{item.unitPrice}</div>
              <div className="text-right">{item.total}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 w-full mb-3"></div>

        {/* Calculations */}
        <div className="space-y-1 mb-4 text-[11px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(receipt.subtotal)}</span>
          </div>
          {receipt.discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span>-{formatCurrency(receipt.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">CGST @2.5%</span>
            <span>{formatCurrency(receipt.cgst)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">SGST @2.5%</span>
            <span>{formatCurrency(receipt.sgst)}</span>
          </div>
          {receipt.serviceCharge > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Service Charge (2%)</span>
              <span>{formatCurrency(receipt.serviceCharge)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 w-full mb-2"></div>

        {/* Grand Total */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[14px]">Grand Total</span>
          <span className="font-bold text-[15px]">{formatCurrency(receipt.grandTotal)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 w-full mb-4"></div>

        <div className="flex justify-between text-[11px] mb-6">
          <span className="text-gray-600">Paid via: <span className="font-semibold text-gray-900">{receipt.paymentMethod}</span></span>
          <span className="font-semibold">{formatCurrency(receipt.amountPaid)}</span>
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="mt-auto flex flex-col items-center text-center">
            <p className="font-bold mb-4">Thank you! Visit Again 😋</p>
            
            {/* Fake Barcode & QR */}
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex flex-col items-center">
                <div className="w-32 h-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjMDAwIj48cmVjdCB4PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0MCIvPjxyZWN0IHg9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjQwIi8+PHJlY3QgeD0iOSIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIxOSIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIyNCIgd2lkdGg9IjIiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIyOSIgd2lkdGg9IjQiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIzNSIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIzOCIgd2lkdGg9IjIiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI0MyIgd2lkdGg9IjIiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI0NyIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI1MCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI1NSIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI1OCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI2MyIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI2NiIgd2lkdGg9IjIiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI3MCIgd2lkdGg9IjQiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI3NiIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI3OCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI4MyIgd2lkdGg9IjIiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI4NyIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI5MCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI5NSIgd2lkdGg9IjEiIGhlaWdodD0iNDAiLz48cmVjdCB4PSI5OCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIxMDMiIHdpZHRoPSIyIiBoZWlnaHQ9IjQwIi8+PHJlY3QgeD0iMTA3IiB3aWR0aD0iMSIgaGVpZ2h0PSI0MCIvPjxyZWN0IHg9IjExMCIgd2lkdGg9IjMiIGhlaWdodD0iNDAiLz48cmVjdCB4PSIxMTUiIHdpZHRoPSIyIiBoZWlnaHQ9IjQwIi8+PC9nPjwvc3ZnPg==')] bg-contain bg-no-repeat bg-center mb-1"></div>
                <span className="text-[8px] tracking-widest">{receipt.receiptNo}</span>
              </div>
              <div className="w-12 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9IiMwMDAiPjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIvPjxyZWN0IHg9IjMwIiB5PSI0IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiLz48cmVjdCB4PSI0IiB5PSIzMCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0Ii8+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjYiIGhlaWdodD0iNiIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjM0IiB5PSI4IiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iOCIgeT0iMzQiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSIzNiIgeT0iMTAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSIxMCIgeT0iMzYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSIyMiIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjI2IiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+PHJlY3QgeD0iMjIiIHk9IjE2IiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+PHJlY3QgeD0iMTYiIHk9IjIyIiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+PHJlY3QgeD0iMjYiIHk9IjIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI0Ii8+PHJlY3QgeD0iNCIgeT0iMjIiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiLz48cmVjdCB4PSI4IiB5PSIyNiIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjM2IiB5PSIyNiIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjQyIiB5PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iNiIvPjxyZWN0IHg9IjIyIiB5PSIyOCIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjMwIiB5PSIyOCIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjIyIiB5PSIzNiIgd2lkdGg9IjQiIGhlaWdodD0iOCIvPjxyZWN0IHg9IjMwIiB5PSIzOCIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjxyZWN0IHg9IjM2IiB5PSIzNCIgd2lkdGg9IjYiIGhlaWdodD0iMiIvPjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjQiIGhlaWdodD0iNCIvPjwvZz48L3N2Zz4=')] bg-cover bg-no-repeat"></div>
            </div>
          </div>
        )}
      </div>

      {/* Jagged Edge Bottom (CSS Trick) */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cG9seWdvbiBwb2ludHM9IjAsOCA0LDAgOCw4IiBmaWxsPSIjRjlGQUZCIi8+Cjwvc3ZnPg==')] z-10" />
    </div>
  );
}
