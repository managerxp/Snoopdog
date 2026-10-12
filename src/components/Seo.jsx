import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';

// Set VITE_SITE_URL (for example https://snoopdog.example) at build time once the domain exists.
// Until then no canonical, og:url or og:image is emitted, because those must be absolute URLs.
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

export default function Seo({ title, description }) {
  const { pathname } = useLocation();
  const url = siteUrl && siteUrl + pathname;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_IN" />
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
      {url && <meta property="og:image" content={`${siteUrl}/images/og.jpg`} />}
      {url && <meta name="twitter:card" content="summary_large_image" />}
    </Head>
  );
}
