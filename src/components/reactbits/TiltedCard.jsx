// Adapted from React Bits TiltedCard (https://github.com/DavidHDev/react-bits), MIT + Commons Clause,
// (c) 2026 David Haz; see ./LICENSE.md.
// Changes: wraps any children instead of one image, and the spring comes from a CSS transition on a
// direct style write, so there is no `motion` library and no React re-render on pointer move. Mouse
// only; touch, pen and prefers-reduced-motion get no tilt. The cursor-following caption is dropped
// because the captions are already visible.
import { useRef } from 'react';
import './TiltedCard.css';

export default function TiltedCard({ children, rotateAmplitude = 8, scaleOnHover = 1.03, className = '' }) {
  const innerRef = useRef(null);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    innerRef.current.style.transform = `rotateX(${-py * 2 * rotateAmplitude}deg) rotateY(${px * 2 * rotateAmplitude}deg) scale(${scaleOnHover})`;
  };
  const onLeave = () => {
    innerRef.current.style.transform = '';
  };

  return (
    <div className={`tilted-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={innerRef} className="tilted-card-inner">
        {children}
      </div>
    </div>
  );
}
