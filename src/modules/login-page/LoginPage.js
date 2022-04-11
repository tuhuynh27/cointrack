import { useEffect, useRef, useState } from 'react'
import styles from './LoginPage.module.scss'

import { validateEmail } from 'utils/validation'
import { getQueryParam } from 'utils/queryString'

import { toast } from 'utils/toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile, setProfile } from 'modules/profile/profileSlice'
import { useLocation, useNavigate } from 'react-router-dom'

import GoogleLogin from 'react-google-login'
import GoogleSvg from 'modules/svg/google.svg'

function LoginPage() {
  const emailInputRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const profile = useSelector(selectProfile)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile.isLoggedIn && location.pathname === '/login') {
      navigate('/')
    }
  }, [location.pathname, navigate, profile.isLoggedIn])

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [emailInputRef])

  useEffect(() => {
    const param = getQueryParam('email')
    if (param) {
      setEmail(param)
    }
  }, [])

  function handleInputChange(e) {
    const {id, value} = e.target
    if (id === 'email') {
      setEmailError('')
      setEmail(value)
    } else if (id === 'password') {
      setPasswordError('')
      setPassword(value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (email === '') {
      setEmailError('Email is required')
    } else if (!validateEmail(email)) {
      setEmailError('Email is invalid')
    } else if (password === '') {
      setPasswordError('Password is required')
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        if (email === 'beta@cointrack.me') {
          onLogin({
            email: 'beta@cointrack.me',
            name: 'Beta User',
            profileImage: 'https://d33wubrfki0l68.cloudfront.net/19e8b1005d45f56e2c10ad30e215298ce50c677e/6f09c/tu-huynh.jpg',
          })
        } else {
          setEmailError('No Cointrack account exists for this email. Please check your spelling or create an account.')
        }
      }, 2000)
    }
  }

  function responseGoogle(data) {
    if (data.error) return
    if (!data || !data.profileObj.email || !data.accessToken) return

    const img = data.profileObj.imageUrl.split('=')[0]

    onLogin({email: data.profileObj.email, name: data.profileObj.name, profileImage: img})
  }

  function onLogin({email, name, profileImage}) {
    dispatch(setProfile({isLoggedIn: true, email, name, profileImage}))
    toast(`Welcome back ${name}`)
    if (location.pathname === '/login') {
      navigate('/portfolio')
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <h1>Sign in</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputElement}>
            <label htmlFor="email">Email</label>
            <input className={emailError.length ? styles.error : null} id="email"
                   autoComplete="email" type="email"
                   value={email} onChange={handleInputChange} ref={emailInputRef}/>
            {emailError.length ?
              <p data-test="email-error" className={styles.errorMessage}>{emailError}</p> : null}
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="password">Password</label>
            <input className={passwordError.length ? styles.error : null} id="password" type="password"
                   autoComplete="current-password"
                   value={password} onChange={handleInputChange}/>
            {passwordError.length ?
              <p data-test="password-error" className={styles.errorMessage}>{passwordError}</p> : null}
          </div>
          <div className={styles.buttonGroup}>
            <button
              data-test="login-button"
              disabled={isLoading}
              className={isLoading ? styles.loading : null} onClick={handleSubmit}
              type="submit">
              Continue
            </button>
            <GoogleLogin
              clientId="834798810236-mo101qd4s238ajssl05n4j4t9i2r4ch5.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  data-test="google-login-button"
                  className={styles.secondaryButton}
                  type="button" onClick={renderProps.onClick}>
                  Log In With Google
                  <img src={GoogleSvg} alt="Google"/>
                </button>
              )}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
