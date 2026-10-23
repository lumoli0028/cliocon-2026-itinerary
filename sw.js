/* ClioCon 2026 itinerary service worker, build d856cf557b. Caches only this page, its icons and manifest. */
const V = 'cliocon-d856cf557b';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/maskable-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('cliocon-') && k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin || u.pathname.includes('/previous/')) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(V).then((c) => c.put('index.html', copy)); } return res; }).catch(() => caches.match('index.html', { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then((hit) => hit || fetch(r)));
});
