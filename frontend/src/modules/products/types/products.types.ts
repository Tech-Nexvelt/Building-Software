export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  status: ProductStatus;
  lastUpdated: string;
  image: string;
}

export interface ProductsOverviewStats {
  totalProducts: { value: number; trend: number };
  activeProducts: { value: number; trend: number };
  lowStock: { value: number; trend: number };
  inventoryValue: { value: number; trend: number };
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  revenue: number;
  icon: any; // We'll use lucide-react icons
}
