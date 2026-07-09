-- ============================================================
-- Nexvelt POS — 006 Reception & Cashier Schema
-- ============================================================

-- ─── UPDATE TABLE STATUSES ───────────────────────────────────
-- Previously 'available', 'occupied', 'reserved'
-- Now we need 'cleaning', 'billing'
-- Since we defined `status TEXT` originally for tables, we can just use constraints or let it be flexible.
ALTER TABLE tables DROP CONSTRAINT IF EXISTS tables_status_check;
ALTER TABLE tables ADD CONSTRAINT tables_status_check CHECK (status IN ('available', 'occupied', 'reserved', 'cleaning', 'billing'));

-- Add floor layout mapping columns
ALTER TABLE tables 
ADD COLUMN IF NOT EXISTS x_coord NUMERIC(5, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS y_coord NUMERIC(5, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS shape TEXT DEFAULT 'rectangle', -- rectangle, circle
ADD COLUMN IF NOT EXISTS floor_name TEXT DEFAULT 'Main Floor';

-- ─── TRANSACTIONS & PAYMENTS ─────────────────────────────────
CREATE TABLE transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id      UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  branch_id       UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  payment_method  TEXT NOT NULL, -- UPI, Card, Cash, Wallet
  gateway_response JSONB,
  reference_no    TEXT,
  amount          NUMERIC(10, 2) NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending', -- pending, verified, failed
  verified_by     UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime for the new tables/columns
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
COMMIT;
