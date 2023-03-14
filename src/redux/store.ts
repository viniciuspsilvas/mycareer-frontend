import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import authenticationReducer from './authenticationState'
import storage from './storage'

const persistConfig = {
  key: 'root',
  storage
}
const reducers = combineReducers({
  authentication: authenticationReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
