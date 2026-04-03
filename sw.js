const CACHE = 'weldref-v2';

// On install, take control immediately — no waiting
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  // Clear old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;
  const isFont  = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (!isLocal && !isFont) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update cache with fresh response
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request)) // offline fallback
  );
});
