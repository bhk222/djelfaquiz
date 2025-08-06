self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js');

// Installation : mise en cache initiale
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('djelfa-cache-v1').then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/manifest.webmanifest',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
      ])
    )
  );
});

// Activation
self.addEventListener('activate', event => {
  clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

// 🔁 Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-quiz-progress') {
    event.waitUntil(syncQuizProgress());
  }
});

async function syncQuizProgress() {
  try {
    const offlineData = await localforage.getItem('offline-quiz');
    if (offlineData) {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(offlineData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await localforage.removeItem('offline-quiz');
      console.log('[SW] Données synchronisées avec succès.');
    }
  } catch (err) {
    console.error('[SW] Échec de la synchronisation :', err);
  }
}

// 🔔 Notifications push
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'DjelfaQuiz';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 📲 Clic sur notification
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const targetUrl = event.notification.data || '/';
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
