// RouterComponent.tsx
import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'features/homepage/HomePage';
import NotFound from 'features/static-pages/NotFound';
import Layout from './Layout';
import SignUpPage from 'features/registration/views/SignUpPage';
import LoginPage from 'features/login/LoginPage';
import PasswordRecoveryPage from 'features/password-recovery/views/PasswordRecoveryPage';
import CreateNewPasswordPage from 'features/password-recovery/views/CreateNewPasswordPage';
import EditProfilePage from 'features/profile/ProfilePage';
import AccountConfirmationPage from 'features/account-confirmation/views/AccountConfirmationPage';
import { useToast } from '@chakra-ui/react';
import { initializeErrorHandlingService } from 'services/notificationHandlingService';
import AdminPage from 'features/admin-management/AdminPage';
import { PrivateRoute } from './PrivateRoute';

const RouterComponent: FC = () => {
  const toast = useToast();

  useEffect(() => {
    initializeErrorHandlingService(toast);
  }, [toast]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="confirm-account" element={<AccountConfirmationPage />} />
          <Route path="recover-password" element={<PasswordRecoveryPage />} />
          <Route path="reset-password" element={<CreateNewPasswordPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
