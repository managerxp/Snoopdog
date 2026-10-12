import { ViteReactSSG } from 'vite-react-ssg';
import '@fontsource-variable/gabarito';
import '@fontsource-variable/figtree';
import './index.css';
import routes from './routes.jsx';

export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
  // public/sw.js: repeat visits load from the browser's own cache and the pages open offline
  if (isClient && import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
});
