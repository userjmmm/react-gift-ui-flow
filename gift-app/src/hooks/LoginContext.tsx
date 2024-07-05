import { createContext, useState, ReactNode, useContext, useMemo } from 'react';

interface LoginContextProps {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = sessionStorage.getItem('isLoggedIn');
    return saved === 'true';
  });
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem('username') || '';
  });

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
  };

  const value = useMemo(
    () => ({ isLoggedIn, username, login, logout }),
    [isLoggedIn, username]
  );

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin은 LoginProvider 내에서 사용해야 합니다.');
  }
  return context;
};