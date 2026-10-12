import { MessageCircle, Phone } from 'lucide-react';
import { generalEnquiry, telUrl, whatsappUrl } from '../site.js';

// Mobile-only bar. The footer reserves matching space (pb-28) so nothing is covered.
export default function ActionBar() {
  return (
    <div className="on-chrome fixed inset-x-0 bottom-0 z-40 border-t border-chrome-line bg-chrome pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="flex gap-3">
        <a href={whatsappUrl(generalEnquiry)} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1">
          <MessageCircle size={22} aria-hidden="true" />
          WhatsApp us
        </a>
        <a href={telUrl} className="btn btn-chrome" aria-label="Call the shop">
          <Phone size={22} aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
