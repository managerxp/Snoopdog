// Adapted from the React Bits LogoLoop idea (https://github.com/DavidHDev/react-bits), MIT + Commons Clause,
// (c) 2026 David Haz; see ./LICENSE.md. Changes: the scroll is a pure CSS animation (the original runs a
// JavaScript frame loop), the items are text, hover pauses it, and it holds still under prefers-reduced-motion.
import './Ribbon.css';

export default function Ribbon({ items, separator, speed = 40, className = '' }) {
  // Two identical halves; the track slides left by exactly one half, then loops without a jump.
  const half = (hidden) => (
    <ul className="ribbon__list" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="ribbon__item">
          {item}
          <span className="ribbon__sep" aria-hidden="true">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`ribbon ${className}`} style={{ '--ribbon-speed': `${speed}s` }}>
      <div className="ribbon__track">
        {half(false)}
        {half(true)}
        {half(true)}
        {half(true)}
      </div>
    </div>
  );
}
