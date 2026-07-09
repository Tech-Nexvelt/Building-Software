// Supabase Database Type Definitions
// Auto-generated shape — matches the SQL schema in supabase/migrations/001_initial_schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "owner" | "cashier";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: "owner" | "cashier";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "owner" | "cashier";
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          color?: string | null;
          sort_order?: number;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          cost_price: number | null;
          category_id: string | null;
          sku: string | null;
          image_url: string | null;
          status: "active" | "inactive";
          gst_rate: number;
          stock_quantity: number | null;
          track_inventory: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          cost_price?: number | null;
          category_id?: string | null;
          sku?: string | null;
          image_url?: string | null;
          status?: "active" | "inactive";
          gst_rate?: number;
          stock_quantity?: number | null;
          track_inventory?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          cost_price?: number | null;
          category_id?: string | null;
          sku?: string | null;
          image_url?: string | null;
          status?: "active" | "inactive";
          gst_rate?: number;
          stock_quantity?: number | null;
          track_inventory?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          status: "pending" | "completed" | "cancelled" | "refunded";
          payment_method: "cash" | "card" | "upi" | "wallet";
          subtotal: number;
          discount_amount: number;
          gst_amount: number;
          total_amount: number;
          customer_name: string | null;
          customer_phone: string | null;
          notes: string | null;
          cashier_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          status?: "pending" | "completed" | "cancelled" | "refunded";
          payment_method: "cash" | "card" | "upi" | "wallet";
          subtotal: number;
          discount_amount?: number;
          gst_amount?: number;
          total_amount: number;
          customer_name?: string | null;
          customer_phone?: string | null;
          notes?: string | null;
          cashier_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: "pending" | "completed" | "cancelled" | "refunded";
          payment_method?: "cash" | "card" | "upi" | "wallet";
          subtotal?: number;
          discount_amount?: number;
          gst_amount?: number;
          total_amount?: number;
          customer_name?: string | null;
          customer_phone?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_price: number;
          quantity: number;
          discount_amount: number;
          gst_rate: number;
          gst_amount: number;
          total_amount: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_price: number;
          quantity: number;
          discount_amount?: number;
          gst_rate?: number;
          gst_amount?: number;
          total_amount: number;
        };
        Update: {
          quantity?: number;
          discount_amount?: number;
          gst_amount?: number;
          total_amount?: number;
        };
      };
      settings: {
        Row: {
          id: string;
          business_name: string;
          business_address: string | null;
          business_phone: string | null;
          business_email: string | null;
          business_gstin: string | null;
          logo_url: string | null;
          currency: string;
          currency_symbol: string;
          default_gst_rate: number;
          receipt_footer: string | null;
          show_gst_on_receipt: boolean;
          show_logo_on_receipt: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          business_address?: string | null;
          business_phone?: string | null;
          business_email?: string | null;
          business_gstin?: string | null;
          logo_url?: string | null;
          currency?: string;
          currency_symbol?: string;
          default_gst_rate?: number;
          receipt_footer?: string | null;
          show_gst_on_receipt?: boolean;
          show_logo_on_receipt?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          business_name?: string;
          business_address?: string | null;
          business_phone?: string | null;
          business_email?: string | null;
          business_gstin?: string | null;
          logo_url?: string | null;
          currency?: string;
          currency_symbol?: string;
          default_gst_rate?: number;
          receipt_footer?: string | null;
          show_gst_on_receipt?: boolean;
          show_logo_on_receipt?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      user_role: "owner" | "cashier";
      order_status: "pending" | "completed" | "cancelled" | "refunded";
      payment_method: "cash" | "card" | "upi" | "wallet";
      product_status: "active" | "inactive";
    };
  };
}
