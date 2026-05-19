import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getMe, refreshCsrfToken } from './authApi';

interface AuthContextValue {
  isLogin: boolean;
  isAuthLoading: boolean;
  userId: number | null;
  setIsLogin: (v: boolean) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isLogin: false,
  isAuthLoading: true,
  userId: null,
  setIsLogin: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isLogin') === 'true');
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const handleSetIsLogin = useCallback((v: boolean) => {
    setIsLogin(v);
    if (v) localStorage.setItem('isLogin', 'true');
    else {
      localStorage.removeItem('isLogin');
      setUserId(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const res = await getMe();
    if (!res.data?.userId) {
      handleSetIsLogin(false);
      return;
    }
    handleSetIsLogin(true);
    setUserId(res.data.userId);
  }, [handleSetIsLogin]);

  useEffect(() => {
    let cancelled = false;
    getMe()
      .then((res) => {
        if (cancelled) return;
        if (!res.data?.userId) {
          handleSetIsLogin(false);
          return;
        }
        handleSetIsLogin(true);
        setUserId(res.data.userId);
        refreshCsrfToken().catch(() => {});
      })
      .catch(() => {
        if (!cancelled) handleSetIsLogin(false);
      })
      .finally(() => {
        if (!cancelled) setIsAuthLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogin, isAuthLoading, userId, setIsLogin: handleSetIsLogin, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
