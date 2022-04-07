import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: '',
}

function saveToLocalStorage(state) {
  localStorage.setItem('profile', JSON.stringify(state))
}

function parseFromLocalStorage() {
  const profile = localStorage.getItem('profile')
  if (profile) {
    return JSON.parse(profile)
  }
  return initialState
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: parseFromLocalStorage(),
  reducers: {
    setProfile: (state, action) => {
      state.isLoggedIn = true
      state.email = action.payload.email
      saveToLocalStorage({ isLoggedIn: true, email: action.payload.email })
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.email = null
    },
  },
})

export const { setProfile, logout } = profileSlice.actions

export const selectProfile = (state) => state.profile

export default profileSlice.reducer
