import React from 'react'
import styles from './IndexTable.module.scss'

import { Link } from 'react-router-dom'

import useCoinData from 'hooks/useCoinData'
import { indexCoins } from './data'
import PriceTable from 'components/price-table/PriceTable'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../profile/profileSlice'

const tableOptions = {
  displayIndex: true,
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
    name: 'Track',
    render: (coin) => (
      <Link to={`/portfolio/${coin.code}`}><button>Track</button></Link>
    ),
  }
]

function IndexTable() {
  const profile = useSelector(selectProfile)
  const { state: data } = useCoinData(indexCoins, profile.isLoggedIn ? 0 : 4)

  const marketStatus = (data.reduce((sum, coin) => sum + parseFloat(coin.change), 0) / data.length)

  return (
    <div className={styles.indexChart}>
      <div className={styles.marketInfo}>
        <p>In the past 24 hours</p>
        <h2>Market is&nbsp;
          {marketStatus >= 0 ? 'up' : 'down'} <span style={{ color: marketStatus >= 0 ? 'green' : 'red' }}>
            {Math.abs(marketStatus).toFixed(2)}%</span>
        </h2>
      </div>
      <PriceTable tableOptions={tableOptions} columnData={columnData} data={data}/>
    </div>
  )
}

export default IndexTable
