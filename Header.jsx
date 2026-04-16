import { AGGRESSIVE_MODES } from '../data/constants.js'
import AnimatedNumber from './AnimatedNumber.jsx'

export default function Header({ activeMode, mode, onModeChange, equity, startBal, botRunning, setBotRunning }) {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0A0E18 0%, #0D1220 50%, #0A0E18 100%)',
      borderBottom: `2px solid ${activeMode.color}40`,
      padding: '0 28px',
      display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '12px',
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '42px', height: '42px',
          background: `linear-gradient(135deg, ${activeMode.color} 0%, ${activeMode.color}80 100%)`,
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: '900', color: '#000',
          boxShadow: `0 0 20px ${activeMode.color}60`,
          letterSpacing: '-1px', fontFamily: "'Courier New', monospace",
          transition: 'all 0.3s',
        }}>T↑</div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFF', letterSpacing: '2px', fontFamily: "'Courier New', monospace" }}>
            TRADE<span style={{ color: activeMode.color }}>INC</span>
          </div>
          <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '3px', fontFamily: "'Courier New', monospace" }}>BUDGET EA v3.0 — AGGRESSIVE MODE</div>
        </div>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 0', flexWrap: 'wrap' }}>
        {AGGRESSIVE_MODES.map(m => (
          <button key={m.id} onClick={() => onModeChange(m.id)} style={{
            padding: '8px 16px',
            background: mode === m.id ? m.color : 'transparent',
            color: mode === m.id ? '#000' : m.color,
            border: `1px solid ${m.color}60`,
            borderRadius: '4px', cursor: 'pointer',
            fontSize: '10px', fontWeight: '900', letterSpacing: '2px',
            fontFamily: "'Courier New', monospace",
            transition: 'all 0.15s',
            boxShadow: mode === m.id ? `0 0 16px ${m.color}60` : 'none',
          }}>{m.label} {m.daily}%</button>
        ))}
      </div>

      {/* Equity + Start/Stop */}
      <div style={{ padding: '18px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', fontFamily: "'Courier New', monospace" }}>EQUITY</div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: botRunning ? activeMode.color : '#FFF', fontFamily: "'Courier New', monospace" }}>
            <AnimatedNumber value={equity} decimals={2} />
          </div>
        </div>
        <button onClick={() => setBotRunning(r => !r)} style={{
          padding: '10px 20px',
          background: botRunning
            ? 'linear-gradient(135deg, #FF2D5520, #FF2D5510)'
            : `linear-gradient(135deg, ${activeMode.color}30, ${activeMode.color}10)`,
          border: `1px solid ${botRunning ? '#FF2D55' : activeMode.color}`,
          color: botRunning ? '#FF2D55' : activeMode.color,
          borderRadius: '4px', cursor: 'pointer',
          fontSize: '10px', fontWeight: '900', letterSpacing: '2px',
          fontFamily: "'Courier New', monospace",
          boxShadow: botRunning ? '0 0 20px #FF2D5540' : `0 0 20px ${activeMode.color}40`,
          transition: 'all 0.2s',
        }}>
          {botRunning ? '⬛ STOP EA' : '▶ START EA'}
        </button>
      </div>
    </div>
  )
}
