// Service worker (generated at build: VERSION and PRECACHE are filled in by vite.config.ts).
// - precache: app shell, 2048px day/night/terrain maps, sky.json (stars), moon texture, adhan, pages, icons
// - same-origin GET: cache-first (hashed assets), filled at runtime (e.g. the 4096px maps once loaded)
// - navigations: network-first, falling back to the cached index.html (query strings ignored)
// - cross-origin (Open-Meteo weather, NASA GIBS tiles): network only; the app degrades gracefully offline
// Requests for sibling version folders (v1/ ... v5/) under this scope are left alone.
const VERSION = '38c3a0ebf1';
const PRECACHE = ["./","./404.html","./about.html","./adhan/README.txt","./adhan/default.mp3","./adhan.mp3","./assets/account-DDo-mDxA.js","./assets/dist-3wWlQY2P.js","./assets/esm-C4R8-EF0.js","./assets/esm-DexGPEyr.js","./assets/esm-E7sj2Qpz.js","./assets/index-C6L9Jb_7.js","./assets/index-DUelgwbS.css","./assets/rolldown-runtime-B8xr6ykz.js","./assets/web-BcfcurPD.js","./assets/web-DkZwzHdC.js","./assets/web-OASriQR3.js","./contact/index.html","./contact.html","./delete-account/index.html","./delete-account.html","./earth-ae.webp","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest","./moon.webp","./night-ae.webp","./pricing.html","./privacy.html","./refund.html","./sky.json","./terms/index.html","./terms.html","./terrain-ae.webp"];
const CACHE = 'gclock-' + VERSION;
const SCOPE = new URL(self.registration.scope).pathname;
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('gclock-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(SCOPE)) return;
  const rel = url.pathname.slice(SCOPE.length);
  if (rel.includes('/') && !rel.startsWith('assets/') && !rel.startsWith('adhan/')) return; // version folders: not ours
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { if (r.ok && (rel === '' || rel === 'index.html')) caches.open(CACHE).then((c) => c.put('./index.html', r.clone())); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok && r.type === 'basic') { const cl = r.clone(); caches.open(CACHE).then((c) => c.put(req, cl)); }
    return r;
  })));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if ('focus' in c) return c.focus();
    return self.clients.openWindow((e.notification.data && e.notification.data.url) || './');
  }));
});
