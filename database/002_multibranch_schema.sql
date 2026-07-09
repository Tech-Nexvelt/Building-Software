-- ============================================================
-- Nexvelt POS — 002 Multi-Branch & Realtime Schema
-- ============================================================

-- ─── BRANCHES ────────────────────────────────────────────────
CREATE TABLE branches (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  address     TEXT,
  phone       TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default main branch
INSERT INTO branches (name, address, phone)
VALUES ('Main Branch', 'Default Address', '0000000000');

-- ─── MODIFY PROFILES ─────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN branch_id UUID REFERENCES branches(id);
-- Assign all existing users to main branch
UPDATE profiles SET branch_id = (SELECT id FROM branches LIMIT 1);

-- ─── MODIFY SETTINGS ─────────────────────────────────────────
ALTER TABLE settings ADD COLUMN branch_id UUID REFERENCES branches(id);
UPDATE settings SET branch_id = (SELECT id FROM branches LIMIT 1);

-- ─── MODIFY CATEGORIES ───────────────────────────────────────
ALTER TABLE categories ADD COLUMN branch_id UUID REFERENCES branches(id);
UPDATE categories SET branch_id = (SELECT id FROM branches LIMIT 1);

-- ─── MODIFY PRODUCTS ─────────────────────────────────────────
ALTER TABLE products ADD COLUMN branch_id UUID REFERENCES branches(id);
UPDATE products SET branch_id = (SELECT id FROM branches LIMIT 1);

-- ─── MODIFY ORDERS ───────────────────────────────────────────
ALTER TABLE orders ADD COLUMN branch_id UUID REFERENCES branches(id);
UPDATE orders SET branch_id = (SELECT id FROM branches LIMIT 1);

-- ─── ENABLE REALTIME ─────────────────────────────────────────
-- Setup tables for Supabase Realtime
-- NOTE: Requires `supabase_realtime` publication to be active.
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE orders, order_items;
COMMIT;
