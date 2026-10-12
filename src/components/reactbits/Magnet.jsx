// Adapted from React Bits (https://github.com/DavidHDev/react-bits), MIT + Commons Clause,
// (c) 2026 David Haz; see ./LICENSE.md.
// Changes: moves the element with a direct style write instead of React state (no re-render on
// every mouse move), and only runs for a fine pointer with hover and no reduced-motion preference.
import { useEffect, useRef } from 'react';

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const capable = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (disabled || !capable.matches) return undefined;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    let active = false;

    const reset = () => {
      if (!active) return;
      active = false;
      inner.style.transition = inactiveTransition;
      inner.style.transform = 'translate3d(0, 0, 0)';
    };

    const onMove = (e) => {
      const { left, top, width, height } = wrap.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      if (Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding) {
        active = true;
        inner.style.transition = activeTransition;
        inner.style.transform = `translate3d(${(e.clientX - cx) / magnetStrength}px, ${(e.clientY - cy) / magnetStrength}px, 0)`;
      } else {
        reset();
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      reset();
    };
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div ref={wrapRef} className={wrapperClassName} style={{ position: 'relative', display: 'inline-block' }} {...props}>
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
