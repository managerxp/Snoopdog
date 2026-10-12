import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'sd-theme';

// Light/dark switch. index.html sets data-theme on <html> before first paint (saved choice, else the device's
// setting), so there is no flash. This switch flips it and remembers the choice on this device.
export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const flip = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    const color = document.querySelector('meta[name=theme-color]');
    if (color) color.content = next ? '#06142A' : '#E3EEF9';
    try {
      localStorage.setItem(KEY, next ? 'dark' : 'light');
    } catch {
      // private mode or blocked storage: the switch still works for this visit
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={flip}
      className={`inline-flex min-h-11 items-center gap-3 rounded-full px-1 font-semibold text-chrome-fg ${className}`}
    >
      <span className="hidden text-sm lg:inline" aria-hidden="true">Dark mode</span>
      <span className="relative block h-8 w-14 shrink-0 rounded-full border-2 border-chrome-fg">
        <Sun size={14} aria-hidden="true" className="absolute left-[7px] top-1/2 -translate-y-1/2" />
        <Moon size={14} aria-hidden="true" className="absolute right-[7px] top-1/2 -translate-y-1/2" />
        <span className="absolute left-[3px] top-[3px] block size-5 rounded-full bg-chrome-fg transition-transform duration-200 dark:translate-x-6" />
      </span>
    </button>
  );
}
