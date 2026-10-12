import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import Wordmark from './Wordmark.jsx';
import { site, telUrl } from '../site.js';

const links = [
  { to: '/#shop', label: 'Shop', hash: true },
  { to: '/delivery', label: 'Delivery' },
  { to: '/faq', label: 'Questions' },
  { to: '/contact', label: 'Contact' },
];

const base = 'font-semibold underline-offset-8 hover:text-chrome-accent hover:underline';
const linkClass = ({ isActive }) => `${base} ${isActive ? 'text-chrome-accent underline' : 'text-chrome-fg'}`;

function NavItem({ to, label, hash }) {
  return hash ? (
    <a href={to} className={`${base} text-chrome-fg`}>{label}</a>
  ) : (
    <NavLink to={to} className={linkClass}>{label}</NavLink>
  );
}

export default function Header() {
  const menu = useRef(null);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname, hash]);
  // A mobile menu closes on Escape and on a tap outside it, as people expect on iOS and Android.
  useEffect(() => {
    const close = (e) => {
      const el = menu.current;
      if (!el?.open) return;
      if (e.type === 'keydown' ? e.key === 'Escape' : !el.contains(e.target)) el.open = false;
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, []);

  return (
    <header className="on-chrome relative z-30 bg-chrome text-chrome-fg">
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-2 md:gap-3" aria-label={`${site.name} home`}>
          <img src="/images/logo-mark-96.webp" width="44" height="44" alt="" className="size-9 shrink-0 max-[359px]:hidden lg:size-11" />
          <Wordmark className="h-6 shrink-0 lg:h-8" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
          <a href={telUrl} className="btn btn-chrome">
            <Phone size={20} aria-hidden="true" />
            Call us
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <details ref={menu} className="group">
            <summary className="btn btn-chrome !min-h-11 cursor-pointer list-none !gap-2 !px-3 marker:content-none [&::-webkit-details-marker]:hidden">
              <Menu size={22} aria-hidden="true" className="group-open:hidden" />
              <X size={22} aria-hidden="true" className="hidden group-open:block" />
              Menu
            </summary>
            <nav aria-label="Main" className="absolute inset-x-0 top-full border-t border-chrome-line bg-chrome pb-4 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.45)]">
              <ul className="wrap">
                {links.map((l) => (
                  <li key={l.to} className="border-b border-chrome-line last:border-0">
                    {l.hash ? (
                      <a href={l.to} className="block py-4 font-display text-2xl font-bold text-chrome-fg">{l.label}</a>
                    ) : (
                      <NavLink to={l.to} className={({ isActive }) => `block py-4 font-display text-2xl font-bold ${isActive ? 'text-chrome-accent underline underline-offset-8' : 'text-chrome-fg'}`}>
                        {l.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
