import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getMe, refreshCsrfToken } from './authApi';

interface AuthContextValue {
  isLogin: boolean;
  isAuthLoading: boolean;
  setIsLogin: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogin: false,
  isAuthLoading: true,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isLogin') === 'true');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const handleSetIsLogin = (v: boolean) => {
    setIsLogin(v);
    if (v) localStorage.setItem('isLogin', 'true');
    else localStorage.removeItem('isLogin');
  };

  useEffect(() => {
    getMe()
      .then(() => {
        handleSetIsLogin(true);
        refreshCsrfToken().catch(() => {});
      })
      .catch(() => handleSetIsLogin(false))
      .finally(() => setIsAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, isAuthLoading, setIsLogin: handleSetIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
