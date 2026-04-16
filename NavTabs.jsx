const TABS = [
  { id: 'dashboard', label: 'DASHBOARD' },
  { id: 'growth',    label: 'GROWTH CHART' },
  { id: 'signals',   label: 'SIGNAL ENGINE' },
  { id: 'markets',   label: 'MARKETS' },
]

export default function NavTabs({ tab, setTab, activeMode, botRunning }) {
  return (
    <div style={{
      background: '#07090F',
      borderBottom: '1px solid #131C2C',
      padding: '0 28px',
      display: 'flex', gap: 0, alignItems: 'stretch',
    }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          padding: '12px 20px',
          background: 'transparent', border: 'none',
          borderBottom: `2px solid ${tab === t.id ? activeMode.color : 'transparent'}`,
          color: tab === t.id ? activeMode.color : '#3A4A60',
          cursor: 'pointer', fontSize: '10px', fontWeight: '700', letterSpacing: '2px',
          fontFamily: "'Courier New', monospace", transition: 'all 0.15s',
        }}>{t.label}</button>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 4px' }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: botRunning ? '#00FF88' : '#FF2D55',
          boxShadow: botRunning ? '0 0 10px #00FF88' : '0 0 10px #FF2D55',
          animation: botRunning ? 'blink 1s infinite' : 'none',
        }} />
        <span style={{ fontSize: '9px', color: botRunning ? '#00FF88' : '#FF2D55', letterSpacing: '2px', fontFamily: "'Courier New', monospace" }}>
          {botRunning ? 'LIVE' : 'IDLE'}
        </span>
      </div>
    </div>
  )
}
