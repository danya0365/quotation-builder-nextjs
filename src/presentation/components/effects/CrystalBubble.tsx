'use client';

import { animated, config, useSpring } from '@react-spring/web';
import { useEffect, useMemo, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  hue: number;
}

interface CrystalBubbleProps {
  /** Number of bubbles to render */
  count?: number;
  /** Container className */
  className?: string;
}

/**
 * Individual animated bubble component
 */
function AnimatedBubble({ bubble }: { bubble: Bubble }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), bubble.delay);
    return () => clearTimeout(timer);
  }, [bubble.delay]);

  const floatSpring = useSpring({
    from: {
      y: 100,
      opacity: 0,
      scale: 0.5,
    },
    to: async (next) => {
      while (true) {
        await next({
          y: -20,
          opacity: 0.7,
          scale: 1,
          config: { duration: bubble.duration },
        });
        await next({
          y: 100,
          opacity: 0,
          scale: 0.5,
          config: { duration: 0 },
        });
      }
    },
    pause: !isVisible,
    config: config.gentle,
  });

  const wobbleSpring = useSpring({
    from: { x: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: 15, config: { duration: bubble.duration * 0.3 } });
        await next({ x: -15, config: { duration: bubble.duration * 0.3 } });
        await next({ x: 0, config: { duration: bubble.duration * 0.4 } });
      }
    },
    pause: !isVisible,
  });

  return (
    <animated.div
      className="crystal-bubble"
      style={{
        width: bubble.size,
        height: bubble.size,
        left: `${bubble.x}%`,
        bottom: `${bubble.y}%`,
        background: `linear-gradient(135deg, 
          hsla(${bubble.hue}, 70%, 60%, 0.3) 0%, 
          hsla(${bubble.hue + 30}, 80%, 70%, 0.2) 50%,
          hsla(${bubble.hue + 60}, 70%, 60%, 0.1) 100%)`,
        transform: floatSpring.y.to((y) => `translateY(${y}vh)`),
        opacity: floatSpring.opacity,
        scale: floatSpring.scale,
        translateX: wobbleSpring.x,
      }}
    />
  );
}

/**
 * CrystalBubble Component
 * Creates floating crystal bubble animations with react-spring
 */
export function CrystalBubble({ count = 15, className = '' }: CrystalBubbleProps) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i): Bubble => ({
      id: i,
      size: Math.random() * 80 + 40, // 40-120px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 20, // Start from bottom 0-20%
      duration: Math.random() * 8000 + 8000, // 8-16 seconds
      delay: Math.random() * 3000, // 0-3 seconds delay
      hue: Math.random() * 60 + 200, // Blue to purple range (200-260)
    }));
  }, [count]);

  return (
    <div className={`crystal-bubble-container ${className}`}>
      {bubbles.map((bubble) => (
        <AnimatedBubble key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
}
