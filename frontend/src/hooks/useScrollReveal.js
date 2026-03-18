import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to all .reveal elements
 * and adds the .vis class when they enter the viewport.
 * Safe to call multiple times — disconnects on unmount.
 */
export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('vis')
            }, i * 80)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    document.querySelectorAll('.reveal:not(.vis)').forEach((el) =>
      obs.observe(el)
    )

    return () => obs.disconnect()
  }, [])
}
