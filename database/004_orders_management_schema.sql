-- ============================================================
-- Nexvelt POS — 004 Orders Management Schema
-- ============================================================

-- ─── UPDATE ENUMS ────────────────────────────────────────────
-- Adding new statuses to the existing order_status ENUM
-- Note: PostgreSQL supports adding values to ENUMs easily.
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'new' BEFORE 'pending';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'accepted' AFTER 'pending';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'preparing' AFTER 'accepted';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'ready' AFTER 'preparing';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'served' AFTER 'ready';

-- ─── SPLIT INVOICES ──────────────────────────────────────────
-- To track bills that have been split from a parent order.
CREATE TABLE split_invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  split_number    INTEGER NOT NULL,
  subtotal        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax_amount      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  grand_total     NUMERIC(10, 2) NOT NULL DEFAULT 0,
  payment_status  TEXT NOT NULL DEFAULT 'pending', -- pending, paid
  payment_method  payment_method,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Link order items to a split invoice if they belong to a split bill
ALTER TABLE order_items ADD COLUMN split_invoice_id UUID REFERENCES split_invoices(id) ON DELETE SET NULL;

-- ─── ORDER MERGING ───────────────────────────────────────────
-- If an order is merged into another, point it to the parent order
ALTER TABLE orders ADD COLUMN merged_into_id UUID REFERENCES orders(id) ON DELETE SET NULL;

-- Enable realtime for split_invoices
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE split_invoices;
COMMIT;
