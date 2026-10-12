// Service worker: makes repeat visits instant and lets the pages open offline.
// - /assets and /static-loader-data have hashed names that never change: cache first.
// - /images keep their names when replaced: show the cached copy at once, refresh it in the background.
// - pages: network first (a new release shows at once), cached copy only when the network fails.
// Bump V only if the caching rules above change; deploys need no bump.
const V = 'sd-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const put = (req, res) => {
  if (res.ok) {
    const copy = res.clone();
    caches.open(V).then((c) => c.put(req, copy));
  }
  return res;
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (/^\/(assets|static-loader-data)\//.test(url.pathname)) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res))));
  } else if (url.pathname.startsWith('/images/')) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const fresh = fetch(req).then((res) => put(req, res)).catch(() => hit);
        return hit || fresh;
      }),
    );
  } else if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => put(req, res)).catch(() => caches.match(req).then((hit) => hit || caches.match('/'))));
  }
});
