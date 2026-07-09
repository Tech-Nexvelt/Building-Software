// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = "owner" | "cashier";

export interface AppUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  business_id?: string;
  created_at: string;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  sort_order: number;
  created_at: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductStatus = "active" | "inactive";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost_price?: number;
  category_id?: string;
  category?: Category;
  sku?: string;
  image_url?: string;
  status: ProductStatus;
  gst_rate: number;
  stock_quantity?: number;
  track_inventory: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProductFormData = Omit<Product, "id" | "category" | "created_at" | "updated_at">;

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  unit_price: number;
  discount_amount: number;
  gst_amount: number;
  total: number;
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus = "pending" | "completed" | "cancelled" | "refunded";
export type PaymentMethod = "cash" | "card" | "upi" | "wallet";

export interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  subtotal: number;
  discount_amount: number;
  gst_amount: number;
  total_amount: number;
  customer_name?: string;
  customer_phone?: string;
  notes?: string;
  cashier_id: string;
  cashier?: AppUser;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  product_name: string;
  product_price: number;
  quantity: number;
  discount_amount: number;
  gst_rate: number;
  gst_amount: number;
  total_amount: number;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface BusinessSettings {
  id: string;
  business_name: string;
  business_address?: string;
  business_phone?: string;
  business_email?: string;
  business_gstin?: string;
  logo_url?: string;
  currency: string;
  currency_symbol: string;
  default_gst_rate: number;
  receipt_footer?: string;
  show_gst_on_receipt: boolean;
  show_logo_on_receipt: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  today_revenue: number;
  today_bills: number;
  average_bill: number;
  top_product_name: string;
  revenue_change: number;
  bills_change: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  product_id: string;
  product_name: string;
  total_quantity: number;
  total_revenue: number;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
  ownerOnly?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface FilterConfig {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod?: string;
}
