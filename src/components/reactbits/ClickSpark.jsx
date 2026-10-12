// Adapted from React Bits (https://github.com/DavidHDev/react-bits), MIT + Commons Clause,
// (c) 2026 David Haz; see ./LICENSE.md.
// Changes: one fixed, viewport-sized canvas instead of a page-sized one wrapping the app; the
// draw loop runs only while sparks are alive; sharper on high-DPI screens; sparks use `altColor`
// over dark sections (.on-dark) and the orange section (.on-sun); off under prefers-reduced-motion.
import { useEffect, useRef } from 'react';

export default function ClickSpark({
  sparkColor = '#fff',
  altColor = sparkColor,
  sunColor = sparkColor,
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineWidth = 2;
      sparks = sparks.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;
        const eased = t * (2 - t);
        const d = eased * sparkRadius;
        const len = sparkSize * (1 - eased);
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(s.x + d * Math.cos(s.angle), s.y + d * Math.sin(s.angle));
        ctx.lineTo(s.x + (d + len) * Math.cos(s.angle), s.y + (d + len) * Math.sin(s.angle));
        ctx.stroke();
        return true;
      });
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e) => {
      const dark = document.documentElement.dataset.theme === 'dark';
      const color = e.target.closest?.('.on-dark') || (dark && e.target.closest?.('.on-chrome')) ? altColor : e.target.closest?.('.on-sun') ? sunColor : sparkColor;
      const start = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, angle: (2 * Math.PI * i) / sparkCount, start, color });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, [sparkColor, altColor, sunColor, sparkSize, sparkRadius, sparkCount, duration]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 size-full" />;
}
