import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    const dpr = Math.min(window.devicePixelRatio, 2)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const particles = []
    const count = 40
    const speed = 0.15

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width / dpr,
        y: Math.random() * canvas.height / dpr,
        z: Math.random() * 300 + 50,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      })
    }

    const colors = getComputedStyle(document.documentElement)
    let accent = colors.getPropertyValue('--accent').trim()
    let ink3 = colors.getPropertyValue('--ink-3').trim()

    const observer = new MutationObserver(() => {
      const updated = getComputedStyle(document.documentElement)
      accent = updated.getPropertyValue('--accent').trim()
      ink3 = updated.getPropertyValue('--ink-3').trim()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let frame
    function draw() {
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const scale = p.z / 300
        const size = 1.2 + scale * 2.5
        const alpha = 0.15 + scale * 0.35

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.z > 200 ? accent : ink3
        ctx.globalAlpha = alpha
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // Draw connecting lines between nearby particles for depth
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const avgZ = (a.z + b.z) / 2
            const alpha = (1 - dist / 120) * (avgZ / 300) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = ink3
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero__canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
