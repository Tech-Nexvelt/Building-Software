import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.');
}

// We use the Service Role Key in the backend to bypass RLS and perform administrative actions
// User operations that require RLS should pass the user's JWT token
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
