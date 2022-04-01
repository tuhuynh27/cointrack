import styles from './IndexChart.module.scss'

import { Link } from 'react-router-dom'

import useCoinData from 'hooks/useCoinData'
import { indexCoins } from './data'

function IndexChart() {
  const data = useCoinData(indexCoins)

  return (
    <div className={styles.indexChart}>
      <table>
        <thead>
          <tr>
            <th className={styles.index} style={{ width: '5%' }}>#</th>
            <th>Name</th>
            <th className={styles.price} style={{ width: '15%' }}>Price</th>
            <th className={styles.change} style={{ width: '10%' }}>Change</th>
            <th className={styles.volume} style={{ width: '10%' }}>Volume</th>
            <th className={styles.trade} style={{ width: '10%' }}>Track</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin, index) => <tr key={coin.name}>
            <td className={styles.index}>{index + 1}</td>
            <td>
              <div className={styles.nameColumn}>
                <img className={styles.logo} alt="Coin Logo" src={coin.logo}/>
                <div className={styles.title}>
                  <div className={styles.coinName}>{coin.name}</div>
                  <div className={styles.coinCode}>{coin.code}</div>
                </div>
              </div>
            </td>
            <td className={styles.price} >
              <div className={styles.desktop}>
                USD {coin.price}
              </div>
              <div className={styles.mobile}>
                <div>USD {coin.price}</div>
                <div style={{ color: coin.change > 0 ? 'green' : 'red' }}>
                  {coin.change > 0 ? '+' : ''}{coin.change}%
                </div>
              </div>
            </td>
            <td className={styles.change}>
              <div style={{ color: coin.change > 0 ? 'green' : 'red' }}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
              </div>
            </td>
            <td className={styles.volume}>
              {coin.volume}
            </td>
            <td className={styles.trade}>
              <Link to="/portfolio"><button>Track</button></Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default IndexChart
