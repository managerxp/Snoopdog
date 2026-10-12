// The one scroll-reveal used site-wide with <InView>: a short rise and fade, once, as a section enters.
export const reveal = {
  variants: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  viewOptions: { once: true, margin: '0px 0px -12% 0px' },
};
