"use client";

import { Eye, Edit2, Box, Trash2 } from 'lucide-react';
import type { Product } from '../types/products.types';
import { formatCurrency } from '@/lib/utils';
import { useProductsStore } from '../store/useProductsStore';
import { cn } from '@/lib/utils';

export function ProductsTable({ products }: { products: Product[] }) {
  const { selectedProducts, toggleProductSelection, selectAllProducts, clearSelection } = useProductsStore();

  const allSelected = products.length > 0 && selectedProducts.length === products.length;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllProducts(products.map(p => p.id));
    }
  };

  if (products.length === 0) {
    return <div className="p-8 text-center text-gray-500">No products found.</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50/80 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-4 py-4 w-[50px]">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9] cursor-pointer"
                />
              </th>
              <th className="px-4 py-4 font-medium">Product</th>
              <th className="px-4 py-4 font-medium">SKU</th>
              <th className="px-4 py-4 font-medium">Category</th>
              <th className="px-4 py-4 font-medium text-right">Price</th>
              <th className="px-4 py-4 font-medium text-right">Cost</th>
              <th className="px-4 py-4 font-medium text-right">Stock</th>
              <th className="px-4 py-4 font-medium text-center">Status</th>
              <th className="px-4 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const isSelected = selectedProducts.includes(product.id);
              return (
                <tr 
                  key={product.id} 
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors group",
                    isSelected && "bg-[#E6F8F8]/40"
                  )}
                >
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleProductSelection(product.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#00D9D9] focus:ring-[#00D9D9] cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium">{product.sku}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{formatCurrency(product.costPrice)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={cn(
                      "font-semibold",
                      product.stock === 0 ? "text-red-500" : product.stock <= product.minStock ? "text-amber-500" : "text-gray-900"
                    )}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-[#00D9D9] hover:bg-[#E6F8F8] rounded-md transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Product">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Manage Stock">
                        <Box className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <span className="text-sm text-gray-500">
          Showing {products.length} products
        </span>
        <div className="flex items-center gap-1 text-sm font-medium">
          <button className="px-3 py-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors" disabled>Prev</button>
          <button className="px-3 py-1 rounded-md bg-[#00D9D9] text-white shadow-sm">1</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">2</button>
          <button className="px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'In Stock') {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-green-50 text-green-600 border border-green-100">
        {status}
      </span>
    );
  }
  if (status === 'Low Stock') {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-100">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-600 border border-red-100">
      {status}
    </span>
  );
}
