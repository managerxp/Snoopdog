import { Link } from 'react-router-dom';
import { InView } from '../components/motion-primitives/InView.jsx';
import { reveal } from '../components/reveal.js';
import Seo from '../components/Seo.jsx';
import PageIntro from '../components/PageIntro.jsx';
import { site } from '../site.js';

const sections = [
  {
    h: 'What this website collects',
    p: 'Nothing that identifies you. There are no accounts, forms, cookies, analytics or advertising on this site. Its fonts and images are served from the site itself.',
  },
  {
    h: 'Server logs',
    p: 'Like most websites, the server this site runs on may keep standard access logs, such as the time of a visit, the page requested and an IP address, for security and troubleshooting.',
  },
  {
    h: 'When you contact us',
    p: 'If you message us on WhatsApp or call the shop, we see your phone number and your message and use them only to reply to you. WhatsApp and your phone provider handle that contact under their own privacy policies.',
  },
  {
    h: 'Other websites',
    p: 'This site links to WhatsApp, Google Maps, Google and Instagram. Those services have their own privacy policies and may collect data once you open them.',
  },
];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy | SnoopDog" description="How the SnoopDog website handles your information: it collects none, and uses no cookies or analytics." />
      <PageIntro title="Privacy.">Short version: this website does not collect your personal information.</PageIntro>

      <section className="zig-top bg-surface py-14 md:py-20">
        <InView {...reveal} className="wrap max-w-3xl space-y-10">
          {sections.map(({ h, p }) => (
            <div key={h}>
              <h2 className="text-2xl font-extrabold tracking-tight text-title md:text-3xl">{h}</h2>
              <p className="mt-3 max-w-[62ch] text-lg">{p}</p>
            </div>
          ))}
          <p className="max-w-[62ch] text-lg">
            Questions about this page? <Link to="/contact" className="font-semibold text-title underline underline-offset-4">Contact {site.name}</Link>.
          </p>
          <p className="text-muted">Last updated 9 October 2026.</p>
        </InView>
      </section>
    </>
  );
}
