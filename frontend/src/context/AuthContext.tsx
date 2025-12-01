import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../api/client';
import type { ReactNode } from 'react';
import type { User } from '../types';

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterPayload = Credentials & {
  name: string;
};

type AuthContextShape = {
  user: User | null;
  token: string | null;
  authLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('stellar-auth-token'));
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setAuthToken(null);
        setAuthLoading(false);
        return;
      }

      setAuthToken(token);
      try {
        const { data } = await api.get<User>('/auth/profile');
        setUser(data);
      } catch (error) {
        console.error('Profile fetch failed', error);
        setTokenState(null);
        setAuthToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const persistToken = (newToken: string | null) => {
    setTokenState(newToken);
    setAuthToken(newToken);
  };

  const login = async ({ email, password }: Credentials) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
    setUser(data.user);
    persistToken(data.token);
  };

  const register = async ({ name, email, password }: RegisterPayload) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/register', { name, email, password });
    setUser(data.user);
    persistToken(data.token);
  };

  const logout = () => {
    setUser(null);
    persistToken(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const { data } = await api.get<User>('/auth/profile');
    setUser(data);
  };

  const value = useMemo(
    () => ({ user, token, authLoading, login, register, logout, refreshProfile }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
