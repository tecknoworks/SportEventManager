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
import CreateEventPage from 'features/event/views/CreateEventPage';
import EditEventPage from 'features/event/views/EditEventPage';
import { LoggedInRoute, OnlyAdminRoute, PrivateRoute } from './PrivateRoute';
import BrowseEvents from 'features/browse-events/BrowseEvents';

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
          <Route
            path="login"
            element={
              <LoggedInRoute>
                <LoginPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="signup"
            element={
              <LoggedInRoute>
                <SignUpPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="confirm-account"
            element={
              <LoggedInRoute>
                <AccountConfirmationPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="recover-password"
            element={
              <LoggedInRoute>
                <PasswordRecoveryPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <LoggedInRoute>
                <CreateNewPasswordPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <OnlyAdminRoute>
                <AdminPage />
              </OnlyAdminRoute>
            }
          />
          <Route
            path="create-event"
            element={
              <PrivateRoute>
                <CreateEventPage />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-event/:eventId"
            element={
              <PrivateRoute>
                <EditEventPage />
              </PrivateRoute>
            }
          />
          <Route path="/browseevents" element={<BrowseEvents />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
