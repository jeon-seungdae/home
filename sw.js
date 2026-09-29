const CACHE_NAME = 'mijin-cooking-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './mijin.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32.png',
  './favicon-16.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
