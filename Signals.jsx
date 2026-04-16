import { SIGNALS, ENTRY_STEPS } from '../data/constants.js'

export default function Signals({ activeMode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{
        background: `${activeMode.color}08`,
        border: `1px solid ${activeMode.color}30`,
        borderRadius: '6px', padding: '16px 20px',
      }}>
        <div style={{ fontSize: '9px', color: activeMode.color, letterSpacing: '3px', marginBottom: '6px' }}>TRADE INC SIGNAL SCORING</div>
        <div style={{ fontSize: '12px', color: '#8A9BB5', lineHeight: '1.7' }}>
          Each signal casts a weighted vote. A trade only fires when composite score ≥{' '}
          <strong style={{ color: activeMode.color }}>{activeMode.threshold} / 100</strong>.{' '}
          {activeMode.id === 'rampage' && 'RAMPAGE mode lowers threshold to 65 for higher frequency.'}
          {activeMode.id === 'sniper'  && 'SNIPER mode raises threshold to 85 — only elite setups qualify.'}
          {activeMode.id === 'assault' && 'ASSAULT mode standard 75 threshold — balanced aggression.'}
        </div>
      </div>

      {/* Signal cards */}
      {SIGNALS.map((s, i) => (
        <div key={i} style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>{s.name}</div>
            <div style={{
              background: activeMode.color + '20', border: `1px solid ${activeMode.color}50`,
              color: activeMode.color, padding: '3px 12px', borderRadius: '3px',
              fontSize: '11px', fontWeight: '900',
            }}>WEIGHT: {s.weight}%</div>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7A99', lineHeight: '1.7', marginBottom: '12px' }}>{s.desc}</div>
          <div style={{ height: '4px', background: '#131C2C', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              width: `${s.weight * 3.3}%`, height: '100%',
              background: `linear-gradient(90deg, ${activeMode.color}, ${activeMode.color}80)`,
              borderRadius: '2px', boxShadow: `0 0 8px ${activeMode.color}60`,
            }} />
          </div>
        </div>
      ))}

      {/* Score simulator */}
      <div style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '14px' }}>COMPOSITE SCORE EXAMPLES</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'ALL 4 SIGNALS', score: 100, verdict: 'FIRE', vcolor: '#00FF88' },
            { label: '3 OF 4 SIGNALS', score: 75,  verdict: activeMode.threshold <= 75 ? 'FIRE' : 'SKIP', vcolor: activeMode.threshold <= 75 ? '#00FF88' : '#FF2D55' },
            { label: '2 OF 4 SIGNALS', score: 55,  verdict: 'SKIP', vcolor: '#FF2D55' },
            { label: 'VOLUME ONLY',    score: 25,  verdict: 'SKIP', vcolor: '#FF2D55' },
          ].map((ex, i) => (
            <div key={i} style={{
              flex: '1', minWidth: '140px',
              background: '#0A0E18', border: `1px solid ${ex.vcolor}25`,
              borderRadius: '6px', padding: '14px',
            }}>
              <div style={{ fontSize: '9px', color: '#3A4A60', marginBottom: '6px' }}>{ex.label}</div>
              <div style={{ fontSize: '26px', fontWeight: '900', color: ex.vcolor, marginBottom: '4px' }}>{ex.score}</div>
              <div style={{
                display: 'inline-block', padding: '2px 10px',
                background: ex.vcolor + '20', border: `1px solid ${ex.vcolor}40`,
                color: ex.vcolor, borderRadius: '3px', fontSize: '10px', fontWeight: '900',
              }}>{ex.verdict}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry flow */}
      <div style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '14px' }}>ENTRY EXECUTION FLOW</div>
        <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
          {ENTRY_STEPS.map((s, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: '1', minWidth: '120px' }}>
              <div style={{
                background: '#0A0E18', border: `1px solid ${activeMode.color}40`,
                borderRadius: '6px', padding: '12px', flex: 1,
              }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: activeMode.color + '60', marginBottom: '4px' }}>{s.step}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: activeMode.color, marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '9px', color: '#4A5A70', lineHeight: '1.5' }}>{s.desc}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ color: activeMode.color + '60', fontSize: '16px', padding: '0 4px', flexShrink: 0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk rules */}
      <div style={{ background: '#07090F', border: '1px solid #131C2C', borderRadius: '6px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px', marginBottom: '14px' }}>HARDCODED RISK RULES — CANNOT BE OVERRIDDEN</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { rule: `Max ${activeMode.risk}% risk per trade`, detail: `$${(100 * activeMode.risk / 100).toFixed(2)} on a $100 account. Position sized via ATR.`, color: '#FF6B35' },
            { rule: 'Daily loss limit: 2× risk%',              detail: `Bot shuts off at -${activeMode.risk * 2}% daily. No manual override. Protects against revenge loops.`, color: '#FF2D55' },
            { rule: `Min R:R ${activeMode.rr} required`,       detail: 'Trade is rejected pre-entry if calculated R:R falls below minimum. No exceptions.', color: '#FFD700' },
            { rule: 'Trailing stop after 1R',                  detail: 'Stop moves to breakeven once trade is up 1× initial risk. Capital is always protected.', color: '#4A9EFF' },
            { rule: `Max ${activeMode.trades} trades/day`,     detail: 'Quality over quantity. Bot locks out after daily trade limit. Prevents overtrading.', color: '#00FF88' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              padding: '12px 14px', background: '#0A0E18',
              border: `1px solid ${r.color}20`, borderRadius: '4px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: r.color, boxShadow: `0 0 6px ${r.color}`,
                marginTop: '4px', flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: r.color, marginBottom: '3px' }}>{r.rule}</div>
                <div style={{ fontSize: '11px', color: '#6B7A99' }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
