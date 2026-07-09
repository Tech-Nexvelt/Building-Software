-- ============================================================
-- Nexvelt POS — 003 QR Ordering & Dining Sessions Schema
-- ============================================================

-- ─── TABLES ──────────────────────────────────────────────────

CREATE TABLE tables (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id   UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  table_number TEXT NOT NULL,
  capacity    INTEGER NOT NULL DEFAULT 4,
  status      TEXT NOT NULL DEFAULT 'available', -- available, occupied, reserved
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(branch_id, table_number)
);

-- Insert a default table for main branch
INSERT INTO tables (branch_id, table_number)
SELECT id, 'T-01' FROM branches LIMIT 1;

-- ─── QR CODES ────────────────────────────────────────────────
CREATE TABLE qr_codes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id   UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  table_id    UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(table_id)
);

-- Insert a default QR for the default table
INSERT INTO qr_codes (branch_id, table_id)
SELECT branch_id, id FROM tables LIMIT 1;

-- ─── DINING SESSIONS ─────────────────────────────────────────
CREATE TABLE dining_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token   TEXT NOT NULL UNIQUE,
  branch_id       UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  table_id        UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'active', -- active, closed
  started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── LINK ORDERS TO SESSIONS ─────────────────────────────────
ALTER TABLE orders ADD COLUMN dining_session_id UUID REFERENCES dining_sessions(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN table_id UUID REFERENCES tables(id) ON DELETE SET NULL;

-- ─── INVOICES ────────────────────────────────────────────────
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number  TEXT NOT NULL UNIQUE,
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  branch_id       UUID NOT NULL REFERENCES branches(id),
  subtotal        NUMERIC(10, 2) NOT NULL,
  tax_amount      NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) NOT NULL,
  grand_total     NUMERIC(10, 2) NOT NULL,
  payment_method  TEXT,
  transaction_id  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CUSTOMER FEEDBACK ───────────────────────────────────────
CREATE TABLE customer_feedback (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dining_session_id UUID REFERENCES dining_sessions(id) ON DELETE SET NULL,
  branch_id       UUID NOT NULL REFERENCES branches(id),
  food_rating     INTEGER CHECK (food_rating BETWEEN 1 AND 5),
  service_rating  INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  overall_rating  INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  comments        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── NOTIFICATIONS (CALL WAITER) ─────────────────────────────
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id   UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  table_id    UUID REFERENCES tables(id) ON DELETE CASCADE,
  type        TEXT NOT NULL, -- e.g., 'call_waiter', 'water', 'bill'
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'pending', -- pending, acknowledged
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime for notifications
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE notifications, dining_sessions, tables;
COMMIT;
