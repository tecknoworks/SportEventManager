import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from 'features/homepage/store/homepageSlice'

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
