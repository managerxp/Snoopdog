import { ViteReactSSG } from 'vite-react-ssg';
import '@fontsource-variable/gabarito';
import '@fontsource-variable/figtree';
import './index.css';
import routes from './routes.jsx';

export const createRoot = ViteReactSSG({ routes });
