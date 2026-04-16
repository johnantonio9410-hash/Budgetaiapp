import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import GrowthChart from './pages/GrowthChart.jsx'
import Signals from './pages/Signals.jsx'
import Markets from './pages/Markets.jsx'
import Header from './components/Header.jsx'
import NavTabs from './components/NavTabs.jsx'
import { AGGRESSIVE_MODES } from './data/constants.js'

export default function App() {
  const [mode, setMode] = useState('assault')
  const [startBal, setStartBal] = useState(100)
  const [tab, setTab] = useState('dashboard')
  const [botRunning, setBotRunning] = useState(false)
  const [equity, setEquity] = useState(100)
  const [trades, setTrades] = useState([])
  const [pnlHistory, setPnlHistory] = useState([100, 100, 100, 100, 100])

  const activeMode = AGGRESSIVE_MODES.find(m => m.id === mode)

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setEquity(startBal)
    setTrades([])
    setPnlHistory([startBal])
  }

  const handleBalanceChange = (val) => {
    setStartBal(val)
    setEquity(val)
  }

  const sharedProps = {
    mode, activeMode, startBal, setStartBal: handleBalanceChange,
    botRunning, setBotRunning,
    equity, setEquity,
    trades, setTrades,
    pnlHistory, setPnlHistory,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050709', fontFamily: "'Courier New', monospace", color: '#C8D4E8' }}>
      {/* Scanlines */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          activeMode={activeMode}
          mode={mode}
          onModeChange={handleModeChange}
          equity={equity}
          startBal={startBal}
          botRunning={botRunning}
          setBotRunning={setBotRunning}
        />
        <NavTabs tab={tab} setTab={setTab} activeMode={activeMode} botRunning={botRunning} />
        <div style={{ padding: '20px 28px' }}>
          {tab === 'dashboard' && <Dashboard {...sharedProps} />}
          {tab === 'growth'    && <GrowthChart {...sharedProps} />}
          {tab === 'signals'   && <Signals {...sharedProps} />}
          {tab === 'markets'   && <Markets {...sharedProps} />}
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}
