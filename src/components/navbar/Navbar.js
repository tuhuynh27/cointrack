import React, { useState } from 'react'
import styles from './Navbar.module.scss'

import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Logo from 'assets/img/logo.png'

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
            <Link to='/login'><button className={styles.signIn}>Sign in</button></Link>
            <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
              <button className={styles.getStarted}>Get started</button></Link>
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
            <button className={styles.getStarted} onClick={toggleMobileMenu}>Get started</button>
            <button className={styles.signIn} onClick={toggleMobileMenu}>Sign in</button>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Navbar
