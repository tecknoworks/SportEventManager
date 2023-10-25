import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homePageReducer from 'features/homepage/store/homepageSlice';
import signupPageReducer from 'features/registration/store/signupPageSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({
    homePage: homePageReducer,
    signupPage: signupPageReducer,
  }),
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunkConfig = { dispatch: AppDispatch; state: RootState };
