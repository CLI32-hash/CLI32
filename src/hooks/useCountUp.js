import { useRef, useState, useEffect } from 'react';

/**
 * Reusable count-up animation hook.
 * Animates numbers from 0 to target when the element enters the viewport.
 * Triggers only once.
 *
 * @param {Array<{value: number, suffix?: string, formatter?: function}>} statsData
 * @param {Object} options
 * @param {number} options.duration - Animation duration in ms. Default 1200
 * @param {number} options.steps - Number of animation steps. Default 30
 * @param {number} options.threshold - IntersectionObserver threshold. Default 0.25
 * @returns {{ ref: React.RefObject, counts: number[], hasAnimated: boolean }}
 */
export function useCountUp(statsData, { duration = 1200, steps = 30, threshold = 0.25 } = {}) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(statsData.map((stat) => stat.value));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(currentStep / steps, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((stat) => Math.floor(easeProgress * stat.value))
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(statsData.map((stat) => stat.value));
            }
          }, stepTime);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, statsData, duration, steps, threshold]);

  return { ref, counts, hasAnimated };
}
