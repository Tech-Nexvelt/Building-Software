"use client";

import { useProductsStore } from '../store/useProductsStore';
import { ProductFilters } from './ProductFilters';
import { ProductsTable } from './ProductsTable';
import { ProductsGrid } from './ProductsGrid';
import type { Product } from '../types/products.types';
import { useMemo } from 'react';

export function ProductsClientView({ products }: { products: Product[] }) {
  const { viewMode, searchQuery } = useProductsStore();

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col">
      <ProductFilters />
      
      <div className="mt-2">
        {viewMode === 'table' ? (
          <ProductsTable products={filteredProducts} />
        ) : (
          <ProductsGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
