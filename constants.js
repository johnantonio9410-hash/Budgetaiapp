export const AGGRESSIVE_MODES = [
  {
    id: 'sniper',
    label: 'SNIPER',
    daily: 3,
    risk: 2,
    rr: '2:1',
    trades: 3,
    color: '#FFD700',
    desc: 'Precise. 3 high-conviction trades per day. Wait for A+ setups only. Signal score ≥ 85 required.',
    strategy: 'First-5m Candle Break + VWAP Confluence',
    sessions: '9:30–11:00 AM EST only',
    instruments: 'MES + SPY Options ITM',
    threshold: 85,
  },
  {
    id: 'assault',
    label: 'ASSAULT',
    daily: 5,
    risk: 3,
    rr: '2.5:1',
    trades: 5,
    color: '#FF6B35',
    desc: 'High-frequency breakouts. News catalysts. 0DTE options. Signal score ≥ 75 required.',
    strategy: 'Momentum Breakout + 0DTE Options',
    sessions: '9:30–11:30 AM + 1:30–3:30 PM EST',
    instruments: 'MES + MNQ + SPY Options',
    threshold: 75,
  },
  {
    id: 'rampage',
    label: 'RAMPAGE',
    daily: 8,
    risk: 5,
    rr: '3:1',
    trades: 6,
    color: '#FF2D55',
    desc: 'Max aggression. Micro futures + options stacking. Lowered threshold 65. Elite operators only.',
    strategy: 'Stacked Momentum + Futures Scalping',
    sessions: 'Full Session + Pre-Market',
    instruments: 'MES + MNQ + BTC + SPY 0DTE',
    threshold: 65,
  },
]

export const INSTRUMENTS = [
  { name: 'MES Micro Futures',  min: 100, leverage: '50:1',   pdt: false, spread: 'tight',  tag: '⭐ BEST FOR $100' },
  { name: 'MNQ Micro Nasdaq',   min: 200, leverage: '50:1',   pdt: false, spread: 'tight',  tag: 'HIGH VOLATILITY' },
  { name: 'SPY 0DTE Options',   min: 200, leverage: '10–20x', pdt: false, spread: 'medium', tag: 'AGGRESSIVE' },
  { name: 'Crypto (BTC/ETH)',   min: 50,  leverage: '5–10x',  pdt: false, spread: 'medium', tag: '24/7 TRADING' },
  { name: 'Forex (EUR/USD)',    min: 100, leverage: '50:1',   pdt: false, spread: 'tight',  tag: 'NO PDT RULE' },
]

export const SIGNALS = [
  {
    name: 'First 5-Min Candle Break',
    weight: 30,
    desc: 'Open range breakout — bot waits for first 5m candle to close, then trades the break with 3× volume confirmation.',
  },
  {
    name: 'VWAP Deviation ±2σ',
    weight: 25,
    desc: 'Price stretched 2 standard deviations from VWAP. Bot fades with tight 0.5× ATR stop. Win rate 68%+.',
  },
  {
    name: 'Volume Spike > 200% avg',
    weight: 25,
    desc: 'Institutional money flow signal. No volume = no trade. Bot requires 2× avg volume on entry candle.',
  },
  {
    name: 'EMA 9/21 Crossover Confirm',
    weight: 20,
    desc: 'Direction filter. Long only above both EMAs sloping up. Short only below both sloping down. No counter-trend.',
  },
]

export const ENTRY_STEPS = [
  { step: '01', label: 'SCAN',   desc: 'Gap scanner 9 AM. Rank top 5 movers by vol × gap.' },
  { step: '02', label: 'SCORE',  desc: 'Run composite signal score. Threshold check.' },
  { step: '03', label: 'SIZE',   desc: 'Position = (Equity × risk%) ÷ ATR stop distance.' },
  { step: '04', label: 'ENTER',  desc: 'Limit order at bid+0.05%. Bracket order armed.' },
  { step: '05', label: 'MANAGE', desc: 'Move stop to BE at 1R. Scale 50% at 1.5R target.' },
]

export const TRADE_PAIRS = ['MNQ', 'MES', 'SPY', 'QQQ', 'BTC', 'EUR/USD', 'NQ']
