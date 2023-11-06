import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { useSelector } from 'react-redux';
import { getUserFromToken } from 'services/auth/context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;
  return <>{isAuthenticated ? children : <Navigate to="/" replace />}</>;
}

export function LoggedInRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;

  return <>{!isAuthenticated ? children : <Navigate to="/" replace />}</>;
}

export function OnlyAdminRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || "");
  const isAdmin = user?.role === 'Admin' ? true : false;

  return <>{isAdmin ? children : <Navigate to="/" replace />}</>;
}
