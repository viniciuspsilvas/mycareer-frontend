import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './store'

export interface GlobalState {
  darkMode?: boolean
}

const initialState: GlobalState = {}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<{ darkMode?: boolean }>) => {
      state.darkMode = !action.payload.darkMode
    }
  }
})

export const { toggleDarkMode } = globalSlice.actions

export const isDarkMode = (state: RootState) => state.global.darkMode

export default globalSlice.reducer
