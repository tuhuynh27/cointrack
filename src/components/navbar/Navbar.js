import React, { useState } from 'react'
import styles from './Navbar.module.scss'

import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Logo from 'assets/img/logo.png'
import { useSelector } from 'react-redux'
import { logout, selectProfile } from 'modules/profile/profileSlice'
import { useDispatch } from 'react-redux'
import RenderIf from 'components/condition/RenderIf'

const menu = [
  {
    text: 'Portfolio',
    link: '/portfolio'
  },
  {
    text: 'Transactions',
    link: '/transactions'
  },
  {
    text: 'PnL Analysis',
    link: '/pnl'
  },
  {
    text: 'Bot Trading',
    link: '/bot-trading'
  },
  {
    text: 'Market Updates',
    link: '/market-updates'
  }
]

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profile = useSelector(selectProfile)
  const dispatch = useDispatch()

  function toggleMobileMenu() {
    setIsMobileMenuOpen(m => !m)
  }

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.inner}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}><img src={Logo} alt="Logo"/></Link>
          <div className={styles.menu}>
            {menu.map(m => (
              <Link to={m.link} key={m.link}><div>{m.text}</div></Link>
            ))}
          </div>
          <div className={styles.buttons}>
            <RenderIf value={!profile.isLoggedIn}>
              <Link to='/login'><button className={styles.signIn}>Sign in</button></Link>
              <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
                <button className={styles.getStarted}>Get started</button></Link>
            </RenderIf>
            <RenderIf value={profile.isLoggedIn}>
              <Link to='/portfolio' onClick={() => setIsMobileMenuOpen(false)}>
                <button className={styles.getStarted}>Check PnL</button></Link>
              <div className={styles.avatarSection}>
                <img onClick={() => setProfileDropdownOpen(t => !t)}
                     src={profile.profileImage} alt="Avatar" crossOrigin="anonymous"/>
                <img onClick={() => setProfileDropdownOpen(t => !t)} className={styles.pointingDown}
                     src="https://www.svgrepo.com/show/58069/down-arrow.svg" alt="Down"/>
                {profileDropdownOpen && <div className={styles.dropdownMenu}>
                  <div>Profile Page</div>
                  <div onClick={() => {
                    dispatch(logout())
                    setProfileDropdownOpen(false)
                  }}>Logout</div>
                </div>}
              </div>
            </RenderIf>
            <div className={styles.mobileMenuButton}>
              <div className={isMobileMenuOpen ? styles.closeButton : styles.openButton} onClick={toggleMobileMenu}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CSSTransition
        in={isMobileMenuOpen}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div className={styles.mobileMenu}>
          <div className={styles.menuList}>
            {menu.map(m => (
              <Link to={m.link} key={m.link} onClick={toggleMobileMenu}><div>{m.text}</div></Link>
            ))}
          </div>
          <div className={styles.mobileButtons}>
            <RenderIf value={!profile.isLoggedIn}>
              <button className={styles.getStarted} onClick={toggleMobileMenu}>Get started</button>
              <button className={styles.signIn} onClick={toggleMobileMenu}>Sign in</button>
            </RenderIf>
            <RenderIf value={profile.isLoggedIn}>
              <img src={profile.profileImage} alt="Down"/>
              <p>Hi, {profile.email}</p>
              <button className={styles.signIn} onClick={() => {
                setIsMobileMenuOpen(false)
                dispatch(logout())
              }}>Logout</button>
            </RenderIf>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Navbar
