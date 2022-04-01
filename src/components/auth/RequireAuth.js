import React, { useState } from 'react'
import LoginPage from '../../modules/login-page/LoginPage'

function RequireAuth({ children }) {
  const [isAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <React.Fragment>
      <p style={{ margin: '10px 20px' }}>Please login (or create account) to access this feature</p>
      <LoginPage />
    </React.Fragment>
  }

  return children;
}

export default RequireAuth
