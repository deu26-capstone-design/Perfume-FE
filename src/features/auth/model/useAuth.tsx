import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getMe, refreshCsrfToken } from './authApi';

interface AuthContextValue {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogin: false,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getMe()
      .then(() => {
        setIsLogin(true);
        refreshCsrfToken().catch(() => {});
      })
      .catch(() => setIsLogin(false));
  }, []);

  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
