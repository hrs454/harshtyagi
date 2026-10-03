import { useEffect, useRef } from 'react'

export default function useMouseParallax(strength = 20, smoothing = 0.1) {
  const ref = useRef(null)
  const animationRef = useRef(null)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const targetX = useRef(0)
  const targetY = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    function handleMouseMove(e) {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate offset from center, normalized to -1 to 1
      const offsetX = (e.clientX - centerX) / (rect.width / 2)
      const offsetY = (e.clientY - centerY) / (rect.height / 2)
      
      targetX.current = offsetX * strength
      targetY.current = offsetY * strength
    }

    function animate() {
      // Smooth interpolation
      currentX.current += (targetX.current - currentX.current) * smoothing
      currentY.current += (targetY.current - currentY.current) * smoothing
      
      el.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) rotateY(${currentX.current * 0.5}deg) rotateX(${-currentY.current * 0.5}deg)`
      
      animationRef.current = requestAnimationFrame(animate)
    }

    el.addEventListener('mouseenter', () => {
      el.addEventListener('mousemove', handleMouseMove)
      animationRef.current = requestAnimationFrame(animate)
    })

    el.addEventListener('mouseleave', () => {
      el.removeEventListener('mousemove', handleMouseMove)
      targetX.current = 0
      targetY.current = 0
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      // Smooth return to center
      animationRef.current = requestAnimationFrame(animate)
      setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        el.style.transform = ''
      }, 500)
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [strength, smoothing])

  return ref
}
