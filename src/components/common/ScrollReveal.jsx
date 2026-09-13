import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Reusable scroll-triggered reveal wrapper component.
 * Applies a smooth entrance animation when the element enters the viewport.
 *
 * @param {Object} props
 * @param {'up'|'left'|'right'|'scale'} props.direction - Animation direction. Default 'up'
 * @param {number} props.delay - Delay in ms before animation starts. Default 0
 * @param {number} props.duration - Animation duration in ms. Default 600
 * @param {number} props.distance - Distance in px for translate animations. Default 24
 * @param {number} props.threshold - IntersectionObserver threshold. Default 0.15
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.as - HTML element type. Default 'div'
 * @param {React.ReactNode} props.children
 */
export const ScrollReveal = ({
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = 24,
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  children,
  style: externalStyle,
  ...rest
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'left': return `translate3d(-${distance}px, 0, 0) scale(1)`;
      case 'right': return `translate3d(${distance}px, 0, 0) scale(1)`;
      case 'scale': return 'translate3d(0, 0, 0) scale(0.97)';
      case 'up':
      default: return `translate3d(0, ${distance}px, 0) scale(1)`;
    }
  };

  const revealStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...externalStyle,
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
