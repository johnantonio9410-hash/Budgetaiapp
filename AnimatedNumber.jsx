import { useState, useEffect } from 'react'

export default function AnimatedNumber({ value, prefix = '$', decimals = 0 }) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const start = display
    const end = value
    const duration = 600
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(start + (end - start) * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return <span>{prefix}{display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
}
