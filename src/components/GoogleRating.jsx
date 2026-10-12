import { Star } from 'lucide-react';
import { site } from '../site.js';

// The rating shown with a star, linking to the Google Maps listing. The numbers live in src/site.js.
export default function GoogleRating({ className = '', starClassName = 'text-amber' }) {
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-3 ${className}`}>
      <Star size={22} fill="currentColor" aria-hidden="true" className={`shrink-0 ${starClassName}`} />
      <span className="underline underline-offset-4">
        {site.google.rating} on Google · {site.google.count} reviews
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
