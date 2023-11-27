import { configureStore } from '@reduxjs/toolkit';
import newPasswordReducer from 'features/password-recovery/store/slices/newPasswordSlice';
import resetLinkReducer from 'features/password-recovery/store/slices/resetLinkSlice';

import logInReducer from 'features/login/store/slices/logInSlice';
import signupPageReducer from 'features/registration/store/signupPageSlice';
import profileReducer from 'features/profile/store/slices/profileSlice';
import accountConfirmationReducer from 'features/account-confirmation/store/slices/accountConfirmationSlice';
import eventReducer from 'features/event/store/slices/eventSlice';
import adminReducer from 'features/admin-management/store/slices/adminSlice';
import eventsReducer from 'features/browse-events/store/slices/eventsPageSlice';
import chatReducer from 'features/chat/store/slices/chatSlice';
import detailsReducer from 'features/details-page/store/slices/detailsSlice';
import joinedEventsReducer from 'features/joined-events/store/slices/joinedEventsSlice'
import notificationReducer from 'common/components/NavigationMenu/store/notificationSlice';

export const store = configureStore({
  reducer: {
    newPasswordPage: newPasswordReducer,
    resetLinkPage: resetLinkReducer,
    logIn: logInReducer,
    signupPage: signupPageReducer,
    profilePage: profileReducer,
    confirmAccount: accountConfirmationReducer,
    eventPage: eventReducer,
    adminPage: adminReducer,
    detailsPage: detailsReducer,
    browseEventsPage: eventsReducer,
    chatPage: chatReducer,
    joinedEventsPage: joinedEventsReducer,
    notification: notificationReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
