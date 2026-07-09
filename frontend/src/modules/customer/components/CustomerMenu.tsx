"use client";

import { useState } from "react";
import { useMenuAdminStore } from "@/store/useMenuAdminStore";
import { useCustomerMenuStore } from "@/store/useCustomerMenuStore";
import { ShoppingBag, Search, Plus, Minus, ChevronRight, Leaf, Flame, Clock } from "lucide-react";

export function CustomerMenu() {
  const { items } = useMenuAdminStore(); // In a real app, this would fetch from a public API, but we'll share state for the preview
  const { cart, getCartTotal, getCartCount, addToCart, restaurantName, tableNumber } = useCustomerMenuStore();
  
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = activeCategory === "All" 
    ? items.filter(i => i.status === 'active')
    : items.filter(i => i.category === activeCategory && i.status === 'active');

  const handleAdd = (item: any) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  return (
    <div className="flex h-full w-full flex-col bg-gray-50 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-[#00D9D9] px-6 py-8 text-white rounded-b-3xl shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{restaurantName}</h1>
            <p className="text-sm font-medium opacity-90 mt-1">Table {tableNumber}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="font-bold text-lg text-white">QR</span>
          </div>
        </div>
        
        {/* Search */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full rounded-2xl border-none bg-white py-3 pl-11 pr-4 text-sm font-medium text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="shrink-0 overflow-x-auto whitespace-nowrap bg-gray-50 px-4 py-4 hide-scrollbar border-b border-gray-100 z-10">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-gray-900 text-white shadow-md scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-28 pt-4 space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 relative">
              {/* Fallback pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent"></div>
              {/* Mock Dietary Badge */}
              <div className="absolute top-1.5 left-1.5 rounded-md bg-white/90 backdrop-blur-sm p-1 shadow-sm">
                <Leaf className="h-3 w-3 text-green-600" />
              </div>
            </div>
            
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">{item.category}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">₹{item.price}</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => handleAdd(item)}
                  className="rounded-lg bg-[#00D9D9]/10 px-4 py-1.5 text-xs font-black text-[#00D9D9] hover:bg-[#00D9D9] hover:text-white transition-colors"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Bar */}
      {getCartCount() > 0 && (
        <div className="absolute bottom-6 left-4 right-4 z-50">
          <button className="flex w-full items-center justify-between rounded-2xl bg-gray-900 p-4 shadow-2xl hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D9D9] text-[10px] font-black text-white shadow-sm ring-2 ring-gray-900">
                  {getCartCount()}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-400">Total Price</p>
                <p className="text-sm font-bold text-white">₹{getCartTotal()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              View Cart <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}

    </div>
  );
}
