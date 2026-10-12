// Class-name helper that motion-primitives components expect (https://motion-primitives.com/docs).
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
