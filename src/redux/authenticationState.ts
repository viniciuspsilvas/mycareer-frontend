import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, User } from 'src/generated/graphql'

import { RootState } from './store'

export interface AuthenticationState {
  user?: User
  accessToken?: string
}

const initialState: AuthenticationState = {}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    }
  }
})

export const { authenticate } = authenticationSlice.actions

export const getUser = (state: RootState) => state.authentication.user
export const getAccessToken = (state: RootState) => state.authentication.accessToken

export default authenticationSlice.reducer
