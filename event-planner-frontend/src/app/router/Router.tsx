import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'features/homepage/HomePage';
import NotFound from 'features/static-pages/NotFound';
import Layout from './Layout';
import SignUpPage from 'features/registration/views/SignUpPage';
import LoginPage from 'features/login/LoginPage';
import PasswordRecoveryPage from 'features/password-recovery/views/PasswordRecoveryPage';
import CreateNewPasswordPage from 'features/password-recovery/views/CreateNewPasswordPage';
import EditProfilePage from 'features/profile/views/EditProfilePage';
import AccountConfirmationPage from 'features/account-confirmation/views/AccountConfirmationPage';
import { useToast } from '@chakra-ui/react';
import { initializeErrorHandlingService } from 'services/notificationHandlingService';
import AdminPage from 'features/admin-management/AdminPage';
import CreateEventPage from 'features/event/views/CreateEventPage';
import EditEventPage from 'features/event/views/EditEventPage';
import { LoggedInRoute, OnlyAdminRoute, PrivateRoute } from './PrivateRoute';
import SeeProfilePage from 'features/profile/views/SeeProfilePage';
import DetailsPage from 'features/details-page/DetailsPage';
import BrowseEvents from 'features/browse-events/BrowseEvents';
import MyEvents from 'features/my-events/MyEvents';
import ChatPage from 'features/chat/views/ChatPage';
import EventUsers from 'features/event-users/EventUsers';
import ReviewEventPage from 'features/review-event/ReviewEventPage';
import JoinedEvents from 'features/joined-events/JoinedEvents';

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

          <Route path="event-details/:eventId" element={<DetailsPage />} />
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
            path="/joined-events"
            element={
              <PrivateRoute>
                <JoinedEvents />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute>
                <SeeProfilePage />
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
          <Route
            path="my-events"
            element={
              <PrivateRoute>
                <MyEvents />
              </PrivateRoute>
            }
          />
          <Route
            path="event-users/:eventId"
            element={
              <PrivateRoute>
                <EventUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="review-event"
            element={
              <PrivateRoute>
                <ReviewEventPage />
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
