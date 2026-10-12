import { MessageCircle, Phone } from 'lucide-react';
import { InView } from '../components/motion-primitives/InView.jsx';
import { reveal } from '../components/reveal.js';
import Seo from '../components/Seo.jsx';
import PageIntro from '../components/PageIntro.jsx';
import Steps from '../components/Steps.jsx';
import { site, telUrl, whatsappUrl } from '../site.js';

export default function Delivery() {
  return (
    <>
      <Seo
        title="Home delivery in the Andaman & Nicobar Islands | SnoopDog"
        description="SnoopDog delivers pet food, care essentials, comfort items, toys and accessories across the Andaman & Nicobar Islands. Message us to confirm availability, price and delivery for your area."
      />
      <PageIntro title="Home delivery across the Andaman & Nicobar Islands.">
        Tell us what you need and where you are. We confirm everything before anything is arranged.
      </PageIntro>

      <section className="zig-top bg-surface py-14 md:py-20">
        <InView {...reveal} className="wrap grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-title md:text-4xl">How it works</h2>
            <Steps />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-title md:text-4xl">What to send us</h2>
            <ul className="mt-6 max-w-[40ch] list-disc space-y-2 pl-5 text-lg marker:text-title">
              <li>The product you want, by name or with a photo.</li>
              <li>How many you need.</li>
              <li>Your area or island, so we can confirm delivery.</li>
            </ul>
            <p className="mt-6 max-w-[44ch] text-lg text-muted">
              We reply with availability, the price, and the delivery details for your area. A message is an enquiry, not an order, until we have confirmed it with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappUrl('Hi SnoopDog, I would like to ask about home delivery to my area.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle size={22} aria-hidden="true" />
                Ask about delivery
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={telUrl} className="btn btn-ghost">
                <Phone size={22} aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </InView>
      </section>
    </>
  );
}
