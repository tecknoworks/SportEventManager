import { JwtPayload, jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

interface AuthContextInterface {
  token: string | null;
  isAuthenticated: boolean;
}

interface JwtClaims {
  UserId: string;
  [key: string]: string;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  token: null,
  isAuthenticated: false,
});

export const getUserFromToken = (token: string) => {
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);

    const userId = (decodedToken as JwtClaims).UserId;
    const name = (decodedToken as JwtClaims)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const email = (decodedToken as JwtClaims)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const role = (decodedToken as JwtClaims)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return { userId, name, email, role };
  }

  return undefined;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextInterface>(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    return {
      token: tokenFromLocalStorage || null,
      isAuthenticated: !!tokenFromLocalStorage,
    };
  });

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
