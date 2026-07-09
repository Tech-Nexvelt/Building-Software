-- ============================================================
-- Nexvelt POS — 005 Kitchen Display System Schema
-- ============================================================

-- ─── UPDATE ENUMS ────────────────────────────────────────────
-- Define Priority Levels
CREATE TYPE order_priority AS ENUM ('low', 'normal', 'high');

-- Define Item Cooking Statuses
CREATE TYPE item_cooking_status AS ENUM ('pending', 'cooking', 'completed');


-- ─── UPDATE ORDERS ───────────────────────────────────────────
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS priority order_priority NOT NULL DEFAULT 'normal',
ADD COLUMN IF NOT EXISTS estimated_completion_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS chef_id UUID REFERENCES users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS kitchen_notes TEXT;


-- ─── UPDATE ORDER ITEMS ──────────────────────────────────────
ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS cooking_status item_cooking_status NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS kitchen_notes TEXT;


-- ─── KITCHEN ACTIVITY LOG ────────────────────────────────────
-- Track significant events for the kitchen analytics
CREATE TABLE kitchen_activity_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id   UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  chef_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL, -- e.g., 'started_preparing', 'marked_ready', 'delayed'
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime for the new tables/columns
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE kitchen_activity_logs;
COMMIT;
