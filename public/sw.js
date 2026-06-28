const CACHE_VERSION = 'v2';
const CACHE_NAME = `formfix-${CACHE_VERSION}`;
const MAX_CACHE_SIZE = 80;
const STATIC_ASSETS = [
  '/',
  '/tools',
  '/compress-image',
  '/passport-size-photo',
  '/merge-pdf',
  '/signature-maker',
  '/favicon-96.png',
  '/favicon-192.png',
  '/favicon-512.png',
  '/manifest.json'
];

async function trimCache(name, maxItems) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await Promise.all(keys.slice(0, keys.length - maxItems).map(k => cache.delete(k)));
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.url.includes('/_astro/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
              trimCache(CACHE_NAME, MAX_CACHE_SIZE);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(
            (cached) =>
              cached ||
              new Response(
                `<!DOCTYPE html><html><head><title>Offline</title><style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;color:#0f172a;text-align:center;padding:20px}div{max-width:400px}h1{font-size:1.5rem;margin-bottom:8px}p{color:#64748b;line-height:1.6}a{color:#4f46e5;font-weight:600;text-decoration:none}a:hover{text-decoration:underline}</style></head><body><div><h1>You're offline</h1><p>FormFix works best with an internet connection. Please check your network and try again.</p><p style="margin-top:20px"><a href="/">Go back home</a></p></div></body></html>`,
                { headers: { 'Content-Type': 'text/html' } }
              )
          )
        )
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
            trimCache(CACHE_NAME, MAX_CACHE_SIZE);
          });
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached))
  );
});
