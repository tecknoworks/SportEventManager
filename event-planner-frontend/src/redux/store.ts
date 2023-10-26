import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from 'features/homepage/store/homepageSlice'
import logInReducer from 'features/login/store/slices/logInSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    logIn: logInReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
