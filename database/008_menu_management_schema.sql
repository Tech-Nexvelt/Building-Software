-- ============================================================
-- Nexvelt POS — 008 Menu Management Schema
-- ============================================================

-- ─── UPDATE MENU ITEMS TABLE ─────────────────────────────────
-- Expand the existing menu_items table with deep dietary, SEO, and visibility fields
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS preparation_time INTEGER DEFAULT 15, -- minutes
ADD COLUMN IF NOT EXISTS spice_level INTEGER DEFAULT 0 CHECK (spice_level BETWEEN 0 AND 5),
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS is_vegan BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_jain BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_todays_special BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS display_priority INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock', 'scheduled'));

-- ─── VARIANTS ────────────────────────────────────────────────
-- Flat structure for item variants (e.g., Small, Medium, Large)
CREATE TABLE item_variants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  price           NUMERIC(10, 2) NOT NULL,
  is_available    BOOLEAN NOT NULL DEFAULT true,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ADD-ONS ─────────────────────────────────────────────────
-- Flat structure for add-ons (e.g., Extra Cheese, Extra Sauce)
CREATE TABLE item_addons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  price           NUMERIC(10, 2) NOT NULL,
  is_available    BOOLEAN NOT NULL DEFAULT true,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime for the new tables
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE item_variants, item_addons;
COMMIT;
