import './Navbar.scss'

import Logo from 'assets/img/logo.png'

function Navbar() {
  return (
    <div className="navbar">
      <div className="inner">
        <img src={Logo} alt="Logo"/>
        <div className="menu">
          <div>Portfolio</div>
          <div>Transactions</div>
          <div>PnL Analysis</div>
          <div>Bot Trading</div>
          <div>Market Updates</div>
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
