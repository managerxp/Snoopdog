import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { InView } from '../components/motion-primitives/InView.jsx';
import { reveal } from '../components/reveal.js';
import Seo from '../components/Seo.jsx';
import PageIntro from '../components/PageIntro.jsx';
import { site } from '../site.js';

const faqs = [
  {
    q: 'Where is SnoopDog?',
    a: (
      <>
        {site.address.street}, {site.address.city} {site.address.postalCode}. We are on the first floor.{' '}
        <a className="font-semibold text-title underline underline-offset-4" href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
          Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
        .
      </>
    ),
  },
  { q: 'What are your opening hours?', a: `We are open every day, 8:30 AM to 9:00 PM.` },
  {
    q: 'What do you sell?',
    a: 'Pet food, wellness and care essentials, comfort items, toys and accessories, for dogs and cats.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes, we deliver to your home across the Andaman & Nicobar Islands. Message us your area and we will confirm availability, price and delivery before anything is arranged.',
  },
  {
    q: 'How do I order?',
    a: 'Message us on WhatsApp or call the shop. Tell us what you need and we will confirm it with you. Sending a message is an enquiry, not an order.',
  },
  {
    q: 'Can you check if you have a particular product?',
    a: 'Yes. Message us the name of the product, or a photo, and we will tell you whether it is available and what it costs.',
  },
  { q: 'Do you offer grooming?', a: 'No, SnoopDog does not offer grooming.' },
];

export default function Faq() {
  return (
    <>
      <Seo
        title="Questions | SnoopDog pet store, Sri Vijaya Puram"
        description="Answers about SnoopDog: where to find us, opening hours, what we sell, home delivery across the Andaman & Nicobar Islands and how to order."
      />
      <PageIntro title="Questions, answered.">Everything people ask us before they visit or message.</PageIntro>

      <section className="zig-top bg-surface py-14 md:py-20">
        <InView {...reveal} className="wrap">
          <div className="max-w-3xl border-b border-line">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group border-t border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-bold text-title marker:content-none md:text-2xl [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus size={26} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-6 text-lg text-muted">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 max-w-[50ch] text-lg">
            Something else? <Link to="/contact" className="font-semibold text-title underline underline-offset-4">Message or call us</Link>.
          </p>
        </InView>
      </section>
    </>
  );
}
