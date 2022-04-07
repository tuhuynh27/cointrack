import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: '',
  name: '',
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
      state.name = action.payload.name
      state.profileImage = action.payload.profileImage
      saveToLocalStorage({ isLoggedIn: true, email: action.payload.email, name: action.payload.name,
        profileImage: action.payload.profileImage })
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.email = ''
      state.name = ''
      state.profileImage = ''
      saveToLocalStorage({ isLoggedIn: false, email: '', name: '', profileImage: '' })
      window.location.reload()
    },
  },
})

export const { setProfile, logout } = profileSlice.actions

export const selectProfile = (state) => state.profile

export default profileSlice.reducer
