import './styles.scss'

import Logo from './assets/img/logo.png'

import Heading from './components/heading/Heading'
import IndexChart from './components/index-chart/IndexChart'
import PortfolioShow from './components/portfolio-show/PortfolioShow'

export default function App() {
  return (
    <div className="App">
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
      <div className="outlet">
        <Heading/>
        <IndexChart/>
        <PortfolioShow/>
      </div>
    </div>
  )
}
