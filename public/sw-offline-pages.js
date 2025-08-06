// This is the "Offline copy of pages" service worker
// PWA Builder recommendation for comprehensive offline page caching

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Injection point for Vite PWA manifest
self.__WB_MANIFEST;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Register route to cache all pages using StaleWhileRevalidate strategy
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// Optional: Add offline fallback for navigation requests
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Handle offline scenarios with custom response
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' && navigator.onLine === false) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        // Fallback to offline page if available
        return caches.match('/offline.html');
      })
    );
  }
});
