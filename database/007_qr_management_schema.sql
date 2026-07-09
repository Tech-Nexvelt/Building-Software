-- ============================================================
-- Nexvelt POS — 007 QR Management & Tracking Schema
-- ============================================================

-- ─── UPDATE QR CODES TABLE ───────────────────────────────────
-- Add management fields for tracking status and usage
ALTER TABLE qr_codes
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'unassigned' CHECK (status IN ('active', 'inactive', 'unassigned')),
ADD COLUMN IF NOT EXISTS last_scanned_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS total_scans INTEGER NOT NULL DEFAULT 0;

-- Optional: Since we are adding `status`, we could phase out `is_active` in the backend, but we'll keep it for backwards compatibility during MVP.

-- ─── QR SCANS LOGGING ────────────────────────────────────────
-- Tracks every individual scan for analytics (Most scanned tables, daily scans, etc.)
CREATE TABLE qr_scans (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  qr_code_id      UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
  branch_id       UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  table_id        UUID REFERENCES tables(id) ON DELETE SET NULL, -- Track which table it was assigned to at the time of scan
  device_info     TEXT, -- e.g., 'iOS Safari', 'Android Chrome'
  scan_source     TEXT, -- e.g., 'camera', 'app'
  is_valid        BOOLEAN NOT NULL DEFAULT true, -- e.g., false if scanned after expiry/inactivity
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime for the new table
BEGIN;
  ALTER PUBLICATION supabase_realtime ADD TABLE qr_scans, qr_codes;
COMMIT;
