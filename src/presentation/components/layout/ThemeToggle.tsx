'use client';

import { animated, useSpring } from '@react-spring/web';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * ThemeToggle Component
 * Animated dark/light mode toggle using react-spring
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  // Animation for icon rotation and scale
  const iconSpring = useSpring({
    transform: isDark ? 'rotate(180deg) scale(1)' : 'rotate(0deg) scale(1)',
    opacity: mounted ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  // Animation for background
  const bgSpring = useSpring({
    backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(251, 191, 36, 0.2)',
    config: { tension: 200, friction: 20 },
  });

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <div className="main-icon-button w-10 h-10 flex items-center justify-center rounded-lg opacity-0">
        <span className="text-lg">🌙</span>
      </div>
    );
  }

  return (
    <animated.button
      onClick={toggleTheme}
      style={bgSpring}
      className="main-icon-button relative overflow-hidden"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
    >
      <animated.span style={iconSpring} className="text-lg block">
        {isDark ? '🌙' : '☀️'}
      </animated.span>
    </animated.button>
  );
}
