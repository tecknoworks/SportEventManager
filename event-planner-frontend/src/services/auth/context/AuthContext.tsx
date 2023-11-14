import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface AuthContextInterface {
  token: string | null;
}

interface JwtClaims {
  UserId: string;
  [key: string]: string;
}

export type UserDetails = {
  userId: string;
  username: string;
  email: string;
  role: string;
};

export const AuthContext = React.createContext<AuthContextInterface>({
  token: null,
});

export const getUserFromToken = (token: string) => {
  if (!token) return undefined;

  const decodedToken: JwtPayload = jwtDecode(token);

  const userDetails: UserDetails = {
    userId: (decodedToken as JwtClaims).UserId,
    username: (decodedToken as JwtClaims)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    email: (decodedToken as JwtClaims)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
    role: (decodedToken as JwtClaims)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
  };

  return userDetails;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const tokenFromLocalStorage = useSelector(selectToken);
  const [authState, setAuthState] = useState<AuthContextInterface>(() => {
    return {
      token: tokenFromLocalStorage || null,
    };
  });

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}
