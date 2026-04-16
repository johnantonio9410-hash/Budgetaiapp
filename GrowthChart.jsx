import GrowthCanvas from '../components/GrowthCanvas.jsx'

export default function GrowthChart({ activeMode, startBal, setStartBal }) {
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

  const milestones = [
    { t: 500,   label: '$500',  color: '#4A9EFF' },
    { t: 1000,  label: '$1K',   color: '#FFD700' },
    { t: 5000,  label: '$5K',   color: '#FF6B35' },
    { t: 10000, label: '$10K',  color: '#FF2D55' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '6px' }}>STARTING CAPITAL</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[50, 100, 250, 500].map(v => (
              <button key={v} onClick={() => setStartBal(v)} style={{
                padding: '7px 14px',
                background: startBal === v ? activeMode.color : '#0A0E18',
                color: startBal === v ? '#000' : '#3A4A60',
                border: `1px solid ${startBal === v ? activeMode.color : '#1C2535'}`,
                borderRadius: '3px', cursor: 'pointer',
                fontSize: '11px', fontWeight: '700', fontFamily: "'Courier New', monospace",
                transition: 'all 0.15s',
              }}>${v}</button>
            ))}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px' }}>MODE: {activeMode.label} @ {activeMode.daily}%/DAY</div>
          <div style={{ fontSize: '11px', color: activeMode.color }}>200-day compound projection</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: '#07090F', border: `1px solid ${activeMode.color}20`, borderRadius: '8px', padding: '20px' }}>
        <GrowthCanvas balance={startBal} dailyPct={activeMode.daily} modeId={activeMode.id} color={activeMode.color} />
      </div>

      {/* Milestones */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {milestones.map(m => {
          const d = daysTo(m.t)
          const wks = Math.ceil(d / 5 * 7 / 7)
          return (
            <div key={m.t} style={{
              flex: '1', minWidth: '150px',
              background: '#07090F', border: `1px solid ${m.color}30`,
              borderRadius: '6px', padding: '16px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${m.color}, ${m.color}40)` }} />
              <div style={{ fontSize: '22px', fontWeight: '900', color: m.color, marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontSize: '11px', color: '#8A9BB5' }}>{d} trading days</div>
              <div style={{ fontSize: '13px', color: '#C8D4E8', fontWeight: '700', marginTop: '2px' }}>≈ {wks} weeks</div>
              <div style={{ fontSize: '9px', color: '#3A4A60', marginTop: '6px' }}>{((m.t / startBal - 1) * 100).toFixed(0)}% total return</div>
            </div>
          )
        })}
      </div>

      {/* Reality Check */}
      <div style={{
        background: '#0A0A08', border: '1px solid #FF6B3530',
        borderRadius: '6px', padding: '16px 20px',
        fontSize: '11px', color: '#8A7060', lineHeight: '1.8',
      }}>
        ⚠ <strong style={{ color: '#FF6B35' }}>Reality Check:</strong> These projections assume every trading day hits target.
        Real performance includes losing days, slippage, and drawdowns.
        Expect 30–40% of days to be red. The compounding works IF AND ONLY IF the daily loss limit is respected and the bot shuts down on bad days.
        A well-tuned EA achieves target rate 3 out of 5 trading days — still enough to compound aggressively.
      </div>

      {/* Compound comparison */}
      <div style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '14px' }}>MODE COMPARISON — FROM ${startBal}</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'SNIPER 3%',  daily: 3, color: '#FFD700' },
            { label: 'ASSAULT 5%', daily: 5, color: '#FF6B35' },
            { label: 'RAMPAGE 8%', daily: 8, color: '#FF2D55' },
          ].map(m => {
            const calc = (d) => { let v = startBal; for (let i=0;i<d;i++) v*=(1+m.daily/100); return v }
            return (
              <div key={m.label} style={{
                flex: '1', minWidth: '160px',
                background: m.label.includes(activeMode.label.split(' ')[0]) ? `${m.color}10` : '#0A0E18',
                border: `1px solid ${m.color}30`, borderRadius: '6px', padding: '14px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: '900', color: m.color, marginBottom: '10px' }}>{m.label}</div>
                {[[30, '30 days'], [90, '90 days'], [180, '6 months']].map(([d, label]) => (
                  <div key={d} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: '#3A4A60' }}>{label}</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#C8D4E8' }}>${calc(d * 0.7).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
