import './NotFound.scss'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notfound-page">
      <img src="https://www.coinbase.com/img/connection-trouble-404.svg" alt="404" />
      <div className="head-line">Coming soon!</div>
      <div className="second-line">I'm working hard to bring this feature on as soon as possible!</div>
      <div className="back-button">
        <Link to="/"><button>Back to Cointrack</button></Link>
      </div>
    </div>
  )
}

export default NotFound
