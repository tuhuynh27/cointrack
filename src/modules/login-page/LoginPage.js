import { useState, useRef, useEffect } from 'react'
import styles from './LoginPage.module.scss'

import { validateEmail } from 'utils/validation'
import { getQueryParam } from 'utils/queryString'

import { toast } from 'utils/toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile, setProfile } from 'modules/profile/profileSlice'
import { useLocation, useNavigate } from 'react-router-dom'

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
    const { id, value } = e.target
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
          dispatch(setProfile({ isLoggedIn: true, email: 'beta@cointrack.me' }))
          toast('Welcome back beta@cointrack.me')
          if (location.pathname === '/login') {
            navigate('/portfolio')
          }
        } else {
          setEmailError('No Cointrack account exists for this email. Please check your spelling or create an account.')
        }
      }, 2000)
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
                   autoComplete="email"
                   value={email} onChange={handleInputChange} ref={emailInputRef} />
            {emailError.length ? <p className={styles.errorMessage}>{emailError}</p> : null}
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="password">Password</label>
            <input className={passwordError.length ? styles.error : null} id="password" type="password"
                   autoComplete="current-password"
                   value={password} onChange={handleInputChange} />
            {passwordError.length ? <p className={styles.errorMessage}>{passwordError}</p> : null}
          </div>
          <div className={styles.buttonGroup}>
            <button disabled={isLoading} className={isLoading ? styles.loading : null} onClick={handleSubmit} type="submit">Continue</button>
            <button onClick={() =>
              toast(`Now we're only open to beta testers, if you're interested in beta access, please contact us at beta@cointrack.me`)}
                    className={styles.secondaryButton} type="button">Create account</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
