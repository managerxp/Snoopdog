// The SnoopDog wordmark from the business cards, drawn in the current text colour (see .wordmark in index.css).
export default function Wordmark({ className = '' }) {
  return <span role="img" aria-label="SnoopDog" className={`wordmark ${className}`} />;
}
