-- ============================================================
-- Nexvelt POS — Initial Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUMS ───────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('owner', 'cashier');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled', 'refunded');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'upi', 'wallet');
CREATE TYPE product_status AS ENUM ('active', 'inactive');

-- ─── PROFILES ────────────────────────────────────────────────
-- Extends auth.users with app-specific fields

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT NOT NULL DEFAULT '',
  role        user_role NOT NULL DEFAULT 'cashier',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: auto-create profile on new auth user
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'cashier'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── CATEGORIES ──────────────────────────────────────────────

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  color       TEXT DEFAULT '#6366f1',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PRODUCTS ────────────────────────────────────────────────

CREATE TABLE products (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  description      TEXT,
  price            NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  cost_price       NUMERIC(10, 2) CHECK (cost_price >= 0),
  category_id      UUID REFERENCES categories(id) ON DELETE SET NULL,
  sku              TEXT UNIQUE,
  image_url        TEXT,
  status           product_status NOT NULL DEFAULT 'active',
  gst_rate         NUMERIC(5, 2) NOT NULL DEFAULT 5.00 CHECK (gst_rate >= 0 AND gst_rate <= 100),
  stock_quantity   INTEGER,
  track_inventory  BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english', name));

-- ─── SETTINGS ────────────────────────────────────────────────

CREATE TABLE settings (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name         TEXT NOT NULL DEFAULT 'My Business',
  business_address      TEXT,
  business_phone        TEXT,
  business_email        TEXT,
  business_gstin        TEXT,
  logo_url              TEXT,
  currency              TEXT NOT NULL DEFAULT 'INR',
  currency_symbol       TEXT NOT NULL DEFAULT '₹',
  default_gst_rate      NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
  receipt_footer        TEXT DEFAULT 'Thank you for visiting! Come again.',
  show_gst_on_receipt   BOOLEAN NOT NULL DEFAULT TRUE,
  show_logo_on_receipt  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO settings (business_name, currency, currency_symbol, default_gst_rate)
VALUES ('Nexvelt POS', 'INR', '₹', 5.00);

-- ─── ORDERS ──────────────────────────────────────────────────

CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number    TEXT NOT NULL UNIQUE,
  status          order_status NOT NULL DEFAULT 'completed',
  payment_method  payment_method NOT NULL DEFAULT 'cash',
  subtotal        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  gst_amount      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount    NUMERIC(10, 2) NOT NULL DEFAULT 0,
  customer_name   TEXT,
  customer_phone  TEXT,
  notes           TEXT,
  cashier_id      UUID NOT NULL REFERENCES profiles(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_cashier ON orders(cashier_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- ─── ORDER ITEMS ─────────────────────────────────────────────

CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id),
  product_name    TEXT NOT NULL,
  product_price   NUMERIC(10, 2) NOT NULL,
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  gst_rate        NUMERIC(5, 2) NOT NULL DEFAULT 0,
  gst_amount      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount    NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ─── UPDATED_AT TRIGGERS ─────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "profiles_read_all" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Categories: all authenticated users can read/write
CREATE POLICY "categories_all" ON categories FOR ALL TO authenticated USING (true);

-- Products: all authenticated users can read/write
CREATE POLICY "products_all" ON products FOR ALL TO authenticated USING (true);

-- Orders: all authenticated can read, insert own, owner can update/delete
CREATE POLICY "orders_read_all" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "orders_insert" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = cashier_id);
CREATE POLICY "orders_update_own" ON orders FOR UPDATE TO authenticated USING (
  auth.uid() = cashier_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
);
CREATE POLICY "orders_delete_owner" ON orders FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
);

-- Order items: follow parent order
CREATE POLICY "order_items_all" ON order_items FOR ALL TO authenticated USING (true);

-- Settings: all authenticated can read, only owner can write
CREATE POLICY "settings_read_all" ON settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "settings_write_owner" ON settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
);

-- ─── SEED DATA — CATEGORIES ──────────────────────────────────

INSERT INTO categories (name, color, sort_order) VALUES
  ('Hot Beverages',  '#ef4444', 1),
  ('Cold Beverages', '#3b82f6', 2),
  ('Bakery',         '#f59e0b', 3),
  ('Snacks',         '#10b981', 4),
  ('Meals',          '#8b5cf6', 5),
  ('Desserts',       '#ec4899', 6);
