import React, { useState, useEffect } from 'react';

interface AuthContextInterface {
  token: string | null;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  token: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextInterface>({
    token: null,
    isAuthenticated: false,
  });

  const checkToken = () => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      console.log('from context --> yes');
      setAuthState({
        token: tokenFromLocalStorage,
        isAuthenticated: true,
      });
      console.log(authState.isAuthenticated);
    } else {
      console.log('from context --> no');
      setAuthState({
        token: null,
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
