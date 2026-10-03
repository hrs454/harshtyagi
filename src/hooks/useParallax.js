import { useEffect, useRef } from 'react'

export default function useParallax(factor = 0.5, disableOnMobile = true) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Check if mobile and should disable
    if (disableOnMobile && window.innerWidth < 768) return

    let ticking = false

    function updateParallax() {
      const rect = el.getBoundingClientRect()
      const scrollProgress = 1 - rect.top / window.innerHeight
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const offset = scrollProgress * 100 * factor
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      }
      
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [factor, disableOnMobile])

  return ref
}
