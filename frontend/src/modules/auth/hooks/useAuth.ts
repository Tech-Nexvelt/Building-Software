import { useAuthContext } from '../components/AuthProvider';

export function useAuth() {
  const context = useAuthContext();
  return context;
}
