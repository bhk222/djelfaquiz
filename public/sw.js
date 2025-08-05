const CACHE_NAME = 'djelfa-quiz-cache-v17';
const OFFLINE_URL = '/offline.html';
const QUEUE_NAME = 'quiz-sync-queue';

const urlsToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/manifest.webmanifest',
  '/algeria-flag-icon.png',
  '/algeria-flag-waving.png',
  OFFLINE_URL,
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
];

// INSTALLATION
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATION
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
  if (event.request.method === 'POST') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        if ('sync' in self.registration) {
          const body = await event.request.clone().json();
          await saveRequest(body);
          await self.registration.sync.register('sync-quiz');
        }
        return new Response(JSON.stringify({ offline: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  } else if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(res => {
            if (res.status === 200) {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
            }
            return res;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') return caches.match(OFFLINE_URL);
            return new Response('Offline', { status: 503 });
          });
      })
    );
  }
});

// Sauvegarde POST offline
async function saveRequest(data) {
  const cache = await caches.open(QUEUE_NAME);
  const id = Date.now();
  const request = new Request(`/sync-queue/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  await cache.put(request, new Response(JSON.stringify(data)));
}

// Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-quiz') {
    event.waitUntil(replayRequests());
  }
});

// Replay des requêtes
async function replayRequests() {
  const cache = await caches.open(QUEUE_NAME);
  const requests = await cache.keys();
  for (const request of requests) {
    const response = await cache.match(request);
    const body = await response.json();

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) await cache.delete(request);
    } catch (e) {
      console.error('[SW] Sync échouée', e);
    }
  }
}
