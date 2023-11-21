import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { selectToken } from 'features/login/store/selectors/logInSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from 'services/auth/context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { logout } from 'features/login/store/slices/logInSlice';

interface PrivateRouteProps {
  children: ReactNode;
}

type DecodedToken = {
  exp: number;
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwtDecode(token) as DecodedToken;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return false;
  }
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const isAuthenticated = !!token && !isTokenExpired(token);

  const expired = isTokenExpired(token);
  if (expired) {
    dispatch(logout())
  }

  return <>{isAuthenticated ? children : <Navigate to="/login" replace />}</>;
}

export function LoggedInRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectToken);
  const isAuthenticated = !!token;

  return <>{!isAuthenticated ? children : <Navigate to="/" replace />}</>;
}

export function OnlyAdminRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectToken);
  const user = getUserFromToken(token || '');
  const isAdmin = user?.role === 'Admin' ? true : false;

  return <>{isAdmin ? children : <Navigate to="/" replace />}</>;
}


