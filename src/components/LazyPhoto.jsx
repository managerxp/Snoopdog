import { useRef } from 'react';
import { useInView } from 'motion/react';

// A photo that is only requested once it is within 100px of the screen. Until then a same-shaped box holds the
// space (no layout shift). The browser's own loading="lazy" starts earlier than this on slow connections, which
// pulled about 450 KB of gallery photos in ahead of the hero image. Without JavaScript the <noscript> copy shows.
export default function LazyPhoto({ src, srcSet, sizes, width, height, alt, className }) {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '100px 0px 100px 0px' });
  const img = <img src={src} srcSet={srcSet} sizes={sizes} width={width} height={height} decoding="async" alt={alt} className={className} />;
  return (
    <span ref={ref} className="block">
      {near ? img : <span aria-hidden="true" className={`${className} block`} />}
      <noscript>{img}</noscript>
    </span>
  );
}
