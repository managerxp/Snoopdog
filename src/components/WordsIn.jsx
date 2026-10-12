import { Fragment } from 'react';

// A headline whose words rise in one after another. It is plain CSS (see .word-in), so the text is visible
// from the first paint, with or without JavaScript, and it holds still for visitors who prefer reduced motion.
export default function WordsIn({ as: Tag = 'h1', children, className = '', step = 70 }) {
  const words = children.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word-in inline-block" style={{ animationDelay: `${i * step}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
