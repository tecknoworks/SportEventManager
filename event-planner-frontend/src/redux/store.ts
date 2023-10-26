import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from 'features/homepage/store/homepageSlice';
import newPasswordReducer from 'features/password-recovery/store/slices/newPasswordSlice';
import resetLinkReducer from 'features/password-recovery/store/slices/resetLinkSlice';

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    resetLink: resetLinkReducer,
    newPassword: newPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
