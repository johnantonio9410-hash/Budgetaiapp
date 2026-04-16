import { useRef, useEffect } from 'react'

export default function GrowthCanvas({ balance, dailyPct, modeId, color }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const maxDays = 200
    const data = [balance]
    for (let i = 1; i <= maxDays; i++) data.push(data[i - 1] * (1 + dailyPct / 100))

    const targets = [500, 1000, 5000, 10000]
    const maxVal = Math.min(data[data.length - 1], 50000)
    const pad = { t: 30, r: 20, b: 45, l: 70 }
    const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b

    const xS = (i) => pad.l + (i / maxDays) * cW
    const yS = (v) => pad.t + cH - Math.min((v / maxVal), 1) * cH

    // Grid
    ctx.strokeStyle = '#1C2535'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * cH
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke()
    }
    for (let i = 0; i <= 4; i++) {
      const x = pad.l + (i / 4) * cW
      ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + cH); ctx.stroke()
    }

    // Target lines
    const tColors = ['#4A9EFF', '#FFD700', '#FF6B35', '#FF2D55']
    targets.forEach((t, ti) => {
      if (t <= maxVal * 1.1) {
        const y = yS(t)
        if (y >= pad.t && y <= pad.t + cH) {
          ctx.strokeStyle = tColors[ti] + '50'
          ctx.lineWidth = 1
          ctx.setLineDash([3, 5])
          ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke()
          ctx.setLineDash([])
          ctx.fillStyle = tColors[ti]
          ctx.font = "bold 9px 'Courier New'"
          ctx.fillText(t >= 1000 ? `$${t / 1000}K` : `$${t}`, pad.l - 40, y + 3)
        }
      }
    })

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH)
    grad.addColorStop(0, color + '40')
    grad.addColorStop(0.6, color + '10')
    grad.addColorStop(1, color + '00')

    ctx.beginPath()
    ctx.moveTo(xS(0), yS(data[0]))
    data.forEach((v, i) => ctx.lineTo(xS(i), Math.max(yS(v), pad.t)))
    ctx.lineTo(xS(maxDays), pad.t + cH)
    ctx.lineTo(xS(0), pad.t + cH)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2.5
    ctx.shadowColor = color
    ctx.shadowBlur = 8
    ctx.moveTo(xS(0), yS(data[0]))
    data.forEach((v, i) => ctx.lineTo(xS(i), Math.max(yS(v), pad.t)))
    ctx.stroke()
    ctx.shadowBlur = 0

    // Milestone dots
    targets.forEach((t, ti) => {
      const idx = data.findIndex(v => v >= t)
      if (idx > 0 && idx < data.length) {
        const x = xS(idx), y = Math.max(yS(data[idx]), pad.t + 4)
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = tColors[ti]
        ctx.shadowColor = tColors[ti]
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      }
    })

    // X axis labels
    ;[0, 50, 100, 150, 200].forEach(d => {
      ctx.fillStyle = '#3A4A60'
      ctx.font = "9px 'Courier New'"
      ctx.fillText(`Day ${d}`, xS(d) - 14, H - 10)
    })

    // Y axis labels
    const steps = [0, maxVal * 0.5, maxVal]
    steps.forEach(v => {
      ctx.fillStyle = '#3A4A60'
      ctx.font = "9px 'Courier New'"
      const label = v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${Math.round(v)}`
      ctx.fillText(label, 2, yS(v) + 3)
    })
  }, [balance, dailyPct, color])

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={280}
      style={{ width: '100%', height: '280px', borderRadius: '4px' }}
    />
  )
}
