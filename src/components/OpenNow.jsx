import { useEffect, useState } from 'react';
import { site } from '../site.js';

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
const mins = ([h, m]) => h * 60 + m;

function statusNow() {
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, +x.value]));
  const now = p.hour * 60 + p.minute;
  const isOpen = now >= mins(site.hours.open) && now < mins(site.hours.close);
  return isOpen ? 'Open now · closes 9:00 PM' : 'Closed now · opens 8:30 AM';
}

// Pre-rendered HTML shows the static hours; the live status replaces it after hydration.
export default function OpenNow({ className = '' }) {
  const [live, setLive] = useState(null);
  useEffect(() => {
    setLive(statusNow());
    const id = setInterval(() => setLive(statusNow()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={`inline-flex items-center gap-2 font-semibold ${className}`}>
      <span aria-hidden="true" className="size-2.5 rounded-full bg-current" />
      <span>{live ?? site.hours.label}</span>
    </p>
  );
}
