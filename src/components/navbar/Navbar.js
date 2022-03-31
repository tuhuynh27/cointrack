import './Navbar.scss'

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
    <div className="navbar">
      <div className="inner">
        <Link to="/"><img src={Logo} alt="Logo"/></Link>
        <div className="menu">
          {menu.map(m => (
            <Link to={m.link}><div key={m.link}>{m.text}</div></Link>
          ))}
        </div>
        <div className="buttons">
          <button className="sign-in">Sign in</button>
          <button className="get-started">Get started</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
