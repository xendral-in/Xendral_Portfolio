import { useEffect, useRef } from 'react'

/**
 * Animates a number from 0 → target when the ref element
 * enters the viewport. Returns a ref to attach to the container.
 */
export function useCountUp(targets = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    function animCount(el, target, suffix) {
      let v = 0
      const dur = 1600
      const step = 14
      const inc = target / (dur / step)
      const t = setInterval(() => {
        v = Math.min(v + inc, target)
        el.textContent = Math.floor(v) + suffix
        if (v >= target) clearInterval(t)
      }, step)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('[data-target]')
            els.forEach((el) => {
              animCount(el, +el.dataset.target, el.dataset.suffix || '')
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return containerRef
}
