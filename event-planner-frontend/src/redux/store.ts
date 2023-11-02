import { configureStore } from '@reduxjs/toolkit';
import newPasswordReducer from 'features/password-recovery/store/slices/newPasswordSlice';
import resetLinkReducer from 'features/password-recovery/store/slices/resetLinkSlice';
import logInReducer from 'features/login/store/slices/logInSlice';
import signupPageReducer from 'features/registration/store/signupPageSlice';
import profileReducer from 'features/profile/store/slices/profileSlice';
import accountConfirmationReducer from 'features/account-confirmation/store/slices/accountConfirmationSlice';
import authenticationReducer from '../services/auth/slice/authSlice';

export const store = configureStore({
  reducer: {
    newPasswordPage: newPasswordReducer,
    resetLinkPage: resetLinkReducer,
    logIn: logInReducer,
    signupPage: signupPageReducer,
    profilePage: profileReducer,
    confirmAccount: accountConfirmationReducer,
    auth: authenticationReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
