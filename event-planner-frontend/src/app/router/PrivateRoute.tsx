import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth/context/AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
}

export function PrivateRoute({ element, ...rest }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return <Route {...rest} element={isAuthenticated ? element : <Navigate to="/" replace />} />;
}
