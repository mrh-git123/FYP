import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import adminApi, { setAuthToken } from '../api/client';
import type { AdminUser } from '../types';

export type Credentials = {
  email: string;
  password: string;
};

interface AuthContextShape {
  user: AdminUser | null;
  token: string | null;
  authLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('stellar-admin-token'));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setAuthToken(null);
        setAuthLoading(false);
        return;
      }

      setAuthToken(token);
      try {
        const { data } = await adminApi.get<AdminUser>('/auth/profile');
        if (data.role !== 'admin') {
          throw new Error('Admin access required');
        }
        setUser(data);
      } catch (error) {
        console.error('Admin session bootstrap failed', error);
        setUser(null);
        setToken(null);
        setAuthToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const persistToken = (value: string | null) => {
    setToken(value);
    setAuthToken(value);
  };

  const login = async ({ email, password }: Credentials) => {
    const { data } = await adminApi.post<{ token: string; user: AdminUser }>('/auth/login', { email, password });
    if (data.user.role !== 'admin') {
      throw new Error('Admin access required.');
    }
    setUser(data.user);
    persistToken(data.token);
  };

  const logout = () => {
    setUser(null);
    persistToken(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const { data } = await adminApi.get<AdminUser>('/auth/profile');
    setUser(data);
  };

  const value = useMemo(
    () => ({ user, token, authLoading, login, logout, refreshProfile }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
