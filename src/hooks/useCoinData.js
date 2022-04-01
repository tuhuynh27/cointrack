import { useCallback, useEffect, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'updatePrices':
      const pricesObj = action.data
      return state.map(e => {
        if (pricesObj[e.code]) {
          return {
            ...e,
            price: pricesObj[e.code],
          }
        }
        return e
      })
    case 'updateChanges':
      const changesObj = action.data
      return state.map(e => {
        if (changesObj[e.code]) {
          return {
            ...e,
            change: changesObj[e.code].change,
            volume: changesObj[e.code].volume,
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
      const obj = Object.create(null)
      for (const e of coins) {
        const resp = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${e.code}USDT`)
        const data = await resp.json()
        const change = parseFloat(data.priceChangePercent)
        const avg = (parseFloat(data.highPrice) + parseFloat(data.lowPrice)) / 2
        const val = (parseFloat(data.volume) * avg).toFixed(0)
        const volume = (val / 1000000).toFixed(2)
        const volumeStr = volume > 1000 ? `${(volume / 1000).toFixed(2)}B` : `${volume}M`
        obj[e.code] = {
          change: change.toFixed(2),
          volume: volumeStr,
        }
      }
      dispatch({ type: 'updateChanges', data: obj })
    }, [coins]
  )

  useEffect(() => {
    const timeout = setTimeout(() => void loadMeta(), 1000)
    const interval = setInterval(() => {
      void loadMeta()
    }, 5000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [loadMeta])

  useEffect(() => {
    // Batch update prices
    let obj = Object.create(null)
    const interval = setInterval(() => {
      dispatch({
        type: 'updatePrices',
        data: obj,
      })
      obj = Object.create(null)
    }, 500)

    function updateRealtime(e) {
      const payload = JSON.parse(e.data)
      const { stream, data } = payload
      const priceFloat = parseFloat(data.p)
      const price = priceFloat.toFixed(2)
      const code = stream.substring(0, 3).toUpperCase()
      obj[code] = price
    }

    const listWatchStream = coins.map(e =>`${e.code.toLowerCase()}usdt@aggTrade`)
    const connectStr = listWatchStream.join('/')
    let socket = null
    let timeout = null

    function connect() {
      socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=' + connectStr)
      socket.addEventListener('message', updateRealtime)
      socket.addEventListener('error', () => {
        socket.close()
        socket = null
        timeout = setTimeout(() => connect(), 1000)
      })
    }

    connect()

    return () => {
      clearInterval(interval)
      socket.removeEventListener('message', updateRealtime)
      socket.close()
      clearTimeout(timeout)
    }
  }, [coins])

  return state
}
