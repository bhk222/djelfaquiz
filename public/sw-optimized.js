// Service Worker optimisé selon les recommandations PWA Builder
// Combined offline experience (Offline page + Offline copy of pages)

const CACHE = "djelfa-quiz-offline-v1";
const offlineFallbackPage = "offline.html";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Installation du service worker
self.addEventListener('install', async (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching offline page');
        return cache.addAll([
          offlineFallbackPage,
          '/',
          '/icons/icon-192.png',
          '/icons/icon-512.png'
        ]);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE && cacheName.startsWith('djelfa-quiz-')) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Activer la navigation preload si supporté
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Stratégies de cache par type de ressource
workbox.routing.registerRoute(
  // Cache les pages HTML avec StaleWhileRevalidate
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'djelfa-pages-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          return `${request.url}?timestamp=${Date.now()}`;
        },
      },
    ],
  })
);

workbox.routing.registerRoute(
  // Cache les assets statiques
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'djelfa-assets-cache',
  })
);

workbox.routing.registerRoute(
  // Cache les images
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'djelfa-images-cache',
    plugins: [
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          return request.url;
        },
      },
    ],
  })
);

// Gestion des requêtes de navigation avec fallback offline
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Essayer la réponse preload d'abord
        const preloadResp = await event.preloadResponse;
        if (preloadResp) {
          return preloadResp;
        }

        // Sinon, essayer le réseau
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        console.log('Service Worker: Network failed, serving offline page');
        
        // En cas d'échec, servir la page offline
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp || new Response('Offline page not found', { status: 404 });
      }
    })());
  }
});

// Gestion des notifications push (selon notre configuration existante)
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'تحدي جديد متاح في اختبار الجلفة!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'djelfa-quiz',
    requireInteraction: true,
    actions: [
      {
        action: 'explore',
        title: 'العب الآن',
        icon: '/icons/icon-192.png'
      },
      {
        action: 'close',
        title: 'لاحقاً'
      }
    ],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    }
  };

  event.waitUntil(
    self.registration.showNotification('اختبار الجلفة', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Background sync
self.addEventListener('sync', function(event) {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'sync-quiz-progress') {
    event.waitUntil(syncQuizProgress());
  }
});

function syncQuizProgress() {
  return fetch('/api/sync-progress', {
    method: 'POST',
    body: JSON.stringify({ 
      timestamp: Date.now(),
      action: 'sync-progress'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function(response) {
      console.log('Quiz progress synced successfully');
      return response.json();
    })
    .catch(function(err) {
      console.log('Sync failed, will retry later:', err);
    });
}
