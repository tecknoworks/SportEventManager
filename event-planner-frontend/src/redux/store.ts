import newPasswordReducer from 'features/password-recovery/store/slices/newPasswordSlice';
import resetLinkReducer from 'features/password-recovery/store/slices/resetLinkSlice';
import { configureStore } from '@reduxjs/toolkit';
import signupPageReducer from 'features/registration/store/signupPageSlice';
import logInReducer from 'features/login/store/slices/logInSlice';

export const store = configureStore({
  reducer: {
    resetLink: resetLinkReducer,
    newPassword: newPasswordReducer,
    signupPage: signupPageReducer,
    logIn: logInReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
