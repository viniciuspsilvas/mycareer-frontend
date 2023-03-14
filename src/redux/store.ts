import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationState'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
