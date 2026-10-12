import WordsIn from './WordsIn.jsx';

export default function PageIntro({ title, children }) {
  return (
    <section className="on-chrome paw-bg bg-chrome py-12 text-chrome-fg md:py-20">
      <div className="wrap">
        <WordsIn as="h1" className="max-w-[20ch] text-[clamp(2.6rem,9vw,5rem)] font-extrabold leading-[0.97] tracking-[-0.02em] text-chrome-heading">
          {title}
        </WordsIn>
        {children && <p className="mt-5 max-w-[46ch] text-xl text-chrome-muted md:text-2xl">{children}</p>}
      </div>
    </section>
  );
}
