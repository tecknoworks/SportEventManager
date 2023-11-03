import React, { useContext, ReactNode, useEffect } from 'react';
import { AuthContext } from '../../services/auth/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);
  return <>{isAuthenticated ? children : <Navigate to="/" replace />}</>;
}

export function LoggedInRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return <>{!isAuthenticated ? children : <Navigate to="/" replace />}</>;
}
