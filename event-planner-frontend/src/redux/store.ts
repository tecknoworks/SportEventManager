import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homePageReducer from 'features/homepage/store/homepageSlice';
import signupPageReducer from 'features/registration/store/signupPageSlice';

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    signupPage: signupPageReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
