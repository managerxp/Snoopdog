import { Head } from 'vite-react-ssg';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InView } from '../components/motion-primitives/InView.jsx';
import { reveal } from '../components/reveal.js';
import WordsIn from '../components/WordsIn.jsx';
import Seo, { siteUrl } from '../components/Seo.jsx';
import GoogleRating from '../components/GoogleRating.jsx';
import OpenNow from '../components/OpenNow.jsx';
import Steps, { Paw } from '../components/Steps.jsx';
import Magnet from '../components/reactbits/Magnet.jsx';
import TiltedCard from '../components/reactbits/TiltedCard.jsx';
import GlitchText from '../components/reactbits/GlitchText.jsx';
import Ribbon from '../components/reactbits/Ribbon.jsx';
import LazyPhoto from '../components/LazyPhoto.jsx';
import { generalEnquiry, productEnquiry, site, telUrl, whatsappUrl } from '../site.js';

const title = 'SnoopDog Andaman | Pet Store, Garacharama';
const description =
  'SnoopDog Andaman: pet food, care, beds, toys and accessories for dogs and cats in Garacharama, Andaman. Home delivery across the islands.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PetStore',
  name: site.name,
  alternateName: ['Snoopdog Andaman', 'SnoopDog Andaman Pet Store'],
  description,
  ...(siteUrl && { url: siteUrl, image: `${siteUrl}/images/og.jpg` }),
  telephone: `+${site.phone}`,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:30',
    closes: '21:00',
  },
  sameAs: [site.instagram.url],
};

// The shop section: five categories plus a look inside. Every tile has a photo.
const tiles = [
  { name: 'Food', note: 'For dogs and cats', ask: 'pet food', file: 'food', alt: 'Pet food corner poster showing shelves of dry dog and cat food in bags' },
  { name: 'Care', note: 'Wellness and care essentials', ask: 'wellness and care products', file: 'care', alt: 'Pet care essentials poster showing shelves of shampoos, sprays and wipes' },
  { name: 'Comfort', note: 'Comfort items', ask: 'comfort items', file: 'comfort', alt: 'Dog and cat bed poster showing a cushioned bed and a round bed with a teal rope mat' },
  { name: 'Toys', note: 'For dogs and cats', ask: 'toys', file: 'toys', alt: 'Pet toys poster showing a wall of chew toys, balls and cat wand toys' },
  { name: 'Accessories', note: 'Brushes, bowls and more', ask: 'pet accessories', file: 'accessories', alt: 'Pet grooming and accessories poster showing a rack of brushes, toothbrushes, plush toys and steel food bowls' },
  { name: 'Our Store', note: 'Visit us on the first floor', to: '/contact', file: 'aisle', alt: 'The shop aisle with the counter on the left, shelves of pet food on the right and toys and beds at the far end' },
];

// A tile links to the contact page, or opens a WhatsApp enquiry about what it shows.
function TileLink({ t, className, children }) {
  return t.to ? (
    <Link to={t.to} className={className}>{children}</Link>
  ) : (
    <a href={whatsappUrl(productEnquiry(t.ask))} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  );
}

// The brands on the shelves; one tile image each in public/images/brands (logos supplied by the owner).
// Ordered so black, orange and scene tiles are spread across the grid.
const brands = [
  { slug: 'josera', name: 'Josera' },
  { slug: 'fabled', name: 'Fabled' },
  { slug: 'orijen', name: 'Orijen' },
  { slug: 'cuddle-buds', name: 'Cuddle Buds' },
  { slug: 'acana', name: 'Acana' },
  { slug: 'smudges', name: 'Aloha Smudges' },
  { slug: 'moe', name: 'Moe Puppy' },
  { slug: 'petaholic', name: 'Petaholic' },
  { slug: 'nunbell', name: 'Nunbell' },
];
const ribbonItems = ['Food', 'Care', 'Comfort', 'Toys', 'Accessories', 'Home delivery'];

export default function Home() {
  return (
    <>
      <Seo title={title} description={description} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* Hero: the card's big dog at the back, with the shop inside it */}
      <section className="on-chrome paw-bg relative overflow-hidden bg-chrome text-chrome-fg md:min-h-[680px]">
        <div className="wrap relative z-10 pt-8 md:pb-24 md:pt-20">
          <div className="md:max-w-[52%]">
            <WordsIn as="h1" className="text-[clamp(2.9rem,10.5vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.025em] text-chrome-heading">
              The pet’s side of town.
            </WordsIn>
            <p className="mt-5 max-w-[34ch] text-xl text-chrome-muted md:text-2xl">
              Food, care, comfort, toys and accessories for dogs and cats. Handpicked, with home delivery across the Andaman &amp; Nicobar Islands.
            </p>
            <div className="mt-8 hidden flex-wrap gap-3 md:flex">
              <Magnet padding={60} magnetStrength={4}>
                <a href={whatsappUrl(generalEnquiry)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle size={22} aria-hidden="true" />
                  Chat on WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Magnet>
              <Magnet padding={60} magnetStrength={4}>
                <a href={telUrl} className="btn btn-chrome">
                  <Phone size={22} aria-hidden="true" />
                  Call {site.phoneDisplay}
                </a>
              </Magnet>
            </div>
            <OpenNow className="mt-6 text-ok" />
          </div>
        </div>

        <div className="pointer-events-none relative z-0 mt-4 aspect-[4/3] w-full md:absolute md:inset-y-0 md:right-0 md:mt-0 md:aspect-auto md:w-[62%]">
          <img
            src="/images/hero-art-1000.webp"
            srcSet="/images/hero-art-640.webp 640w, /images/hero-art-1000.webp 1000w, /images/hero-art-1400.webp 1400w"
            sizes="(min-width: 768px) 62vw, 100vw"
            width="1670"
            height="941"
            fetchPriority="high"
            alt="SnoopDog artwork: a dog and a cat"
            className="size-full object-cover object-right"
          />
        </div>
      </section>

      {/* Ribbon: the offer, sliding past */}
      <div aria-hidden="true" className="relative z-10 -mb-6 -mt-7 overflow-x-clip pb-2 pt-2">
        <Ribbon
          items={ribbonItems}
          separator={<Paw className="mx-5 size-6 md:mx-8 md:size-8" />}
          speed={36}
          className="-ml-[5%] w-[110%] -rotate-1 bg-sky py-3 font-display text-2xl font-extrabold uppercase tracking-tight text-night md:py-4 md:text-4xl"
        />
      </div>

      {/* Shop by category, with the shop itself */}
      <section id="shop" className="bg-surface py-14 md:py-24">
        <InView {...reveal} className="wrap">
          <GlitchText as="h2" background="var(--surface)" className="max-w-[18ch] text-4xl font-extrabold leading-none tracking-tight text-fg md:text-6xl">
            What is your pet looking for?
          </GlitchText>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            Pick a category and ask us on WhatsApp what is in stock and what it costs. Stock changes, so it is always worth a message.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
            {tiles.map((t) => (
              <li key={t.name}>
                <TileLink t={t} className="group block">
                  <TiltedCard>
                    <LazyPhoto
                      src={`/images/store/${t.file}-600.webp`}
                      srcSet={`/images/store/${t.file}-360.webp 360w, /images/store/${t.file}-600.webp 600w, /images/store/${t.file}-960.webp 960w`}
                      sizes="(min-width: 768px) 380px, 44vw"
                      width="960"
                      height="1280"
                      alt={t.alt}
                      className="aspect-[3/4] w-full rounded-sm bg-surface-alt object-cover"
                    />
                  </TiltedCard>
                  <span className="mt-3 flex items-center justify-between gap-2 md:gap-3">
                    <span>
                      <span className="block font-display text-xl font-extrabold leading-tight tracking-tight text-title min-[420px]:text-2xl md:text-4xl">{t.name}</span>
                      <span className="block text-muted">{t.note}</span>
                    </span>
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-title text-title transition-colors md:size-11 [@media(hover:hover)]:group-hover:border-sun [@media(hover:hover)]:group-hover:bg-sun [@media(hover:hover)]:group-hover:text-night">
                      <ArrowUpRight size={22} />
                    </span>
                  </span>
                  <span className="sr-only">{t.to ? 'See the contact page' : `Ask about ${t.name.toLowerCase()} on WhatsApp (opens in a new tab)`}</span>
                </TileLink>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      {/* Delivery */}
      <section id="delivery" className="on-dark zig-top bg-brand py-14 text-paper md:py-24">
        <InView {...reveal} className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-6xl">
              Home delivery across the Andaman &amp; Nicobar Islands.
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg text-soft-night">
              Message us what you need and we will confirm it, with the price and delivery for your area.
            </p>
            <a href={whatsappUrl('Hi SnoopDog, I would like to ask about home delivery to my area.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
              <MessageCircle size={22} aria-hidden="true" />
              Ask about delivery
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="mt-6">
              <Link to="/delivery" className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4">More about delivery</Link>
            </p>
          </div>
          <Steps dark />
        </InView>
      </section>

      {/* Brands */}
      <section id="brands" className="zig-top bg-surface py-14 md:py-24">
        <InView {...reveal} className="wrap">
          <h2 className="max-w-[18ch] text-4xl font-extrabold leading-none tracking-tight text-fg md:text-6xl">Brands in our store.</h2>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            Come and see them on our shelves, or tap a brand to ask on WhatsApp what is in stock.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 [&>li:last-child]:col-span-2 md:[&>li:last-child]:col-span-1">
            {brands.map((b) => (
              <li key={b.slug}>
                <a
                  href={whatsappUrl(productEnquiry(`${b.name} products`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl ring-1 ring-line transition duration-200 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_16px_28px_-14px_rgb(0_0_0/0.5)]"
                >
                  <LazyPhoto
                    src={`/images/brands/${b.slug}-600.webp`}
                    srcSet={`/images/brands/${b.slug}-300.webp 300w, /images/brands/${b.slug}-600.webp 600w`}
                    sizes="(min-width: 768px) 220px, 46vw"
                    width="600"
                    height="400"
                    alt={`${b.name} logo`}
                    className="block aspect-[3/2] w-full bg-surface-alt object-cover"
                  />
                  <span aria-hidden="true" className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-night/90 px-2.5 py-1 text-xs font-bold text-white">Ask <ArrowUpRight size={12} /></span>
                  <span className="sr-only">Ask about {b.name} on WhatsApp (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      {/* Visit */}
      <section id="visit" className="on-sun zig-top bg-sun py-14 text-night md:py-24">
        <InView {...reveal} className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
              Visit us near the Medical Bus Stop.
            </h2>
            <address className="mt-6 text-xl not-italic leading-relaxed text-ink">
              {site.address.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <p className="mt-5 text-lg text-ink">{site.hours.label}</p>
            <OpenNow className="mt-2 text-night" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-night">
              <MapPin size={22} aria-hidden="true" />
              Get directions
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            <a href={telUrl} className="btn btn-outline-night">
              <Phone size={22} aria-hidden="true" />
              Call {site.phoneDisplay}
            </a>
            <ul className="mt-2 font-semibold">
              <li>
                <GoogleRating starClassName="text-night" />
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">
                  Follow {site.instagram.handle} on Instagram
                </a>
              </li>
              <li>
                <Link to="/contact" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">All contact details</Link>
              </li>
            </ul>
          </div>
        </InView>
      </section>
    </>
  );
}
