import styles from './Portfolio.module.scss'
import PriceTable from 'components/price-table/PriceTable'
import useCoinData from 'hooks/useCoinData'
import { Link } from 'react-router-dom'

import { portfolioCoins } from './data'

const tableOptions = {
  displayIndex: true,
  showMarketStatus: true,
}

const columnData = [
  {
    name: 'Price',
    render: (coin) => `USD ${coin.price}`,
    isPrimary: true,
  },
  {
    name: 'Change',
    render: (coin) => (
      <div style={{ color: coin.change > 0 ? 'green' : 'red' }}>
        {coin.change > 0 ? '+' : ''}{coin.change}%
      </div>
    ),
    isSecondary: true,
  },
  {
    name: 'Volume',
    selector: 'volume',
  },
  {
    name: '',
    render: (coin) => (
      <Link to={`/portfolio/${coin.code}`}>
        <button style={{ backgroundColor: 'var(--primary-color)' }}>Track</button>
      </Link>
    ),
  }
]

function Portfolio() {
  const { state: data } = useCoinData(portfolioCoins)

  return (
    <div className={styles.portfolioPage}>
      <PriceTable tableOptions={tableOptions} columnData={columnData} data={data}/>
    </div>
  )
}

export default Portfolio
