"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { authService } from '../services/auth.service';
import { loginAction } from '../actions/login';
import { logoutAction } from '../actions/logout';
import type { AuthContextType, AuthUser, AuthSession } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionAndUser = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setUser({ id: 'demo-user', email: 'admin@nexvelt.com', role: 'owner', name: 'Demo Admin' } as any);
        setSession({ accessToken: 'demo-token', refreshToken: 'demo', expiresAt: 9999999999 });
        setLoading(false);
        return;
      }
      
      const supabase = createClient();
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession) {
        setSession({
          accessToken: currentSession.access_token,
          refreshToken: currentSession.refresh_token,
          expiresAt: currentSession.expires_at || 0,
        });
        
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching auth state', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndUser();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, _session) => {
        fetchSessionAndUser();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    return await loginAction(email, password);
  };

  const logout = async () => {
    await logoutAction();
  };

  const refreshSession = async () => {
    await fetchSessionAndUser();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
