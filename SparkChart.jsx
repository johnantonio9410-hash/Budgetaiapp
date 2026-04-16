import { useRef, useEffect } from 'react'

export default function SparkChart({ data, color, width = 200, height = 60 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    if (data.length < 2) return

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const xS = (i) => (i / (data.length - 1)) * width
    const yS = (v) => height - 4 - ((v - min) / range) * (height - 8)

    const grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, color + '60')
    grad.addColorStop(1, color + '00')

    ctx.beginPath()
    ctx.moveTo(xS(0), yS(data[0]))
    data.forEach((v, i) => ctx.lineTo(xS(i), yS(v)))
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.moveTo(xS(0), yS(data[0]))
    data.forEach((v, i) => ctx.lineTo(xS(i), yS(v)))
    ctx.stroke()
  }, [data, color, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: '100%', height: `${height}px`, borderRadius: '3px' }}
    />
  )
}
