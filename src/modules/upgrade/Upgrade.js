import styles from './Upgrade.module.scss'
import { toast } from 'utils/toast'

function Upgrade() {
  return (
    <div className={styles.upgradePage}>
      <div className={styles.leftSide}>
        <h1>Cointrack+</h1>
        <h2>Better way to keep track of your cryptos</h2>
        <ul>
          <li>Sync all of your crypto in one place</li>
          <li>Support for thousands of coins</li>
          <li>Daily portfolio revenue report & market news</li>
          <li>Create & watch virtual trading bots</li>
        </ul>
        <button onClick={() => {
          toast('Please contact plus@cointrack.me', { ms: 3000 })
        }}>Upgrade to Cointrack+</button>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.wrapper}/>
        <img src="https://images.ctfassets.net/c5bd0wqjc7v0/6gBdGa7JcX7zJRTZ76HMU6/caffdb636055c1bc587daa655e1fa694/wallet_hero_5.png?fm=webp&q=70" alt="Test"/>
      </div>
    </div>
  )
}

export default Upgrade
