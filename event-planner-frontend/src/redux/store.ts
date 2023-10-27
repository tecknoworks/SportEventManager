import newPasswordReducer from 'features/password-recovery/store/slices/newPasswordSlice';
import resetLinkReducer from 'features/password-recovery/store/slices/resetLinkSlice';
import logInReducer from 'features/login/store/slices/logInSlice'
import { configureStore } from '@reduxjs/toolkit';
import signupPageReducer from 'features/registration/store/signupPageSlice';

export const store = configureStore({
  reducer: {
    resetLink: resetLinkReducer,
    logIn: logInReducer,
    newPassword: newPasswordReducer,
    signupPage: signupPageReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
