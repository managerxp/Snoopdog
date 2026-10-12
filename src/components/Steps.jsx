export function Paw({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <ellipse cx="12" cy="16.5" rx="5" ry="4" />
      <circle cx="5.5" cy="11" r="2.2" />
      <circle cx="9.5" cy="6.5" r="2.4" />
      <circle cx="14.5" cy="6.5" r="2.4" />
      <circle cx="18.5" cy="11" r="2.2" />
    </svg>
  );
}

const steps = [
  { title: 'Tell us what you need', text: 'Send a WhatsApp message or call the shop.' },
  { title: 'We confirm', text: 'Availability, price and delivery for your area, before anything is arranged.' },
  { title: 'It comes to your door', text: 'Home delivery across the Andaman & Nicobar Islands.' },
];

export default function Steps({ dark = false }) {
  return (
    <ol className="space-y-8">
      {steps.map((s) => (
        <li key={s.title} className="flex gap-4">
          <Paw className={`mt-1 size-8 shrink-0 ${dark ? 'text-sun' : 'text-accent'}`} />
          <div>
            <h3 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-fg'}`}>{s.title}</h3>
            <p className={`mt-1 max-w-[40ch] ${dark ? 'text-soft-night' : 'text-muted'}`}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
