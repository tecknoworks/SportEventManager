import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { useSelector } from 'react-redux';

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
