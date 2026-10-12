import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Delivery from './pages/Delivery.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Privacy from './pages/Privacy.jsx';

export default [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'delivery', Component: Delivery },
      { path: 'contact', Component: Contact },
      { path: 'faq', Component: Faq },
      { path: 'privacy', Component: Privacy },
    ],
  },
];
