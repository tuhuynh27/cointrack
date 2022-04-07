import React from 'react'
import LoginPage from 'modules/login-page/LoginPage'
import { useSelector } from 'react-redux'
import { selectProfile } from 'modules/profile/profileSlice'

function RequireAuth({ children }) {
  const profile = useSelector(selectProfile)

  if (!profile.isLoggedIn) {
    return <React.Fragment>
      <p style={{ margin: '10px 20px' }}>Please login (or create account) to access this feature</p>
      <LoginPage />
    </React.Fragment>
  }

  return children;
}

export default RequireAuth
