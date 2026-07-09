"use client";

import { Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import type { Product } from '../types/products.types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="p-8 text-center text-gray-500">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const stockPercentage = Math.min(100, Math.max(0, (product.stock / (product.minStock * 3)) * 100));
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-[#00D9D9]/30 group">
      {/* Image Area */}
      <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center group-hover:bg-gray-100/50 transition-colors">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <button className="p-1.5 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:text-blue-600 hover:border-blue-200 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:text-red-600 hover:border-red-200 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <button className="absolute top-3 left-3 p-1 text-gray-400 hover:text-gray-900 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{product.name}</h4>
        </div>
        
        <p className="text-[11px] text-gray-500 mb-3">{product.category}</p>
        
        <div className="flex items-center justify-between mb-4 mt-auto pt-2">
          <span className="font-bold text-gray-900">{formatCurrency(product.price)}</span>
          <StatusText status={product.status} />
        </div>

        {/* Stock Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-gray-600">Stock: {product.stock}</span>
            <span className="text-gray-400">Min: {product.minStock}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                product.stock === 0 ? "bg-red-500" : product.stock <= product.minStock ? "bg-amber-500" : "bg-[#00D9D9]"
              )}
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusText({ status }: { status: string }) {
  if (status === 'In Stock') {
    return <span className="text-[11px] font-semibold text-green-600">{status}</span>;
  }
  if (status === 'Low Stock') {
    return <span className="text-[11px] font-semibold text-amber-600">{status}</span>;
  }
  return <span className="text-[11px] font-semibold text-red-600">{status}</span>;
}
