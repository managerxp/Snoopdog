import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig } from 'motion/react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ActionBar from './ActionBar.jsx';
import ClickSpark from './reactbits/ClickSpark.jsx';

const loadMotionFeatures = () => import('./motion-primitives/features.js').then((mod) => mod.default);

export default function Layout() {
  const { pathname, hash } = useLocation();
  // Client-side navigation keeps the old scroll position; go to the hash target or the top.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    // reducedMotion="user": visitors who ask for less motion get no movement, only the fades
    <LazyMotion features={loadMotionFeatures}>
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ActionBar />
      <ClickSpark sparkColor="#FF7A1A" altColor="#2DB0F2" sunColor="#07182F" />
    </MotionConfig>
    </LazyMotion>
  );
}
