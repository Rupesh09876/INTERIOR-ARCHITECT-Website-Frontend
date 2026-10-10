import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, ApiError } from '../../lib/api';

export interface AdminUser {
  id?: number | string;
  name: string;
  email: string;
  role: string;
  status?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  login: (emailOrPassword: string, maybePassword?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (cur: string, next: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: { name: string; email: string }) => Promise<{ success: boolean; error?: string }>;
}

const AdminAuthContext = createContext<AuthState | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('rt_admin_token');
  });
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('rt_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api.auth
      .me()
      .then((data) => {
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        localStorage.removeItem('rt_admin_token');
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (
    emailOrPassword: string,
    maybePassword?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      let email = 'admin@royaltouch.com';
      let password = emailOrPassword;

      if (maybePassword !== undefined) {
        email = emailOrPassword;
        password = maybePassword;
      }

      // If password is royaltouch2026, also allow dev fallback
      if (password === 'royaltouch2026' && !maybePassword) {
        password = 'ChangeMe@123!';
      }

      const res = await api.auth.login(email, password);
      if (res.admin) {
        setUser(res.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : 'Invalid credentials or connection error.';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // ignore network errors on logout
    } finally {
      localStorage.removeItem('rt_admin_token');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const changePassword = async (cur: string, next: string) => {
    try {
      await api.auth.changePassword(cur, next);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to change password' };
    }
  };

  const updateProfile = async (data: { name: string; email: string }) => {
    try {
      const updated = await api.auth.updateProfile(data);
      if (updated) {
        setUser((prev) => ({ ...prev, ...updated }));
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update profile' };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        changePassword,
        updateProfile,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
