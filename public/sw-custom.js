// Service Worker personnalisé pour notifications push avancées
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'تحدي جديد متاح في اختبار الجلفة!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
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
    tag: 'djelfa-quiz',
    requireInteraction: true
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

// Background Sync pour synchronisation périodique
self.addEventListener('sync', function(event) {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'sync-quiz-progress') {
    event.waitUntil(syncQuizProgress());
  }
  
  if (event.tag === 'sync-user-stats') {
    event.waitUntil(syncUserStats());
  }
  
  if (event.tag === 'sync-offline-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

// Periodic Background Sync
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'periodic-quiz-update') {
    event.waitUntil(updateQuizContent());
  }
});

// Gestion offline avancée avec stratégies multiples
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Cache les questions pour utilisation offline
  if (url.pathname.includes('/data/questions') || url.pathname.includes('questions.ts')) {
    event.respondWith(
      caches.open('quiz-data-v1').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          if (response) {
            // Retourner du cache et mettre à jour en arrière-plan
            fetch(event.request).then(function(fetchResponse) {
              cache.put(event.request, fetchResponse.clone());
            }).catch(() => {});
            return response;
          }
          return fetch(event.request).then(function(response) {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(function() {
            // Retourner une réponse par défaut si offline
            return new Response(JSON.stringify({
              message: 'Données non disponibles hors ligne',
              questions: []
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        });
      })
    );
  }
  
  // Cache les assets statiques
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2)$/)) {
    event.respondWith(
      caches.open('static-assets-v1').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request).then(function(response) {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
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
      return response.json();
    })
    .then(function(data) {
      console.log('Quiz progress synced:', data);
    })
    .catch(function(err) {
      console.log('Sync failed, will retry later:', err);
    });
}

function syncUserStats() {
  return fetch('/api/sync-stats', {
    method: 'POST',
    body: JSON.stringify({
      timestamp: Date.now(),
      action: 'sync-stats'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function(response) {
      console.log('User stats synced');
    })
    .catch(function(err) {
      console.log('Stats sync failed:', err);
    });
}

function syncOfflineActions() {
  return fetch('/api/sync-actions', {
    method: 'POST',
    body: JSON.stringify({
      timestamp: Date.now(),
      action: 'sync-offline-actions'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function(response) {
      console.log('Offline actions synced');
    })
    .catch(function(err) {
      console.log('Offline actions sync failed:', err);
    });
}

function updateQuizContent() {
  return fetch('/api/quiz-updates')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('Quiz content updated:', data);
    })
    .catch(function(err) {
      console.log('Quiz update failed:', err);
    });
}
