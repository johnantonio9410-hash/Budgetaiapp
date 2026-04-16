import SparkChart from '../components/SparkChart.jsx'
import useBot from '../hooks/useBot.js'

export default function Dashboard({ activeMode, startBal, botRunning, setBotRunning, equity, setEquity, trades, setTrades, pnlHistory, setPnlHistory }) {
  useBot({ botRunning, activeMode, equity, setEquity, setTrades, setPnlHistory })

  const project = (days) => {
    let v = startBal
    for (let i = 0; i < days; i++) v *= (1 + activeMode.daily / 100)
    return v
  }

  const daysTo = (target) => {
    let d = 0, v = startBal
    while (v < target && d < 2000) { v *= (1 + activeMode.daily / 100); d++ }
    return d
  }

  const totalPnl = equity - startBal
  const totalPct = ((equity - startBal) / startBal * 100)

  const kpis = [
    { label: 'TARGET DAILY',  val: `+${activeMode.daily}%`,           color: activeMode.color, sub: `${activeMode.trades} trades max` },
    { label: 'RISK/TRADE',    val: `${activeMode.risk}%`,             color: '#FF6B35',        sub: `$${(startBal * activeMode.risk / 100).toFixed(2)} on $${startBal}` },
    { label: 'MIN R:R',       val: activeMode.rr,                     color: '#4A9EFF',        sub: 'Per signal threshold' },
    { label: '30-DAY TARGET', val: `$${project(22).toFixed(0)}`,      color: '#FFD700',        sub: `from $${startBal}` },
    { label: '90-DAY TARGET', val: `$${project(65).toFixed(0)}`,      color: '#FF6B35',        sub: 'compounded daily' },
    { label: 'DAYS TO $1K',   val: `${daysTo(1000)}d`,                color: '#FF2D55',        sub: `≈ ${Math.ceil(daysTo(1000) / 5)} weeks` },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {kpis.map((k, i) => (
          <div key={i} style={{
            flex: '1', minWidth: '130px',
            background: 'linear-gradient(135deg, #0A0E18 0%, #07090F 100%)',
            border: `1px solid ${k.color}25`, borderRadius: '6px',
            padding: '14px 16px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: k.color, boxShadow: `0 0 8px ${k.color}` }} />
            <div style={{ fontSize: '8px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '6px' }}>{k.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: k.color }}>{k.val}</div>
            <div style={{ fontSize: '9px', color: '#3A4A60', marginTop: '4px' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Mode + Equity Spark */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{
          flex: '2', minWidth: '280px',
          background: `linear-gradient(135deg, ${activeMode.color}08 0%, #07090F 100%)`,
          border: `1px solid ${activeMode.color}30`, borderRadius: '6px', padding: '18px 20px',
        }}>
          <div style={{ fontSize: '9px', color: activeMode.color, letterSpacing: '3px', marginBottom: '8px' }}>◆ ACTIVE MODE: {activeMode.label}</div>
          <div style={{ fontSize: '13px', color: '#C8D4E8', lineHeight: '1.7', marginBottom: '14px' }}>{activeMode.desc}</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[['STRATEGY', activeMode.strategy], ['SESSIONS', activeMode.sessions], ['INSTRUMENTS', activeMode.instruments]].map(([l, v]) => (
              <div key={l}>
                <span style={{ fontSize: '9px', color: '#3A4A60' }}>{l} </span>
                <span style={{ fontSize: '10px', color: l === 'INSTRUMENTS' ? activeMode.color : '#C8D4E8' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '200px', background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '18px 20px' }}>
          <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '10px' }}>EQUITY CURVE</div>
          <SparkChart data={pnlHistory} color={activeMode.color} height={60} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div>
              <div style={{ fontSize: '9px', color: '#3A4A60' }}>TOTAL P&L</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: totalPnl >= 0 ? '#00FF88' : '#FF2D55' }}>
                {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', color: '#3A4A60' }}>RETURN</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: totalPct >= 0 ? '#00FF88' : '#FF2D55' }}>
                {totalPct >= 0 ? '+' : ''}{totalPct.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Feed */}
      <div style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{
          padding: '12px 20px', background: '#0A0E18', borderBottom: '1px solid #131C2C',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px' }}>LIVE TRADE FEED</span>
          <span style={{ fontSize: '9px', color: botRunning ? '#00FF88' : '#3A4A60' }}>
            {botRunning ? '● SCANNING MARKETS...' : '○ BOT IDLE — PRESS START'}
          </span>
        </div>
        {trades.length === 0 ? (
          <div style={{ padding: '28px', textAlign: 'center', color: '#2A3545', fontSize: '11px', letterSpacing: '2px' }}>
            START THE EA TO SEE LIVE TRADES
          </div>
        ) : (
          trades.map((t, i) => (
            <div key={t.id} style={{
              padding: '10px 20px', borderBottom: '1px solid #0D1420',
              display: 'flex', alignItems: 'center', gap: '16px',
              background: i === 0 ? (t.win ? '#00FF8806' : '#FF2D5506') : 'transparent',
            }}>
              <span style={{ fontSize: '9px', color: '#3A4A60', minWidth: '70px' }}>{t.time}</span>
              <span style={{
                fontSize: '11px', fontWeight: '700', color: '#FFF',
                background: '#131C2C', padding: '2px 8px', borderRadius: '3px', minWidth: '60px', textAlign: 'center',
              }}>{t.symbol}</span>
              <span style={{ fontSize: '9px', fontWeight: '700', color: t.side === 'LONG' ? '#00FF88' : '#FF6B35', letterSpacing: '1px' }}>{t.side}</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: '13px', fontWeight: '900', color: t.win ? '#00FF88' : '#FF2D55' }}>
                {t.win ? '+' : ''}{t.pnl} ({t.win ? '+' : ''}{t.pct}%)
              </span>
              <span style={{
                fontSize: '9px', color: t.win ? '#00FF88' : '#FF2D55',
                background: t.win ? '#00FF8815' : '#FF2D5515',
                border: `1px solid ${t.win ? '#00FF8840' : '#FF2D5540'}`,
                padding: '2px 8px', borderRadius: '3px',
              }}>{t.win ? 'WIN' : 'LOSS'}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
