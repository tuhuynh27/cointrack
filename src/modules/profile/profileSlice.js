import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: '',
  profileImage: '',
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
      state.profileImage = action.payload.profileImage
      saveToLocalStorage({ isLoggedIn: true, email: action.payload.email, profileImage: action.payload.profileImage })
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.email = null
      state.profileImage = null
      saveToLocalStorage({ isLoggedIn: false, email: null, profileImage: null })
    },
  },
})

export const { setProfile, logout } = profileSlice.actions

export const selectProfile = (state) => state.profile

export default profileSlice.reducer
