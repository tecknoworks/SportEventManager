import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from 'features/homepage/store/homepageSlice';
import passwordRecoveryReducer from 'features/password-recovery/store/passwordRecoverySlice';

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    passwordRecovery: passwordRecoveryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
