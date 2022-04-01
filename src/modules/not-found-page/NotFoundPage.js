import styles from './NotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.notfoundPage}>
      <img src="https://www.coinbase.com/img/connection-trouble-404.svg" alt="404" />
      <div className={styles.headLine}>Coming soon!</div>
      <div className={styles.description}>I'm working hard to bring this feature on as soon as possible, stay tuned.</div>
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)}>Back to previous page</button>
      </div>
    </div>
  )
}

export default NotFoundPage
