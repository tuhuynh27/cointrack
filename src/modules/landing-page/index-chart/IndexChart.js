import { useReducer, useEffect, useCallback } from 'react'
import styles from './IndexChart.module.scss'

import { Link } from 'react-router-dom'

import { indexData } from './data'

const initialState = indexData

function reducer(state, action) {
  switch (action.type) {
    case 'updatePrice':
      return state.map(e => {
        if (e.code === action.code.toUpperCase()) {
          return {
            ...e,
            price: action.price,
          }
        }
        return e
      })
    case 'updateChange':
      return state.map(e => {
        if (e.code === action.code.toUpperCase()) {
          return {
            ...e,
            change: action.change,
            volume: action.volume,
          }
        }
        return e
      })
    default:
      throw new Error()
  }
}

function IndexChart() {
  const [state, dispatch] = useReducer(reducer, initialState, undefined)

  const loadMeta = useCallback(
    async () => {
      for (const e of initialState) {
        const resp = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${e.code}USDT`)
        const data = await resp.json()
        const change = parseFloat(data.priceChangePercent)
        const avg = (parseFloat(data.highPrice) + parseFloat(data.lowPrice)) / 2
        const val = (parseFloat(data.volume) * avg).toFixed(0)
        const volume = (val / 1000000).toFixed(2)
        const volumeStr = volume > 1000 ? `${(volume / 1000).toFixed(2)}B` : `${volume}M`
        dispatch({ type: 'updateChange', code: e.code,
          change: change.toFixed(2), volume: volumeStr })
      }
    }, [dispatch]
  )

  useEffect(() => {
    setTimeout(() => void loadMeta(), 1000)
    const interval = setInterval(() => {
      void loadMeta()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [loadMeta])

  useEffect(() => {
    const listWatchStream = initialState.map(e =>`${e.code.toLowerCase()}usdt@aggTrade`)
    const connectStr = listWatchStream.join('/')
    const socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=' + connectStr)
    function updateRealtime(e) {
      const payload = JSON.parse(e.data)
      const { stream, data } = payload
      const priceFloat = parseFloat(data.p)
      const price = priceFloat.toFixed(2)
      const code = stream.substring(0, 3)
      dispatch({ type: 'updatePrice', code, price })
    }
    socket.addEventListener('message', updateRealtime)
    return () => {
      socket.removeEventListener('message', updateRealtime)
      socket.close()
    }
  }, [dispatch])

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
          {state.map((coin, index) => <tr key={coin.name}>
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
