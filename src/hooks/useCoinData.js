import { useCallback, useEffect, useReducer } from 'react'

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

function init(coins) {
  return coins.map(e => ({
    ...e,
    price: 0,
    change: 0,
    volume: 0,
  }))
}

export default function useCoinData(coins) {
  const [state, dispatch] = useReducer(reducer, coins, init)

  const loadMeta = useCallback(
    async () => {
      for (const e of coins) {
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
    }, [coins]
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
    const listWatchStream = coins.map(e =>`${e.code.toLowerCase()}usdt@aggTrade`)
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
  }, [coins])

  return state
}
