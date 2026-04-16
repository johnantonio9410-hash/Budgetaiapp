# TradeInc Budget EA v3.0

**Aggressive Day Trading Bot Dashboard** — $100 → $1,000 growth tracker with live simulation, compound projections, and signal engine.

---

## 🚀 Deploy to Vercel (3 Steps)

### Option A — GitHub + Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "TradeInc Budget EA v3.0"
   gh repo create tradeinc-budget-ea --public --push
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select your `tradeinc-budget-ea` repo
   - Framework will auto-detect as **Vite**
   - Click **Deploy** — done in ~60 seconds

3. **Your live URL**
   ```
   https://tradeinc-budget-ea.vercel.app
   ```

---

### Option B — Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Inside the project folder
cd tradeinc-budget-ea
npm install
vercel

# Follow prompts — select defaults
# Done! Live URL printed in terminal
```

---

### Option C — Drag & Drop (No CLI needed)

1. Run `npm run build` — this creates a `dist/` folder
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the entire `dist/` folder onto the page
4. Instant deploy — no account needed for preview

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
tradeinc-budget-ea/
├── index.html              # Entry HTML
├── vite.config.js          # Vite config
├── vercel.json             # Vercel deployment config
├── package.json            # Dependencies
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Root component + routing
    ├── data/
    │   └── constants.js    # All modes, instruments, signals
    ├── components/
    │   ├── Header.jsx      # Top bar + mode selector
    │   ├── NavTabs.jsx     # Tab navigation
    │   ├── AnimatedNumber.jsx  # Smooth number animation
    │   ├── SparkChart.jsx  # Mini equity curve canvas
    │   └── GrowthCanvas.jsx    # Full compound growth chart
    ├── hooks/
    │   └── useBot.js       # Live trade simulation hook
    └── pages/
        ├── Dashboard.jsx   # Main trading dashboard
        ├── GrowthChart.jsx # Compound growth projections
        ├── Signals.jsx     # Signal engine + entry flow
        └── Markets.jsx     # Instruments + broker comparison
```

---

## ⚙️ Customise the Bot

All key parameters live in `src/data/constants.js`:

```js
// Change daily return targets
{ id: 'sniper',  daily: 3, risk: 2, rr: '2:1',   trades: 3 }
{ id: 'assault', daily: 5, risk: 3, rr: '2.5:1', trades: 5 }
{ id: 'rampage', daily: 8, risk: 5, rr: '3:1',   trades: 6 }

// Add new instruments
{ name: 'Gold Futures', min: 300, leverage: '20:1', pdt: false, ... }
```

---

## 📊 Features

| Feature | Description |
|---|---|
| 3 Aggressive Modes | Sniper 3%, Assault 5%, Rampage 8% daily |
| Live Simulation | Simulated trade feed with real win/loss logic |
| Compound Calculator | 200-day projection with $500/$1K/$5K/$10K milestones |
| Signal Engine | Weighted 4-signal scoring system |
| Broker Comparison | 5 brokers ranked for small accounts |
| PDT Bypass Guide | Cash accounts, futures, prop firms |
| Animated Equity | Real-time equity curve with sparkline |

---

## ⚠️ Disclaimer

This is an **educational dashboard** only. Not financial advice.  
Always paper trade before risking real capital.  
Past simulated performance does not guarantee future results.

---

*TradeInc Budget EA v3.0 — Built for the grind*
