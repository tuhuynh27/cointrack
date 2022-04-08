import styles from './IndexTable.module.scss'

import { Link } from 'react-router-dom'

import useCoinData from 'hooks/useCoinData'
import { indexCoins } from './data'
import PriceTable from 'components/price-table/PriceTable'
import LoadingFullPage from 'components/loading-full-page/LoadingFullPage'

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
    name: 'Track',
    render: (coin) => (
      <Link to={`/portfolio/${coin.code}`}><button>Track</button></Link>
    ),
  }
]

function IndexTable({ showMarketStatus }) {
  const { state: data, isLoaded } = useCoinData(indexCoins)

  if (!isLoaded) {
    return <LoadingFullPage />
  }

  return (
    <div className={styles.indexChart}>
      <PriceTable tableOptions={{ displayIndex: true, showMarketStatus }} columnData={columnData} data={data}/>
    </div>
  )
}

export default IndexTable
