import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import RenderIf from 'coinbase-ui/condition/RenderIf'
import Button from 'coinbase-ui/button/Button'
import { CSSTransition } from 'react-transition-group'
import React, { useState, useContext } from 'react'
import ThemeContext from 'coinbase-ui/context/ThemeContext'

function Navbar({ menu = [], profile = {
  name: 'John Doe',
  isLoggedIn: false,
  profileImage: 'https://randomuser.me/api/portraits',
}, onLogin = () => {}, onLogout = () => {} }) {
  const theme = useContext(ThemeContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen(m => !m)
  }

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.inner}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}><img src={theme.logo} alt="Logo"/></Link>
          <div className={styles.menu}>
            {menu.map(m => (
              <Link to={m.link} key={m.link}><div>{m.text}</div></Link>
            ))}
          </div>
          <div className={styles.buttons}>
            <RenderIf value={!profile.isLoggedIn}>
              <Link to='/login'><Button type="secondary" noBorder className={styles.hideOnMobile}>Sign in</Button></Link>
              <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
                <Button>Get started</Button></Link>
            </RenderIf>
            <RenderIf value={profile.isLoggedIn}>
              <Link to='/upgrade' onClick={() => setIsMobileMenuOpen(false)}>
                <Button type="secondary">Upgrade+</Button></Link>
              <div className={styles.avatarSection}>
                <img onClick={() => setProfileDropdownOpen(t => !t)}
                     src={profile.profileImage} alt="Avatar" crossOrigin="anonymous"/>
                <img onClick={() => setProfileDropdownOpen(t => !t)} className={styles.pointingDown}
                     src="https://www.svgrepo.com/show/58069/down-arrow.svg" alt="Down"/>
                {profileDropdownOpen && <div className={styles.dropdownMenu}>
                  <div>Profile Page</div>
                  <div onClick={() => {
                    onLogout()
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
              <Button fullWidth light onClick={() => {
                toggleMobileMenu()
                onLogin()
              }}>Get started</Button>
              <Button type="secondary" fullWidth light onClick={() => {
                toggleMobileMenu()
                onLogin()
              }}>Sign in</Button>
            </RenderIf>
            <RenderIf value={profile.isLoggedIn}>
              <img src={profile.profileImage} alt="Down"/>
              <p>Hi, {profile.name}</p>
              <Button type="secondary" fullWidth light onClick={() => {
                setIsMobileMenuOpen(false)
                onLogout()
              }}>Logout</Button>
            </RenderIf>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Navbar
