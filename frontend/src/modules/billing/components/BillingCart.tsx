"use client";

import { Trash2, Minus, Plus, UserPlus, FileText, ChevronDown } from 'lucide-react';
import { useBillingStore } from '../store/useBillingStore';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BillingCart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    orderType, 
    setOrderType,
    getSummary
  } = useBillingStore();

  const summary = getSummary();
  const hasItems = cart.length > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      
      {/* Header & Customer Selection */}
      <div className="shrink-0 p-4 border-b border-gray-100 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm font-medium text-gray-700 hover:border-[#00D9D9] transition-colors group">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-gray-500 group-hover:text-[#00D9D9]" />
              <span>Walk-in Customer</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg bg-white text-gray-500 hover:text-[#00D9D9] hover:border-[#00D9D9] transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {(['Dine In', 'Take Away', 'Delivery'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={cn(
                "flex-1 px-2 py-1.5 rounded-md text-[13px] font-semibold transition-all",
                orderType === type 
                  ? "bg-[#00D9D9] text-white shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>
        
        {orderType === 'Dine In' && (
          <div className="flex items-center justify-between text-[13px] font-medium text-gray-600 px-1 pt-1">
            <span>Order #: BHC-10245</span>
            <span>Table: 05</span>
          </div>
        )}
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        {!hasItems ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">Your cart is empty</h3>
            <p className="text-[13px] text-gray-500 max-w-[200px]">Add products from the catalog to start billing</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm group">
                <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                  <img src={item.product.image} alt={item.product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-[13px] text-gray-900 leading-tight truncate">{item.product.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-gray-900 text-[13px]">{formatCurrency(item.product.price)}</span>
                    
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-[13px] font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-[#00D9D9] hover:bg-[#E6F8F8] rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Totals & Action */}
      <div className="shrink-0 bg-gray-50 p-4 border-t border-gray-200">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(summary.subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-[13px] items-center">
            <button className="text-[#00D9D9] font-semibold hover:underline">Add Discount</button>
            <span className="text-gray-900 font-semibold">{formatCurrency(summary.discountAmount)}</span>
          </div>
          
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-600 font-medium">Tax (5% GST)</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(summary.taxAmount)}</span>
          </div>
          
          {summary.serviceChargeAmount > 0 && (
            <div className="flex justify-between text-[13px]">
              <span className="text-gray-600 font-medium">Service Charge (2%)</span>
              <span className="text-gray-900 font-semibold">{formatCurrency(summary.serviceChargeAmount)}</span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between mb-5 pt-3 border-t border-gray-200 border-dashed">
          <span className="text-gray-900 font-bold text-lg">Grand Total</span>
          <span className="text-[#00D9D9] font-black text-2xl tracking-tight">{formatCurrency(summary.grandTotal)}</span>
        </div>

        <Button 
          disabled={!hasItems}
          className={cn(
            "w-full h-14 rounded-xl font-bold text-lg flex items-center justify-between px-6 transition-all shadow-md",
            hasItems ? "bg-[#00D9D9] hover:bg-[#00B8B8] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          )}
        >
          <span>Pay Now</span>
          {hasItems && <span>{formatCurrency(summary.grandTotal)}</span>}
        </Button>
      </div>

    </div>
  );
}
