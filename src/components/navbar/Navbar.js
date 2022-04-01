import styles from './Navbar.module.scss'

import { Link } from 'react-router-dom'

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
  return (
    <div className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/"><img src={Logo} alt="Logo"/></Link>
        <div className={styles.menu}>
          {menu.map(m => (
            <Link to={m.link}><div key={m.link}>{m.text}</div></Link>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.signIn}>Sign in</button>
          <button className={styles.getStarted}>Get started</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
