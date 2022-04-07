import { configureStore } from '@reduxjs/toolkit'

import profileReducer from 'modules/profile/profileSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
})
