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
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
  });

  const checkToken = () => {
    if (authState.token !== null) {
      setAuthState({
        ...authState,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        ...authState,
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
