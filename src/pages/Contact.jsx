import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { InView } from '../components/motion-primitives/InView.jsx';
import { reveal } from '../components/reveal.js';
import Seo from '../components/Seo.jsx';
import PageIntro from '../components/PageIntro.jsx';
import GoogleRating from '../components/GoogleRating.jsx';
import OpenNow from '../components/OpenNow.jsx';
import { generalEnquiry, site, telUrl, whatsappUrl } from '../site.js';

const actions = [
  { label: 'WhatsApp', note: 'Ask about a product or delivery', href: whatsappUrl(generalEnquiry), icon: MessageCircle, external: true },
  { label: 'Call', note: site.phoneDisplay, href: telUrl, icon: Phone },
  { label: 'Email', note: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: 'Directions', note: 'Open in Google Maps', href: site.directionsUrl, icon: MapPin, external: true },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact and directions | SnoopDog Andaman, Garacharama"
        description="Find SnoopDog near the Medical Bus Stop, Garacharama, Andaman. Open daily 8:30 AM to 9:00 PM. WhatsApp, call or get directions."
      />
      <PageIntro title="Come in, call, or message us.">
        We are on the first floor near the Medical Bus Stop in Garacharama.
      </PageIntro>

      <section className="zig-top bg-surface py-14 md:py-20">
        <InView {...reveal} className="wrap grid gap-12 md:grid-cols-2 md:gap-16">
          <ul className="border-b border-line">
            {actions.map(({ label, note, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group -mx-4 flex items-center justify-between gap-4 border-t border-line px-4 py-6 transition-colors hover:bg-surface-alt"
                >
                  <span className="flex items-center gap-4">
                    <Icon size={28} aria-hidden="true" className="shrink-0 text-title" />
                    <span>
                      <span className="block font-display text-3xl font-extrabold tracking-tight text-title">{label}</span>
                      <span className="block text-muted">{note}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={26} aria-hidden="true" className="shrink-0 text-title transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-title md:text-4xl">The shop</h2>
            <address className="mt-4 text-xl not-italic leading-relaxed">
              {site.address.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-title md:text-4xl">Opening hours</h2>
            <p className="mt-4 text-xl">{site.hours.label}</p>
            <OpenNow className="mt-2 text-ok" />
            <ul className="mt-8 font-semibold text-title">
              <li>
                <GoogleRating className="hover:text-link-hover" starClassName="text-accent" />
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-link-hover">
                  Instagram {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </InView>
      </section>
    </>
  );
}
