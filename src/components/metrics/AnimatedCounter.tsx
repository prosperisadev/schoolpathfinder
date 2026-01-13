/**
 * =============================================================================
 * LIVE METRICS COUNTER COMPONENT
 * =============================================================================
 * 
 * Purpose: Animated counter for displaying real-time metrics
 * Animation: Smooth counting from 0 to target value
 * Performance: Uses requestAnimationFrame for 60fps
 * 
 * Props:
 * - value: Target number to count to
 * - duration: Animation duration in ms (default: 2000ms)
 * - formatter: Optional number formatting function
 * 
 * Usage:
 * <AnimatedCounter value={1234} duration={2000} />
 * // Displays: 0 → 1,234 over 2 seconds
 */

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;  // Delay before animation starts (for psychological authenticity)
  formatter?: (num: number) => string;
  className?: string;
}

function AnimatedCounter({ 
  value, 
  duration = 2000,
  delay = 0,
  formatter = (num) => num.toLocaleString('en-US'),
  className = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const [isDelayed, setIsDelayed] = useState(delay > 0);

  useEffect(() => {
    // Reset on value change
    setDisplayValue(0);
    startTimeRef.current = undefined;
    setIsDelayed(delay > 0);

    // Handle initial delay for psychological effect
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setIsDelayed(false);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }
  }, [value, delay]);

  useEffect(() => {
    // Don't start animation until delay is complete
    if (isDelayed) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutCubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration, formatter, isDelayed]);

  return <span className={className}>{formatter(displayValue)}</span>;
}

export default AnimatedCounter;
