"use client";

import { useEffect, useState } from 'react';
import { ProductBrowser } from './ProductBrowser';
import { BillingCart } from './BillingCart';
import { QuickActions } from './QuickActions';
import { productsService } from '@/modules/products/services/products.service';
import { Product } from '@/modules/products/types/products.types';

export function BillingLayout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productsService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-72px)] overflow-hidden bg-gray-50 p-3 gap-3">
      
      {/* Left Pane - Product Browser & Quick Actions */}
      <div className="flex-1 flex flex-col min-w-0 h-full gap-3">
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full relative">
          <ProductBrowser products={products} isLoading={isLoading} />
        </div>
        <QuickActions />
      </div>

      {/* Right Pane - Billing Cart */}
      <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
        <BillingCart />
      </div>

    </div>
  );
}
