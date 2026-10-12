// Adapted from motion-primitives (https://github.com/ibelick/motion-primitives), MIT; see ./LICENSE.md.
// Changes: converted from TypeScript to JSX; it accepts a className so it can replace a layout div; and it uses the
// lightweight `m` components (features load lazily through <LazyMotion> in Layout) to keep the main bundle small.
import { useRef, useState } from 'react';
import { useInView } from 'motion/react';
import * as m from 'motion/react-m';

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({ children, variants = defaultVariants, transition, viewOptions, as = 'div', once, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);
  const MotionComponent = m[as];

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      onAnimationComplete={() => {
        if (once) setIsViewed(true);
      }}
      animate={isInView || isViewed ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
