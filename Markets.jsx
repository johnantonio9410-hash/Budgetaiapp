import { INSTRUMENTS } from '../data/constants.js'

export default function Markets({ activeMode, startBal, setStartBal }) {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontSize: '9px', color: '#3A4A60', letterSpacing: '2px' }}>
          APPROVED INSTRUMENTS — NO PDT RESTRICTIONS
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[50, 100, 250, 500].map(v => (
            <button key={v} onClick={() => setStartBal(v)} style={{
              padding: '5px 12px',
              background: startBal === v ? activeMode.color : '#0A0E18',
              color: startBal === v ? '#000' : '#3A4A60',
              border: `1px solid ${startBal === v ? activeMode.color : '#1C2535'}`,
              borderRadius: '3px', cursor: 'pointer',
              fontSize: '10px', fontWeight: '700', fontFamily: "'Courier New', monospace",
            }}>${v}</button>
          ))}
        </div>
      </div>

      {INSTRUMENTS.map((inst, i) => (
        <div key={i} style={{
          background: '#07090F',
          border: inst.min <= startBal ? `1px solid ${activeMode.color}30` : '1px solid #131C2C',
          borderRadius: '6px', padding: '18px 20px',
          opacity: inst.min <= startBal ? 1 : 0.55,
          transition: 'all 0.2s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: inst.min <= startBal ? '#FFF' : '#3A4A60' }}>{inst.name}</span>
                <span style={{
                  fontSize: '8px',
                  background: inst.min <= startBal ? activeMode.color + '20' : '#131C2C',
                  color: inst.min <= startBal ? activeMode.color : '#3A4A60',
                  border: `1px solid ${inst.min <= startBal ? activeMode.color + '40' : '#1C2535'}`,
                  padding: '2px 8px', borderRadius: '3px', letterSpacing: '1px',
                }}>{inst.tag}</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[['MIN CAPITAL', `$${inst.min}`], ['LEVERAGE', inst.leverage], ['PDT RULE', inst.pdt ? 'YES' : 'NONE'], ['SPREADS', inst.spread.toUpperCase()]].map(([l, v]) => (
                  <div key={l}>
                    <span style={{ fontSize: '8px', color: '#3A4A60' }}>{l} </span>
                    <span style={{ fontSize: '10px', color: v === 'NONE' ? '#00FF88' : '#8A9BB5', fontWeight: '700' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              padding: '8px 16px',
              background: inst.min <= startBal ? '#00FF8810' : '#FF2D5510',
              border: `1px solid ${inst.min <= startBal ? '#00FF8830' : '#FF2D5530'}`,
              borderRadius: '4px', fontSize: '10px', fontWeight: '700',
              color: inst.min <= startBal ? '#00FF88' : '#FF2D55',
            }}>
              {inst.min <= startBal ? '✓ ELIGIBLE' : `NEED +$${inst.min - startBal}`}
            </div>
          </div>
        </div>
      ))}

      {/* Recommended stack */}
      <div style={{
        background: 'linear-gradient(135deg, #0A1A08 0%, #07090F 100%)',
        border: '1px solid #00FF8820', borderRadius: '6px', padding: '18px 20px',
      }}>
        <div style={{ fontSize: '9px', color: '#00FF88', letterSpacing: '3px', marginBottom: '10px' }}>⭐ RECOMMENDED STACK FOR ${startBal}</div>
        <div style={{ fontSize: '12px', color: '#8A9BB5', lineHeight: '1.9' }}>
          <span style={{ color: '#FFF', fontWeight: '700' }}>Platform: </span>Tradovate or NinjaTrader (Micro Futures, ~$50/mo)<br />
          <span style={{ color: '#FFF', fontWeight: '700' }}>Instrument: </span>MES (Micro E-mini S&P 500) — $5/point, ~$40 margin/contract<br />
          <span style={{ color: '#FFF', fontWeight: '700' }}>Why: </span>No PDT rule. Trades 23 hrs/day. Commission ~$0.09/contract. True leverage without margin account.<br />
          <span style={{ color: '#FFF', fontWeight: '700' }}>Automation: </span>Connect TradeInc EA via NinjaTrader strategy or Tradovate API<br />
          <span style={{ color: activeMode.color, fontWeight: '900' }}>
            At {activeMode.daily}%/day on MES with ${startBal} → ${project(daysTo(1000)).toFixed(0)} in ~{daysTo(1000)} trading days
          </span>
        </div>
      </div>

      {/* PDT Bypass */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00 0%, #0D0A00 100%)',
        border: '1px solid #FF6B3530', borderRadius: '8px', padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '24px' }}>🔑</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#FF8C42', marginBottom: '8px' }}>
              PDT BYPASS STRATEGY — UNDER $25K ACCOUNTS
            </div>
            <div style={{ fontSize: '12px', color: '#8A9BB5', lineHeight: '1.9' }}>
              <span style={{ color: '#FFB800' }}>① Cash Account </span>— Settles T+1. Trade daily, wait for funds to settle. Webull &amp; Robinhood allow this.<br />
              <span style={{ color: '#FFB800' }}>② Offshore Broker </span>— TradeZero, CMEG — no PDT rule. Higher fees, unlimited day trades.<br />
              <span style={{ color: '#FFB800' }}>③ Forex/Crypto </span>— No PDT rule at all. 24/7 markets. Bot runs around the clock.<br />
              <span style={{ color: '#00FF88', fontWeight: '900' }}>④ Best: Micro Futures </span>— MES/MNQ. No PDT. Low margin. Perfect for TradeInc EA automation.
            </div>
          </div>
        </div>
      </div>

      {/* Prop firm path */}
      <div style={{ background: '#07090F', border: `1px solid ${activeMode.color}20`, borderRadius: '6px', padding: '20px' }}>
        <div style={{ fontSize: '9px', color: activeMode.color, letterSpacing: '2px', marginBottom: '14px' }}>🚀 THE PROP FIRM ACCELERATOR — SKIP THE SLOW GRIND</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { firm: 'FTMO',       capital: '$10K–$200K', fee: '$155–$1,080', split: '80–90%', color: '#FFD700' },
            { firm: 'TopstepX',   capital: '$50K–$150K', fee: '$49–$149/mo', split: '90%',    color: '#FF6B35' },
            { firm: 'The5%ers',   capital: '$6K–$100K',  fee: '$39–$269',    split: '50–100%', color: '#4A9EFF' },
            { firm: 'Apex Trader', capital: '$25K–$300K', fee: '$17–$137/mo', split: '90%',   color: '#FF2D55' },
          ].map(p => (
            <div key={p.firm} style={{
              flex: '1', minWidth: '150px',
              background: '#0A0E18', border: `1px solid ${p.color}25`,
              borderRadius: '6px', padding: '14px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '900', color: p.color, marginBottom: '8px' }}>{p.firm}</div>
              {[['CAPITAL', p.capital], ['EVAL FEE', p.fee], ['PROFIT SPLIT', p.split]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: '5px' }}>
                  <span style={{ fontSize: '8px', color: '#3A4A60' }}>{l}: </span>
                  <span style={{ fontSize: '10px', color: '#C8D4E8', fontWeight: '700' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '14px', fontSize: '11px', color: '#6B7A99', lineHeight: '1.7' }}>
          Strategy: Grow your $100 to ~$500–$1,000 using TradeInc EA. Use profits to pay the eval fee.
          Pass the challenge with the same bot settings. Now you're trading{' '}
          <span style={{ color: activeMode.color, fontWeight: '700' }}>$50K–$200K of their capital</span> and keeping 80–90% of profits.
          This is how small accounts scale fast.
        </div>
      </div>
    </div>
  )
}
