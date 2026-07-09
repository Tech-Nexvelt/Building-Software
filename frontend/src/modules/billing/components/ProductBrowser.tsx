"use client";

import { useState, useMemo } from 'react';
import { Search, Mic, Filter, Star } from 'lucide-react';
import { Product } from '@/modules/products/types/products.types';
import { useBillingStore } from '../store/useBillingStore';
import { formatCurrency, cn } from '@/lib/utils';

export function ProductBrowser({ products, isLoading }: { products: Product[], isLoading: boolean }) {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, addToCart } = useBillingStore();
  
  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['All', 'Favourites', 'Recently Sold', 'Best Sellers', ...cats];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQ) || p.sku.toLowerCase().includes(lowerQ));
    }
    if (selectedCategory !== 'All' && selectedCategory !== 'Favourites' && selectedCategory !== 'Recently Sold' && selectedCategory !== 'Best Sellers') {
      result = result.filter(p => p.category === selectedCategory);
    }
    // Mock logic for "Favourites", etc. Just return a subset for demo
    if (selectedCategory === 'Favourites') {
      result = result.slice(0, 5);
    }
    return result;
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header / Search */}
      <div className="shrink-0 p-4 border-b border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Billing</h2>
            <p className="text-[13px] text-gray-500">Create new bill for your customer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#00D9D9] transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] sm:text-sm transition-all"
              placeholder="Search products (e.g. Cappuccino)"
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#00D9D9] transition-colors">
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="shrink-0 border-b border-gray-100 overflow-x-auto scrollbar-none">
        <div className="flex p-2 gap-1 w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === category 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 h-48 shadow-sm"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <p>No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => addToCart(product)} 
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product, onAdd: () => void }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div 
      onClick={() => !isOutOfStock && onAdd()}
      className={cn(
        "bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col transition-all cursor-pointer group",
        isOutOfStock 
          ? "border-gray-200 opacity-60 cursor-not-allowed" 
          : "border-gray-100 hover:border-[#00D9D9]/40 hover:shadow-md active:scale-[0.98]"
      )}
    >
      {/* Image Area */}
      <div className="relative h-28 bg-gray-50 flex items-center justify-center p-2 group-hover:bg-[#E6F8F8]/30 transition-colors">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform" 
        />
        {/* Quick Add Button overlay */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="w-10 h-10 bg-[#00D9D9] text-white rounded-full flex items-center justify-center shadow-md transform scale-50 group-hover:scale-100 transition-transform">
               <span className="text-xl font-bold">+</span>
             </div>
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); /* toggle favorite */ }}
          className="absolute top-2 right-2 p-1 text-gray-300 hover:text-yellow-400 transition-colors z-10"
        >
          <Star className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-3 flex flex-col flex-1">
        <h4 className="font-bold text-gray-900 text-[13px] leading-tight line-clamp-2 mb-1">{product.name}</h4>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-bold text-gray-900 text-sm">{formatCurrency(product.price)}</span>
          <StatusIndicator status={product.status} />
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  if (status === 'In Stock') {
    return <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">{status}</span>;
  }
  if (status === 'Low Stock') {
    return <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">{status}</span>;
  }
  return <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{status}</span>;
}
