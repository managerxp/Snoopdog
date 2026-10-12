import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './Icons.jsx';
import Wordmark from './Wordmark.jsx';
import GoogleRating from './GoogleRating.jsx';
import { generalEnquiry, site, telUrl, whatsappUrl } from '../site.js';

const link = 'inline-flex min-h-11 items-center underline underline-offset-4 hover:text-amber';
const contacts = [
  { label: 'WhatsApp', href: whatsappUrl(generalEnquiry), icon: MessageCircle, external: true },
  { label: site.phoneDisplay, href: telUrl, icon: Phone },
  { label: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: `Instagram ${site.instagram.handle}`, href: site.instagram.url, icon: InstagramIcon, external: true },
  { label: 'Directions on Google Maps', href: site.directionsUrl, icon: MapPin, external: true },
];

export default function Footer() {
  return (
    <footer className="on-dark paw-bg-dark bg-night pt-12 pb-28 text-paper md:pb-12">
      <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <div className="flex items-center gap-3">
          <img src="/images/logo-mark-96.webp" width="56" height="56" alt="" className="size-14" loading="lazy" />
          <div>
            <Wordmark className="h-8 text-white" />
            <p className="text-soft-night">{site.tagline}</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="font-semibold">
            <li><Link className={link} to="/delivery">Delivery</Link></li>
            <li><Link className={link} to="/faq">Questions</Link></li>
            <li><Link className={link} to="/contact">Contact</Link></li>
            <li><Link className={link} to="/privacy">Privacy</Link></li>
          </ul>
        </nav>
        <ul className="font-semibold">
          {contacts.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                className="group inline-flex min-h-11 items-center gap-3 hover:text-amber"
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon size={22} aria-hidden="true" className="shrink-0 text-sky" />
                <span className="underline underline-offset-4">{label}</span>
                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
          <li>
            <GoogleRating className="hover:text-amber" />
          </li>
        </ul>
      </div>
      <div className="wrap mt-10 flex flex-col gap-1 text-sm text-soft-night md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}, Sri Vijaya Puram.</p>
        <p>
          Powered by{' '}
          <a href="https://managerxp.com" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4 hover:text-amber">
            ManagerXP<span className="sr-only"> (opens managerxp.com in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
