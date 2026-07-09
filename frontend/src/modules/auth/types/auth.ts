export interface AuthUser {
  id: string;
  email: string;
  role: 'owner' | 'cashier';
  fullName?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}
