import { useReducer, useEffect, useCallback } from 'react'
import './IndexChart.scss'

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
        dispatch({ type: 'updateChange', code: e.code, change: change.toFixed(2) })
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
    <div className="index-chart">
      <table>
        <thead>
          <tr>
            <th className="index" style={{ width: '5%' }}>#</th>
            <th>Name</th>
            <th className="price" style={{ width: '20%' }}>Price</th>
            <th className="change" style={{ width: '10%' }}>Change</th>
            <th className="trade" style={{ width: '10%' }}>Track</th>
          </tr>
        </thead>
        <tbody>
          {state.map((coin, index) => <tr key={coin.name}>
            <td className="index">{index + 1}</td>
            <td>
              <div className="coin-name">
                <img className="logo" alt="Coin Logo" src={coin.logo}/>
                <div className="title">
                  <div>{coin.name}</div>
                  <div className="coin-code">{coin.code}</div>
                </div>
              </div>
            </td>
            <td className="price" >
              <div className="desktop">
                USD {coin.price}
              </div>
              <div className="mobile">
                <div>USD {coin.price}</div>
                <div style={{ color: coin.change > 0 ? 'green' : 'red' }}>
                  {coin.change > 0 ? '+' : ''}{coin.change}%
                </div>
              </div>
            </td>
            <td className="change">
              <div style={{ color: coin.change > 0 ? 'green' : 'red' }}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
              </div>
            </td>
            <td className="trade">
              <button>Track</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default IndexChart