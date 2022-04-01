import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className={styles.notfoundPage}>
      <img src="https://www.coinbase.com/img/connection-trouble-404.svg" alt="404" />
      <div className={styles.headLine}>Coming soon!</div>
      <div className={styles.description}>I'm working hard to bring this feature on as soon as possible, stay tuned.</div>
      <div className={styles.backButton}>
        <Link to="/"><button>Back to Cointrack</button></Link>
      </div>
    </div>
  )
}

export default NotFound
