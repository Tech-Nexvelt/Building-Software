import { createClient } from '@/lib/supabase/client';
import type { AuthUser } from '../types/auth';

export const authService = {
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const supabase = createClient();
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) return null;

      // Fetch profile details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profile } = await (supabase.from('profiles') as any)
        .select('id, email, full_name, role, avatar_url')
        .eq('id', user.id)
        .single();

      if (!profile) return null;

      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        fullName: profile.full_name,
        avatarUrl: profile.avatar_url,
      };
    } catch (error) {
      // Return mock user if hitting fetch failure (e.g. no Supabase configured)
      const isClient = typeof window !== 'undefined';
      if (isClient && document.cookie.includes('nexvelt_demo_auth=')) {
        const email = document.cookie.split('nexvelt_demo_auth=')[1]?.split(';')[0];
        return {
          id: 'demo-id',
          email: email || 'demo@nexvelt.com',
          role: email?.includes('owner') ? 'owner' : 'cashier',
          fullName: 'Demo User',
        };
      }
      return null;
    }
  }
};
