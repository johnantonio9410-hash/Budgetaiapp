import { useEffect } from 'react'
import { TRADE_PAIRS } from '../data/constants.js'

export default function useBot({ botRunning, activeMode, equity, setEquity, setTrades, setPnlHistory }) {
  useEffect(() => {
    if (!botRunning) return

    const interval = setInterval(() => {
      const win = Math.random() > 0.42
      const pct = win
        ? activeMode.daily * 0.3 + Math.random() * activeMode.daily * 0.4
        : -(activeMode.risk * 0.4 + Math.random() * activeMode.risk * 0.3)

      setEquity(prev => {
        const pnl = prev * (pct / 100)
        const newEq = Math.max(prev + pnl, prev * 0.85)

        const newTrade = {
          id: Date.now(),
          symbol: TRADE_PAIRS[Math.floor(Math.random() * TRADE_PAIRS.length)],
          side: Math.random() > 0.5 ? 'LONG' : 'SHORT',
          pnl: pnl.toFixed(2),
          pct: pct.toFixed(2),
          win,
          time: new Date().toLocaleTimeString(),
        }

        setTrades(t => [newTrade, ...t.slice(0, 8)])
        setPnlHistory(h => [...h.slice(-29), newEq])
        return newEq
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [botRunning, activeMode])
}
