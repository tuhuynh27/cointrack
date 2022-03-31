import './PortfolioShow.scss'

import PortfolioImg from 'assets/img/portfolio.jpg'

function PortfolioShow() {
  return (
    <div className="portfolio-show">
      <h1>Create your cryptocurrency portfolio today</h1>
      <p>Cointrack has a variety of features that make it the best place to start tracking</p>
      <img src={PortfolioImg} alt="Coinbase" />
    </div>
  )
}

export default PortfolioShow
